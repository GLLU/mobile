// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Splash from './Splash';
import asScreen from '../common/containers/Screen';
import { checkLogin } from '../../actions/user';
import { setUsers } from '../../actions/users';
import { goToNotificationSubjectScreen} from '../../actions/notifications';

function bindAction(dispatch) {
  return {
    checkLogin: user => dispatch(checkLogin(user)),
    setUsers: user => dispatch(setUsers(user)),
    goToNotificationSubjectScreen: (objectId, notificationId) => dispatch(goToNotificationSubjectScreen(objectId, notificationId)),
  };
}

const mapStateToProps = (state, ownProps) => ({
  notification: ownProps.notification,
  user: state.user,
});

export default connect(mapStateToProps, bindAction)(asScreen(Splash));
