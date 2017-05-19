'use strict';

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { getUserFollowsData, initUserFollows } from '../../../../actions';
import EmptyView from './EmptyView'

import FollowListView from '../shared/FollowListView'
import BasePage from "../../../common/base/BasePage";

class FollowScreen extends BasePage {

  static propTypes = {
    mode: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.getFollowsData = this.getFollowsData.bind(this);
    this._renderOnEmpty = this._renderOnEmpty.bind(this);
    this.currentPageIndex = 1;
  }

  componentWillMount() {
    const userData = this.props.navigation.state.params;
    if (userData.count) {
      this.getFollowsData();
    }
  }

  componentWillUnmount() {
    this.props.initUserFollows();
  }

  getFollowsData() {
    const userData = this.props.navigation.state.params;
    this.props.getUserFollowsData(userData.user.id, this.currentPageIndex);
    this.currentPageIndex++;
  }

  _renderOnEmpty() {
    const userData = this.props.navigation.state.params;
    return (
      <EmptyView onFindInterestingPeopleButtonPress={()=>this.resetTo('feedscreen')} isMyProfile={userData.isMyProfile} name={userData.user.name}/>
    );
  }

  render() {
    const userData = this.props.navigation.state.params;
    return (
      <FollowListView
        renderEmpty={this._renderOnEmpty}
        headerData={userData}
        follows={this.props.follows}
        navigateTo={this.navigateTo}
        goBack={this.goBack}
        onEndReached={this.getFollowsData}
        mode={userData.mode}/>
    );
  }
}

function bindAction(dispatch) {
  return {
    getUserFollowsData: (id, pageNumber, pageSize) => dispatch(getUserFollowsData(id, pageNumber, pageSize)),
    initUserFollows: () => dispatch(initUserFollows()),
  };
}

const mapStateToProps = state => {
  return {
    follows: state.userFollows.userFollowsData,
  }
};

export default connect(mapStateToProps, bindAction)(FollowScreen);