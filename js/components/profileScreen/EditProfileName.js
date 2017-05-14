'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, Text,View  } from 'react-native';

import styles from './styles';

class ExpandableTextArea extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    username: React.PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {
      height: 0
    }
  }

  render() {
    return (
      <View>
        <View style={styles.editNameContainer}>
          <Text style={styles.editName}>{this.props.name}</Text>
        </View>
        <Text style={styles.editUsername}>@{this.props.username}</Text>
      </View>
    )
  }
}

export default ExpandableTextArea

