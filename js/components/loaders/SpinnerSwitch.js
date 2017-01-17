/* @flow */

import React, { Component } from 'react';
import { Image } from 'react-native';
import { View } from 'native-base';
import Spinner from './Spinner';
import styles from './styles';
const backgroundShadow = require('../../../images/background-shadow.png');

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
