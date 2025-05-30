// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {searchGroups} from 'mattermost-redux/actions/groups';
import Permissions from 'mattermost-redux/constants/permissions';
import {searchAssociatedGroupsForReferenceLocal} from 'mattermost-redux/selectors/entities/groups';
import {isCustomGroupsEnabled} from 'mattermost-redux/selectors/entities/preferences';
import {haveIChannelPermission} from 'mattermost-redux/selectors/entities/roles';

export function searchAssociatedGroupsForReference(prefix, teamId, channelId, opts = {}) {
    return async (dispatch, getState) => {
        const state = getState();
        if (!haveIChannelPermission(state,
            teamId,
            channelId,
            Permissions.USE_GROUP_MENTIONS,
        )) {
            return {data: []};
        }
        if (isCustomGroupsEnabled(state)) {
            const params = {
                q: prefix,
                filter_allow_reference: true,
                page: 0,
                per_page: 60,
                include_member_count: true,
                include_channel_member_count: channelId,
                ...opts,
            };

            await dispatch(searchGroups(params));
        }
        return {data: searchAssociatedGroupsForReferenceLocal(state, prefix, teamId, channelId)};
    };
}
