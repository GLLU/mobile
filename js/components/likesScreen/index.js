'use strict';

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getLookLikes, initLookLikes } from '../../actions';
import asScreen from "../common/containers/Screen"
import UserActionRow from "../common/lists/UserActionRow";
import ListScreen from "../common/lists/ListScreen";

class LikesScreen extends Component {

  static propTypes = {
    mode: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.getLookLikesData = this.getLookLikesData.bind(this);
    this.currentPageIndex = 1;
  }

  componentWillMount() {
    const userData = this.props.navigation.state.params.lookId;
    if (userData) {
      this.getLookLikesData(userData);
    }

  }

  componentWillUnmount() {
    this.props.initLookLikes();
  }

  getLookLikesData() {
    const {lookId} = this.props.navigation.state.params;
    this.props.getLookLikes(lookId, this.currentPageIndex);
    this.currentPageIndex++;
  }
  
  render() {
    const userData = this.props.navigation.state.params;
    const headerData = {title: 'Likes', count:userData.count};
    return (
      <ListScreen
        renderEmpty={()=>null}
        renderItem={(item) => <UserActionRow {...item} navigateTo={this.props.navigateTo}/>}
        headerData={headerData}
        data={this.props.likes}
        navigateTo={this.props.navigateTo}
        goBack={this.props.goBack}
        onEndReached={this.getLookLikesData}/>
    );
  }
}

function bindAction(dispatch) {
  return {
    getLookLikes: (id, pageNumber, pageSize) => dispatch(getLookLikes(id, pageNumber, pageSize)),
    initLookLikes: () => dispatch(initLookLikes()),
  };
}

const mapStateToProps = state => {
  return {
    likes: state.lookLikes.lookLikesData,
  }
};

export default connect(mapStateToProps, bindAction)(asScreen(LikesScreen));