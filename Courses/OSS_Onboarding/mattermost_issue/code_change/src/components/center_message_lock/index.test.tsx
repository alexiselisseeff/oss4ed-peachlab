// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import {emptyLimits} from 'tests/constants/cloud';
import {emptyTeams} from 'tests/constants/teams';
import {adminUsersState, endUsersState} from 'tests/constants/users';
import {screen, renderWithContext} from 'tests/react_testing_utils';
import {makeEmptyUsage} from 'utils/limits_test';
import {TestHelper} from 'utils/test_helper';

import CenterMessageLock from './';

jest.mock('mattermost-redux/actions/cloud', () => {
    const actual = jest.requireActual('mattermost-redux/actions/cloud');

    return {
        ...actual,
        getCloudLimits: jest.fn(),
    };
});

const initialState = {
    entities: {
        usage: makeEmptyUsage(),
        users: adminUsersState(),
        cloud: {
            limits: {...emptyLimits(), limitsLoaded: false},
        },
        general: {
            license: TestHelper.getCloudLicenseMock(),
        },
        teams: emptyTeams(),
        posts: {
            postsInChannel: {
                channelId: [
                    {
                        order: ['a', 'b', 'c'],
                        oldest: true,
                    },
                ],
            },
            posts: {
                a: TestHelper.getPostMock({id: 'a', create_at: 3}),
                b: TestHelper.getPostMock({id: 'b', create_at: 2}),
                c: TestHelper.getPostMock({id: 'c', create_at: 1}),
            },
        },
    },
};

const exceededLimitsState = {
    ...initialState,
    entities: {
        ...initialState.entities,
        cloud: {
            ...initialState.entities.cloud,
            limits: {
                ...initialState.entities.cloud.limits,
                limitsLoaded: true,
                limits: {
                    messages: {
                        history: 2,
                    },
                },
            },
        },
        usage: {
            ...initialState.entities.usage,
            messages: {
                ...initialState.entities.usage.messages,
                history: 3,
            },
        },
    },
};

const exceededLimitsStateNoAccessiblePosts = {
    ...exceededLimitsState,
    entities: {
        ...exceededLimitsState.entities,
        posts: {
            postsInChannel: {
                channelId: [
                ],
            },
            posts: {},
        },
    },
};

const endUserLimitExceeded = {
    ...exceededLimitsState,
    entities: {
        ...exceededLimitsState.entities,
        users: endUsersState(),
    },
};

describe('CenterMessageLock', () => {
    it('returns null if limits not loaded', () => {
        renderWithContext(
            <CenterMessageLock channelId={'channelId'}/>,
            initialState,
        );
        expect(screen.queryByText('Notify Admin')).not.toBeInTheDocument();
        expect(screen.queryByText('Upgrade now')).not.toBeInTheDocument();
    });

    it('Admins have a call to upgrade', () => {
        renderWithContext(
            <CenterMessageLock channelId={'channelId'}/>,
            exceededLimitsState,
        );
        screen.getByText('Upgrade now');
    });

    it('End users have a call to notify admin', () => {
        renderWithContext(
            <CenterMessageLock channelId={'channelId'}/>,
            endUserLimitExceeded,
        );
        screen.getByText('Notify Admin');
    });

    it('Filtered messages over one year old display year', () => {
        renderWithContext(
            <CenterMessageLock channelId={'channelId'}/>,
            exceededLimitsState,
        );
        screen.getByText('January 1, 1970', {exact: false});
    });

    it('New filtered messages do not show year', () => {
        const state = JSON.parse(JSON.stringify(exceededLimitsState));
        const now = new Date();
        const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const expectedDate = firstOfMonth.toLocaleString('en', {month: 'long', day: 'numeric'});

        state.entities.posts.posts.c.create_at = Date.parse(firstOfMonth.toUTCString());
        renderWithContext(
            <CenterMessageLock channelId={'channelId'}/>,
            state,
        );
        screen.getByText(expectedDate, {exact: false});
    });

    it('when there are no messages, uses day after day of most recently archived post', () => {
        const now = Date.now();
        const secondOfMonth = new Date(now + (1000 * 60 * 60 * 24));
        const expectedDate = secondOfMonth.toLocaleString('en', {month: 'long', day: 'numeric'});

        renderWithContext(
            <CenterMessageLock
                channelId={'channelId'}
                firstInaccessiblePostTime={now}
            />,
            exceededLimitsStateNoAccessiblePosts,
        );
        screen.getByText(expectedDate, {exact: false});
    });
});
