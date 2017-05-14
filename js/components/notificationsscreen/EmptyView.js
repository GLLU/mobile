'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
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
      <View style={{flex: 1, flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
          <Text style={{textAlign: 'center'}}>You have no notifications yet</Text>
      </View>
    );
  }
}

export default EmptyView

