'use strict';

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity, Text } from 'react-native';
import { Container, Content, View } from 'native-base'
import { connect } from 'react-redux';
import EmptyView from './EmptyView'
import { navigateTo, popRoute, getNotifications } from '../../actions';

import FollowListView from './notificationsList/FollowListView'

class NotificationsScreen extends Component {

  constructor(props) {
    super(props);
    this.getFollowersData = this.getFollowersData.bind(this);
    this._renderOnEmpty = this._renderOnEmpty.bind(this);
  }

  componentWillMount() {
    // if (this.props.userData.count) {
    //   this.getFollowersData();
    // }
  }

  getFollowersData() {
    this.props.getNotifications() // need to be moved to notification page
  }

  _handleOpenPhotoModal() {
    this.setState({photoModal: true});
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
      <EmptyView onUploadButtonPress={this._handleOpenPhotoModal}
                 name={'yoni'}/>
    );
  }

  render() {
    let headerData = {
      mode: 'Notifications',
    }
    console.log('blab')
    return (
          <View>
            <FollowListView renderEmpty={this._renderOnEmpty} headerData={headerData}
                            follows={this.props.notifications}
                            onEndReached={this.getFollowersData} mode={headerData.mode}/>
          </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    popRoute: key => dispatch(popRoute(key)),
    getNotifications: name => dispatch(getNotifications(name)),
  };
}

const mapStateToProps = state => {
  return {
    followers: state.userFollowers.userFollowersData,
    notifications: state.notifications.allNotifications,
    navigation: state.cardNavigation,
  }
};

export default connect(mapStateToProps, bindAction)(NotificationsScreen);