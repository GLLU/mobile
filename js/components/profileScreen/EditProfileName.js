'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { View } from 'native-base';

import styles from './styles';

class ExpandableTextArea extends Component {

  static propTypes = {
    item: React.PropTypes.object,
    onPress: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      height: 0
    }
  }

  render() {
    return (
      <View style={{top: 60}}>
        <View style={styles.editNameContainer}>
          <Text style={styles.editName}>{this.props.name}</Text>
        </View>
        <Text style={styles.editUsername}>@{this.props.username}</Text>
      </View>
    )
  }
}

export default ExpandableTextArea

