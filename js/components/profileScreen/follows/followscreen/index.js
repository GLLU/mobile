'use strict';

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { getUserFollowsData, initUserFollows } from '../../../../actions';
import EmptyView from './EmptyView'

import FollowListView from '../shared/FollowListView'
import asScreen from "../../../common/containers/Screen"

class FollowScreen extends Component {

  static propTypes = {
    mode: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.getFollowsData = this.getFollowsData.bind(this);
    this._renderOnEmpty = this._renderOnEmpty.bind(this);
    this.currentPageIndex = 1;
    this.state = {
      follows: []
    }
  }

  componentWillMount() {
    const userData = this.props.navigation.state.params;
    if (userData.count) {
      this.getFollowsData();
    }
  }

  getFollowsData() {
    const userData = this.props.navigation.state.params;
    this.props.getUserFollowsData(userData.user.id, this.currentPageIndex);
    this.currentPageIndex++;
  }

  componentWillReceiveProps(nextProps) {
    const userData = this.props.navigation.state.params;
    if(nextProps.currId === userData.user.id){
      this.setState({follows: nextProps.follows})
    }
  }

  _renderOnEmpty() {
    const userData = this.props.navigation.state.params;
    return (
      <EmptyView onFindInterestingPeopleButtonPress={()=>this.props.resetTo('feedscreen')} isMyProfile={userData.isMyProfile} name={userData.user.name}/>
    );
  }

  render() {
    const userData = this.props.navigation.state.params;
    const currentUserData = this.state.follows
    return (
      <FollowListView
        renderEmpty={this._renderOnEmpty}
        headerData={userData}
        follows={currentUserData}
        navigateTo={this.props.navigateTo}
        goBack={this.props.goBack}
        onEndReached={this.getFollowsData}
        mode={userData.mode}/>
    );
  }
}

function bindAction(dispatch) {
  return {
    getUserFollowsData: (id, pageNumber, pageSize) => dispatch(getUserFollowsData(id, pageNumber, pageSize)),
  };
}

const mapStateToProps = state => {
  return {
    follows: state.userFollows.userFollowsData,
    currId: state.userFollows.currId,
  }
};

export default connect(mapStateToProps, bindAction)(asScreen(FollowScreen));