// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import type {MockStoreEnhanced} from 'redux-mock-store';

import {close, open, toggle} from 'actions/views/lhs';
import configureStore from 'store';

import mockStore from 'tests/test_store';
import {ActionTypes} from 'utils/constants';

import type {GlobalState} from 'types/store';

import * as Actions from './lhs';

describe('lhs view actions', () => {
    const initialState = {
        views: {
            lhs: {
                isOpen: false,
            },
        },
    };

    let store: MockStoreEnhanced<GlobalState>;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('toggle dispatches the right action', () => {
        store.dispatch(toggle());

        const compareStore = mockStore(initialState);
        compareStore.dispatch({
            type: ActionTypes.TOGGLE_LHS,
        });

        expect(store.getActions()).toEqual(compareStore.getActions());
    });

    it('open dispatches the right action', () => {
        store.dispatch(open());

        const compareStore = mockStore(initialState);
        compareStore.dispatch({
            type: ActionTypes.OPEN_LHS,
        });

        expect(store.getActions()).toEqual(compareStore.getActions());
    });

    it('close dispatches the right action', () => {
        store.dispatch(close());

        const compareStore = mockStore(initialState);
        compareStore.dispatch({
            type: ActionTypes.CLOSE_LHS,
        });

        expect(store.getActions()).toEqual(compareStore.getActions());
    });

    test('selectStaticPage', async () => {
        const testStore = configureStore({...initialState});
        await testStore.dispatch(Actions.selectStaticPage('test'));
        expect(testStore.getState().views.lhs.currentStaticPageId).toEqual('test');
    });
});
