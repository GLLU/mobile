/* @flow */

import React, {Component} from 'react';
import { Dimensions, Platform, ActivityIndicator, View } from 'react-native';
import Colors from '../../styles/Colors.styles';
const { width, height } = Dimensions.get('window');
export default class Spinner extends Component {

  render() {
    return (
      <View
        style={{
          width,
          height,
          backgroundColor: 'rgba(32, 32, 32, 0.6)',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
        }}>
        <ActivityIndicator animating color={Colors.secondaryColor} style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flexDirection: 'row',
        }}/>
      </View>
    );
  }

}
