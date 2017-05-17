'use strict';

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity,View, Text } from 'react-native';
import { connect } from 'react-redux';
import EmptyView from './EmptyView'
import { navigateTo, popRoute, getNotifications, clearNewNotifications } from '../../actions';

import NotificationListView from './notificationsList/NotificationListView'
import BasePage from "../common/BasePage";

class NotificationsScreen extends BasePage {

  constructor(props) {
    super(props);
    this.getNotificationsData = this.getNotificationsData.bind(this);
    this._renderOnEmpty = this._renderOnEmpty.bind(this);
  }

  componentDidMount() {
    this.props.clearNewNotifications()
  }

  getNotificationsData() {
    this.props.getNotifications() // need to be moved to notification page
  }

  _handleOpenPhotoModal() {
    this.setState({photoModal: true});
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
    return (
          <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
            <NotificationListView renderEmpty={this._renderOnEmpty}
                                  headerData={headerData}
                                  notifications={this.props.notifications}
                                  navigateTo={this.navigateTo}
                                  goBack={this.goBack}
                                  onEndReached={this.getNotificationsData}
                                  mode={headerData.mode}/>
          </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    popRoute: key => dispatch(popRoute(key)),
    getNotifications: name => dispatch(getNotifications(name)),
    clearNewNotifications: name => dispatch(clearNewNotifications(name)),
  };
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications,
  }
};

export default connect(mapStateToProps, bindAction)(NotificationsScreen);