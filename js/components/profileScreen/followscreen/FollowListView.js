'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { View } from 'native-base';

import FollowView from '../FollowView'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
});

class FollowListView extends Component {

    static propTypes = {
        dataSource: React.PropTypes.object,
    };

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };
    }

    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <View><Text>{data}</Text></View>}
            />
        );
    }
}

export default FollowListView

