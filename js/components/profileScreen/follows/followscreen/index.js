'use strict';

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity, Text } from 'react-native';
import { View } from 'native-base'
import { connect } from 'react-redux';
import { navigateTo, reset, popRoute, getUserFollowsData, initUserFollows } from '../../../../actions';
import EmptyView from './EmptyView'

import FollowListView from '../shared/FollowListView'

class FollowScreen extends Component {

  static propTypes = {
    mode: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.getFollowsData = this.getFollowsData.bind(this);
    this._renderOnEmpty = this._renderOnEmpty.bind(this);
    this._goToFeed=this._goToFeed.bind(this);
    this.currentPageIndex = 1;
  }

  componentWillMount() {
    if (this.props.userData.count) {
      this.getFollowsData();
    }
  }

  componentWillUnmount() {
    this.props.initUserFollows();
  }

  getFollowsData() {
    this.props.getUserFollowsData(this.props.userData.user.id, this.currentPageIndex);
    this.currentPageIndex++;
  }

  _goToFeed() {
    this.props.reset([
      {
        key: 'feedscreen',
        index: 0,
      },
    ], this.props.navigation.key);
  }

  _renderOnEmpty() {
    return (
      <EmptyView onFindInterestingPeopleButtonPress={this._goToFeed} isMyProfile={this.props.userData.isMyProfile} name={this.props.userData.user.name}/>
    );
  }

  render() {
    return (
      <FollowListView renderEmpty={this._renderOnEmpty} headerData={this.props.userData} follows={this.props.follows}
                      onEndReached={this.getFollowsData}
                      mode={this.props.userData.mode}/>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    popRoute: key => dispatch(popRoute(key)),
    reset: (routes, key, index) => dispatch(reset(routes, key, index)),
    getUserFollowsData: (id, pageNumber, pageSize) => dispatch(getUserFollowsData(id, pageNumber, pageSize)),
    initUserFollows: () => dispatch(initUserFollows()),
  };
}

const mapStateToProps = state => {
  return {
    follows: state.userFollows.userFollowsData,
    navigation: state.cardNavigation,
  }
};

export default connect(mapStateToProps, bindAction)(FollowScreen);