'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { View } from 'native-base';
import { noop } from  'lodash';

import styles from './styles';

class StatsView extends Component {

  static propTypes = {
    following: React.PropTypes.number,
    followers: React.PropTypes.number,
    likes: React.PropTypes.number,
    onFollowingPress: React.PropTypes.func,
    onFollowersPress: React.PropTypes.func,
    onLikesPress: React.PropTypes.func,
  };

  static defaultProps = {
    onFollowingPress: noop,
    onFollowersPress: noop,
    onLikesPress: noop
  };

  constructor(props) {
    super(props);
  }

  onFollowingPress() {
    this.props.onFollowingPress({type: 'following', count: this.props.following});
  }

  onFollowersPress() {
    this.props.onFollowersPress({type: 'followers', count: this.props.followers});
  }

  render() {
    return (
      <View style={styles.statsContainer}>
        <TouchableOpacity style={styles.statsTotal} onPress={this.onFollowingPress.bind(this)}>
          <Text style={[styles.text, styles.number]}>{this.props.following}</Text>
          <Text style={styles.text}>Following</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statsTotal} onPress={this.onFollowersPress.bind(this)}>
          <Text style={[styles.text, styles.number]}>{this.props.followers}</Text>
          <Text style={styles.text}>Followers</Text>
        </TouchableOpacity>
        <View style={styles.statsTotal}>
          <Text style={[styles.text, styles.number]}>{this.props.likes}</Text>
          <Text style={styles.text}>Likes</Text>
        </View>
      </View>
    )
  }
}

export default StatsView;

