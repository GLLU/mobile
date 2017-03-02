'use strict';

import React, { Component } from 'react';
import {StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { View } from 'native-base';

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

const styles = StyleSheet.create({
  editNameContainer: {
    borderBottomWidth: 2,
    borderColor : '#D9D9D9',
    paddingBottom: 5,
    marginHorizontal: 10,
  },
  editName: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Times New Roman',
  },
  editUsername: {
    textAlign: 'center',
    color: '#00ABED',
    padding: 20,
    fontSize: 18
  },
});