'use strict';

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { navigateTo, popRoute, getStats, getUserFollowersData, getUserFollowsData } from '../../../actions';

import FollowListView from './FollowListView'

function generateRows(n){
    var arr=[];
    for(var i=0;i<n;i++)
    {
        if(i%2==0)
        {
            arr.push({
                name:"Alex Alexey",
                username:"alexAlex",
                aboutMe:"I'm so awesome omg",
                avatar:{url:"https://marketplace.canva.com/MACIsTc3Y5M/1/thumbnail_large/canva-woman-avatar-icon-MACIsTc3Y5M.png"},
                isFollowing:false
            })
        }
        else{
            arr.push({
                name:"Israel Israeli",
                username:"alexAlex",
                aboutMe:"I'm so awesome omg",
                avatar:{url:"https://marketplace.canva.com/MACIsTc3Y5M/1/thumbnail_large/canva-woman-avatar-icon-MACIsTc3Y5M.png"},
                isFollowing:false
            })
        }

    }
    return arr;
}

class FollowScreen extends Component {

    static propTypes = {
        mode: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state={
            currentPageIndex:0,
            follows:generateRows(20)
        }
    }

    getFollowersData(){
        var currentIndex=this.state.currentPageIndex;
        this.props.getUserFollowersData(this.props.user_id,currentIndex);
        this.setState({currentPageIndex:currentIndex});
    }

    pushRows(){
        var currentIndex=this.state.currentPageIndex;
        var follows=[];
        if(currentIndex<10){
            follows=generateRows(20);
            if(currentIndex%2==0)
            {
                follows=follows.reverse();
            }
        }
        this.setState({follows:follows, currentPageIndex:currentIndex+1})
    }

    render() {
        return (
            <FollowListView follows={this.state.follows} onEndReached={this.pushRows.bind(this)} mode="followers"/>
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

const mapStateToProps = state => { return {} };

export default connect(mapStateToProps, bindAction)(FollowScreen);

