'use strict';

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import EmptyView from './EmptyView'
import SelectPhoto from '../../../common/SelectPhoto';
import { addNewLook, getUserFollowersData, initUserFollowers } from '../../../../actions';

import FollowListView from '../shared/FollowListView'
import BasePage from "../../../common/base/BasePage";

class FollowerScreen extends BasePage {

  static propTypes = {
    mode: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.getFollowersData = this.getFollowersData.bind(this);
    this._renderOnEmpty = this._renderOnEmpty.bind(this);
    this._handleOpenPhotoModal = this._handleOpenPhotoModal.bind(this);
    this._handleClosePhotoModal = this._handleClosePhotoModal.bind(this);
    this.goToAddNewItem = this.goToAddNewItem.bind(this);
    this.currentPageIndex = 1;
    this.state = {
      photoModal: false,
      followers: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const userData = this.props.navigation.state.params;
    if(nextProps.currId === userData.user.id){
      this.setState({followers: nextProps.followers})
    }
  }

  componentWillMount() {
    const userData = this.props.navigation.state.params;
    if (userData.count) {
      this.getFollowersData();
    }
  }

  getFollowersData() {
    const userData = this.props.navigation.state.params;
    this.props.getUserFollowersData(userData.user.id, this.currentPageIndex);
    this.currentPageIndex++;
  }

  _handleOpenPhotoModal() {
    this.setState({photoModal: true});
  }

  _handleClosePhotoModal() {
    this.setState({photoModal: false});
  }

  goToAddNewItem(imagePath) {
    this.setState({photoModal: false}, () => {
      this.props.addNewLook(imagePath).then(() => {
        this.navigateTo('addItemScreen');
      });
    })
  }

  _renderOnEmpty() {
    const userData = this.props.navigation.state.params;
    return (
      <EmptyView onUploadButtonPress={this._handleOpenPhotoModal} isMyProfile={userData.isMyProfile}
                 name={userData.user.name}/>
    );
  }

  render() {
    const userData = this.props.navigation.state.params;
    const currentUserData = this.state.followers;
    return (
          <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}} >
            <FollowListView
              renderEmpty={this._renderOnEmpty}
              headerData={userData}
              follows={currentUserData}
              navigateTo={this.navigateTo}
              goBack={this.goBack}
              onEndReached={this.getFollowersData}
              mode={userData.mode}/>
            <SelectPhoto photoModal={this.state.photoModal} addNewItem={this.goToAddNewItem}
                         onRequestClose={this._handleClosePhotoModal}/>
          </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    addNewLook: (imagePath) => dispatch(addNewLook(imagePath)),
    getUserFollowersData: (id, pageNumber, pageSize) => dispatch(getUserFollowersData(id, pageNumber, pageSize)),
  };
}

const mapStateToProps = state => {
  return {
    followers: state.userFollowers.userFollowersData,
    currId: state.userFollowers.currId,
  }
};

export default connect(mapStateToProps, bindAction)(FollowerScreen);