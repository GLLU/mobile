'use strict';

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity,View, Text } from 'react-native';
import { connect } from 'react-redux';
import EmptyView from './EmptyView'
import { getNotifications, clearNewNotifications } from '../../actions';

import NotificationListView from './notificationsList/NotificationListView'
import asScreen from "../common/containers/Screen"

class NotificationsScreen extends Component {

  constructor(props) {
    super(props);
    this.getNotificationsData = this.getNotificationsData.bind(this);
  }

  componentDidMount() {
    this.props.clearNewNotifications()
  }

  getNotificationsData() {
    this.props.getNotifications() // need to be moved to notification page
  }

  render() {
    let headerData = {
      mode: 'Notifications',
    }
    return (
          <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}}>
            <NotificationListView renderEmpty={()=><EmptyView/>}
                                  headerData={headerData}
                                  notifications={this.props.notifications}
                                  navigateTo={this.props.navigateTo}
                                  goBack={this.props.goBack}
                                  onEndReached={this.getNotificationsData}
                                  mode={headerData.mode}/>
          </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    getNotifications: name => dispatch(getNotifications(name)),
    clearNewNotifications: name => dispatch(clearNewNotifications(name)),
  };
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications,
  }
};

export default connect(mapStateToProps, bindAction)(asScreen(NotificationsScreen));