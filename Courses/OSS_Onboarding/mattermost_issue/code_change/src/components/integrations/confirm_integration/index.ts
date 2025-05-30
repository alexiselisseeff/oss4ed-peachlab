// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getBotAccounts} from 'mattermost-redux/selectors/entities/bots';
import {getCommands, getOAuthApps, getIncomingHooks, getOutgoingHooks, getOutgoingOAuthConnections} from 'mattermost-redux/selectors/entities/integrations';

import type {GlobalState} from 'types/store';

import ConfirmIntegration from './confirm_integration';

function mapStateToProps(state: GlobalState) {
    return {
        commands: getCommands(state),
        oauthApps: getOAuthApps(state),
        incomingHooks: getIncomingHooks(state),
        outgoingHooks: getOutgoingHooks(state),
        bots: getBotAccounts(state),
        outgoingOAuthConnections: getOutgoingOAuthConnections(state),
    };
}

export default connect(mapStateToProps)(ConfirmIntegration);
