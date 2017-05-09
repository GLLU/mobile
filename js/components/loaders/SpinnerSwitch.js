/* @flow */

import React, { Component } from 'react';
import { View,Image, StyleSheet } from 'react-native';
import Spinner from './Spinner';
import styles from './styles';
const backgroundShadow = require('../../../images/background-shadow.png');

export default class SpinnerSwitch extends Component {

  render() {
      return (
            <View style={StyleSheet.flatten(styles.container)}>
              <Image source={backgroundShadow} style={styles.bgShadow} />
              <Spinner />
            </View>
          )
  }

}
