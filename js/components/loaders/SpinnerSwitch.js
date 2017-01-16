/* @flow */

import React, { Component } from 'react';
import { Platform, Image } from 'react-native';
import { View } from 'native-base';
import IosSpinner from './Spinner.ios';
import AndroidSpinner from './Spinner.android';
import styles from './styles';
const backgroundShadow = require('../../../images/background-shadow.png');

const currentOS = Platform.OS;

export default class SpinnerSwitch extends Component {

  render() {
    if(currentOS === 'ios') {
      return (
            <View style={styles.container}>
              <Image source={backgroundShadow} style={styles.bgShadow} />
              <IosSpinner />
            </View>
          )
    } else {
      return <AndroidSpinner />
    }
  }

}
