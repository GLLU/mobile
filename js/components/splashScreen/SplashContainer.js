// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Splash from './Splash';
import asScreen from '../common/containers/Screen';
import { checkLogin } from '../../actions/user';

function bindAction(dispatch) {
  return {
    checkLogin: user => dispatch(checkLogin(user)),
  };
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, bindAction)(asScreen(Splash));
