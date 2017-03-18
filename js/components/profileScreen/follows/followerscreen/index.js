'use strict';

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity, Text } from 'react-native';
import { View } from 'native-base'
import { connect } from 'react-redux';
import EmptyView from './EmptyView'
import { navigateTo, popRoute, getUserFollowersData, initUserFollowers } from '../../../../actions';

import FollowListView from '../shared/FollowListView'

class FollowerScreen extends Component {

  static propTypes = {
    mode: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.getFollowersData = this.getFollowersData.bind(this);
    this._renderOnEmpty = this._renderOnEmpty.bind(this);
    this.currentPageIndex = 1;
  }

  componentWillMount() {
    if(this.props.userData.count){
      this.getFollowersData();
    }
  }

  componentWillUnmount() {
    this.props.initUserFollowers();
  }

  getFollowersData() {
    this.props.getUserFollowersData(this.props.userData.user.id, this.currentPageIndex);
    this.currentPageIndex++;
  }

  _renderOnEmpty() {
    return (
      <EmptyView isMyProfile={this.props.userData.isMyProfile} name={this.props.userData.user.name}/>
    );
  }

  render() {
    return (
        <FollowListView renderEmpty={this._renderOnEmpty} headerData={this.props.userData} follows={this.props.followers}
                        onEndReached={this.getFollowersData} mode={this.props.userData.mode}/>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    popRoute: key => dispatch(popRoute(key)),
    getUserFollowersData: (id, pageNumber, pageSize) => dispatch(getUserFollowersData(id, pageNumber, pageSize)),
    initUserFollowers: () => dispatch(initUserFollowers()),
  };
}

const mapStateToProps = state => {
  return {
    followers: state.userFollowers.userFollowersData,
  }
};

export default connect(mapStateToProps, bindAction)(FollowerScreen);