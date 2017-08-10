// @flow

import React, { Component } from 'react';
import { View, Image, Linking, Platform, Dimensions, TouchableOpacity } from 'react-native';

import Spinner from '../loaders/Spinner';

const background = require('../../../images/backgrounds/splashScreen.png');
const deviceWidth = Dimensions.get('window').width;


type SplashProps = {
  checkLogin: ()=> void,
  resetTo: (string)=> void
};

class Splash extends Component {

  props: SplashProps;

  constructor(props: SplashProps) {
    super(props);
    this.checkLogin = this.checkLogin.bind(this);
  }

  componentWillMount() {
    this.checkLogin();
  }

  checkLogin() {
    setTimeout(() => {
      this.props.checkLogin()
        .then(() => {
          this.props.resetTo('feedscreen');
        })
        .catch(() => {
          this.props.resetTo('loginscreen');
        });
    }, 1000);
  }

  render() {
    return (
      <Image
        source={background} resizeMode={'stretch'}
        style={{ flex: 1, width: deviceWidth, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner />
      </Image>
    );
  }
}

export default Splash;
