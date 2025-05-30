// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import type {Dispatch} from 'redux';

import {openRHSSearch} from 'actions/views/rhs';

import ShowSearchButton from './show_search_button';

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        openRHSSearch,
    }, dispatch),
});

export default connect(null, mapDispatchToProps)(ShowSearchButton);
