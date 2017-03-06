'use strict';

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity, Text } from 'react-native';

import FollowListView from './FollowListView'

class FollowScreen extends Component {

    static propTypes = {
        mode: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FollowListView mode="followers"/>
        );
    }
}

export default FollowScreen

