/* @flow */

import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { View } from 'native-base';
import Spinner from './Spinner';
const backgroundShadow = require('../../../images/background-shadow.png');
const deviceHeight = Dimensions.get('window').height;

export default class SpinnerSwitch extends Component {

  render() {
      return (
            <View style={styles.container}>
              <Image source={backgroundShadow} style={styles.bgShadow} />
              <Spinner />
            </View>
          )
  }

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(192,192,192, .4)',
    height: deviceHeight
  },
  bgShadow: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0
  }
});