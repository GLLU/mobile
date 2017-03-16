'use strict';

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity, Text } from 'react-native';
import { View } from 'native-base'
import { connect } from 'react-redux';
import { navigateTo, popRoute, getUserFollowsData, initUserFollows } from '../../../../actions';

import FollowListView from '../shared/FollowListView'

class FollowScreen extends Component {

  static propTypes = {
    mode: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.getFollowsData = this.getFollowsData.bind(this);
    this.currentPageIndex = 1;
  }

  componentWillMount() {
    if(this.props.userData.count) {
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

  _renderOnEmpty() {
    return (
      <View>
        <View style={{flex:1}} name="spacer"/>
        <Text style={{flex:1, textAlign:'center'}}>
          You are not following anyone
        </Text>
        <View style={{flex:1}} name="spacer"/>
      </View>
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