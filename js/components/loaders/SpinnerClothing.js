/* @flow */

import React, { Component } from 'react';
import { Image, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
export default class Spinner extends Component {

  render() {
    return (
      <Image source={require('../../../images/upload/loadingImg.png')} resizeMode={'cover'} style={{
        width,
        height,
        backgroundColor: 'rgba(32, 32, 32, 0.6)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}/>
    );
  }

}
