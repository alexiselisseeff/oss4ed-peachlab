// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getStandardAnalytics} from 'mattermost-redux/actions/admin';
import {getAdminAnalytics} from 'mattermost-redux/selectors/entities/admin';
import {isCurrentUserSystemAdmin} from 'mattermost-redux/selectors/entities/users';

// used only for queueing the fetch, where needed. Data is read from redux
// rather than this hook when it is used
export default function useFetchStandardAnalytics() {
    const isSystemAdmin = useSelector(isCurrentUserSystemAdmin);
    const dispatch = useDispatch();
    const [requested, setRequested] = useState(false);
    const hasData = Object.keys(useSelector(getAdminAnalytics) || {}).length > 0;

    useEffect(() => {
        if (isSystemAdmin && !requested && !hasData) {
            dispatch(getStandardAnalytics());
            setRequested(true);
        }
    }, [isSystemAdmin, requested, hasData]);
}
