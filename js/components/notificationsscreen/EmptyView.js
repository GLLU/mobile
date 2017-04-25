'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { View, Icon } from 'native-base';
import { noop } from 'lodash';


import styles from '../profileScreen/styles'

class EmptyView extends Component {

  static propTypes = {
    isMyProfile: React.PropTypes.bool,
    name: React.PropTypes.string,
    onUploadButtonPress: React.PropTypes.func,
  };

  static defaultProps = {
    isMyProfile: true,
    onUploadButtonPress: noop
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={{flex:1}} name="spacer"/>
        <View style={{flex:1}}>
          <Text style={{textAlign:'center'}}>
            You have no notifications yet
          </Text>
          <View>
            <View style={{flexDirection:'row', paddingTop: 15}}>
              <View style={{flex:3}} name="spacer"/>
              <View style={{flex:3}} name="spacer"/>
            </View>
          </View>
        </View>
        <Text style={{flex:1, textAlign:'center'}}>

        </Text>
        <View style={{flex:1}} name="spacer"/>
      </View>
    );
  }
}

export default EmptyView

