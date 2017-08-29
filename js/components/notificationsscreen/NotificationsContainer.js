

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNotifications, clearNewNotifications } from '../../actions';
import NotificationsScreen from './NotificationsScreen';
import asScreen from "../common/containers/Screen"
import { addNewLook } from '../../actions/uploadLook';

function bindAction(dispatch) {
  return {
    getNotifications: name => dispatch(getNotifications(name)),
    clearNewNotifications: name => dispatch(clearNewNotifications(name)),
    addNewLook: imagePath => dispatch(addNewLook(imagePath)),
  };
}

const mapStateToProps = state => {
  console.log('notifications',state.notifications)
  return {
  notifications: state.notifications,
  isLoading: state.notifications.isLoading,
}};

export default connect(mapStateToProps, bindAction)(asScreen(NotificationsScreen));
