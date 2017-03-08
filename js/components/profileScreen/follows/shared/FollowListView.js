'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash';
import { navigateTo, followUpdate, unFollowUpdate } from '../../../../actions';

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
        follows: React.PropTypes.array,
        onEndReached: React.PropTypes.func,
        headerData:React.PropTypes.object
    };

    constructor(props) {
        super(props);
        var ds=new ListView.DataSource({rowHasChanged:this.rowHasChanged})
        this.state = {
            dataSource: ds.cloneWithRows(this.props.follows),
            isTrueEndReached:false
        };
    }

    componentWillReceiveProps(nextProps) {
        if(_.isEmpty(nextProps.follows))
        {
            this.setState({isTrueEndReached:true});
        }
        if (nextProps.follows !== this.props.follows) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.follows)
            })
        }
    }

    rowHasChanged(r1, r2) {
        return r1 !== r2;
    }

    onUserNavigate(user){
        this.props.navigateTo('profileScreen', `${this.props.headerData.mode}Screen`, user);
    }

    toggleFollowAction(user,shouldFollow) {
        let data = {id: user.id};
        if (shouldFollow) {
            this.props.followUpdate(data);
        }
        else {
            this.props.unFollowUpdate(data);
        }
    }

    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <FollowRow onUserPress={this.onUserNavigate.bind(this)} onFollowPress={this.toggleFollowAction.bind(this)} {...data}/>}
                renderHeader = {() => <ListViewHeader count={this.props.headerData.count} title={`My ${this.props.headerData.mode}`}/>}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
                enableEmptySections={true}
                onEndReached={this.state.isTrueEndReached? _.noop:this.props.onEndReached}
                onEndReachedThreshold={100}
            />
        );
    }
}

function bindAction(dispatch) {
    return {
        navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
        followUpdate: (id) => dispatch(followUpdate(id)),
        unFollowUpdate: (id) => dispatch(unFollowUpdate(id))
    };
}

const mapStateToProps = state => { return {} };

export default connect(mapStateToProps, bindAction)(FollowListView);

