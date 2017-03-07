'use strict';

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { navigateTo, popRoute, getStats, getUserFollowersData, getUserFollowsData } from '../../../actions';

import FollowListView from './FollowListView'

class FollowScreen extends Component {

    static propTypes = {
        mode: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.getFollowersData=this.getFollowersData.bind(this);
        this.currentPageIndex=1;
    }

    componentWillMount() {
        this.getFollowersData();
    }

    getFollowersData(){
        this.props.getUserFollowersData(this.props.userData.user.id,this.currentPageIndex);
        this.currentPageIndex++;
    }

    render() {
        return (
            <FollowListView headerData={this.props.userData} follows={this.props.followers} onEndReached={this.getFollowersData} mode={this.props.userData.mode}/>
        );
    }
}

function bindAction(dispatch) {
    return {
        navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
        popRoute: key => dispatch(popRoute(key)),
        getStats: (id) => dispatch(getStats(id)),
        getUserFollowersData: (id,pageNumber,pageSize) => dispatch(getUserFollowersData(id,pageNumber,pageSize)),
        getUserFollowsData: (id,pageNumber,pageSize) => dispatch(getUserFollowsData(id,pageNumber,pageSize)),
    };
}

const mapStateToProps = state => { return {
    followers: state.userFollowers.userFollowersData,
} };

export default connect(mapStateToProps, bindAction)(FollowScreen);

