'use strict';

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import EmptyView from './EmptyView'
import SelectPhoto from '../../../common/SelectPhoto';
import { navigateTo, popRoute, addNewLook, getUserFollowersData, initUserFollowers } from '../../../../actions';

import FollowListView from '../shared/FollowListView'

class FollowerScreen extends Component {

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
      photoModal: false
    }
  }

  componentWillMount() {
    if (this.props.userData.count) {
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

  _handleOpenPhotoModal() {
    this.setState({photoModal: true});
  }

  _handleClosePhotoModal() {
    this.setState({photoModal: false});
  }

  goToAddNewItem(imagePath) {
    this.setState({photoModal: false}, () => {
      this.props.addNewLook(imagePath).then(() => {
        this.props.popRoute(this.props.navigation.key);
        this.props.navigateTo('addItemScreen', 'profileScreen');
      });
    })
  }

  _renderOnEmpty() {
    return (
      <EmptyView onUploadButtonPress={this._handleOpenPhotoModal} isMyProfile={this.props.userData.isMyProfile}
                 name={this.props.userData.user.name}/>
    );
  }

  render() {
    return (
          <View>
            <FollowListView renderEmpty={this._renderOnEmpty} headerData={this.props.userData}
                            follows={this.props.followers}
                            onEndReached={this.getFollowersData} mode={this.props.userData.mode}/>
            <SelectPhoto photoModal={this.state.photoModal} addNewItem={this.goToAddNewItem}
                         onRequestClose={this._handleClosePhotoModal}/>
          </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    popRoute: key => dispatch(popRoute(key)),
    addNewLook: (imagePath) => dispatch(addNewLook(imagePath)),
    getUserFollowersData: (id, pageNumber, pageSize) => dispatch(getUserFollowersData(id, pageNumber, pageSize)),
    initUserFollowers: () => dispatch(initUserFollowers()),
  };
}

const mapStateToProps = state => {
  return {
    followers: state.userFollowers.userFollowersData,
    navigation: state.cardNavigation,
  }
};

export default connect(mapStateToProps, bindAction)(FollowerScreen);