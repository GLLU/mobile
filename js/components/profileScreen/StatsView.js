'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { View } from 'native-base';

import styles from './styles';

class StatsView extends Component {

  static propTypes = {
    item: React.PropTypes.object,
    onPress: React.PropTypes.func
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

