// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {shallow} from 'enzyme';
import React from 'react';
import type {ComponentProps} from 'react';

import ProfilePicture from 'components/profile_picture';

type Props = ComponentProps<typeof ProfilePicture>;

describe('components/ProfilePicture', () => {
    const baseProps: Props = {
        src: 'http://example.com/image.png',
        status: 'away',
    };

    test('should match snapshot, no user specified, default props', () => {
        const props: Props = baseProps;
        const wrapper = shallow(
            <ProfilePicture {...props}/>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, profile and src, default props', () => {
        const props: Props = {
            ...baseProps,
            profileSrc: baseProps.src,
            userId: 'uid',
            src: 'http://example.com/emoji.png',
        };
        const wrapper = shallow(
            <ProfilePicture {...props}/>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, no user specified, overridden props', () => {
        const props: Props = {
            ...baseProps,
            size: 'xl',
        };
        const wrapper = shallow(
            <ProfilePicture {...props}/>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, user specified', () => {
        const props: Props = {
            ...baseProps,
            username: 'username',
        };
        const wrapper = shallow(
            <ProfilePicture {...props}/>,
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, user specified, overridden props', () => {
        const props: Props = {
            ...baseProps,
            username: 'username',
            size: 'xs',
        };
        const wrapper = shallow(
            <ProfilePicture {...props}/>,
        );

        expect(wrapper).toMatchSnapshot();
    });
});
