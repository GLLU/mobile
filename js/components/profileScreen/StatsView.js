'use strict';

import React, { Component } from 'react';
import {StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { View } from 'native-base';

class StatsView extends Component {

  static propTypes = {
    following: React.PropTypes.number,
    followers: React.PropTypes.number,
    likes: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.statsContainer}>
        <View style={styles.statsTotal}>
          <Text style={[styles.text, styles.number]}>{this.props.following}</Text>
          <Text style={styles.text}>Following</Text>
        </View>
        <View style={styles.statsTotal}>
          <Text style={[styles.text, styles.number]}>{this.props.followers}</Text>
          <Text style={styles.text}>Followers</Text>
        </View>
        <View style={styles.statsTotal}>
          <Text style={[styles.text, styles.number]}>{this.props.likes}</Text>
          <Text style={styles.text}>Likes</Text>
        </View>
      </View>
    )
  }
}

export default StatsView

const styles = StyleSheet.create({
  statsContainer:{
    flexDirection: 'row',
    height: 75,
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30,
    backgroundColor: 'transparent',

  },
  statsTotal: {
    backgroundColor: 'black',
    justifyContent: 'center',
    opacity: 0.8
  },
  text: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    width: 75,
  },
  number: {
    fontSize: 30
  },
});