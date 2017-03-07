'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { View } from 'native-base';

import ListViewHeader from './ListViewHeader';
import FollowRow from './FollowRow';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#e6e6e6',
    },
});

class FollowListView extends Component {

    static propTypes = {
        dataSource: React.PropTypes.object,
    };

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource(this.rowHasChanged);
        this.state = {
            dataSource: ds.cloneWithRows(
                [
                    {
                        name:"Alex Alexey",
                        username:"alexAlex",
                        aboutMe:"I'm so awesome omg",
                        avatar:{url:"https://marketplace.canva.com/MACIsTc3Y5M/1/thumbnail_large/canva-woman-avatar-icon-MACIsTc3Y5M.png"},
                        isFollowing:false
                    },
                    {
                        name:"Israel Israeli",
                        username:"israelisreal",
                        aboutMe:"I'm with alex",
                        avatar:{url:"http://www.designshock.com/wp-content/uploads/2016/04/man-17-200.jpg"},
                        isFollowing:true
                    },]),
        };
    }

    rowHasChanged(r1, r2) {
        return r1 !== r2;
    }

    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <FollowRow {...data}/>}
                renderHeader = {() => <ListViewHeader count={6987} title={`My ${this.props.mode}`}/>}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
            />
        );
    }
}

export default FollowListView

