// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {shallow} from 'enzyme';
import React from 'react';

import BotTag from './bot_tag';

describe('components/widgets/tag/BotTag', () => {
    test('should match the snapshot', () => {
        const wrapper = shallow(<BotTag className={'test'}/>);
        expect(wrapper).toMatchSnapshot();
    });
});
