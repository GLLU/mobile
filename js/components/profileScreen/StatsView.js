'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
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
    this.onFollowingPress = this.onFollowingPress.bind(this);
    this.onFollowersPress = this.onFollowersPress.bind(this);

  }

  onFollowingPress() {
    this.props.onFollowingPress({type: 'following', count: this.props.following});
  }

  onFollowersPress() {
    this.props.onFollowersPress({type: 'followers', count: this.props.followers});
  }

  renderBalance() {
    return (
      <TouchableOpacity style={styles.statsTotal} onPress={this.props.handleBalancePress}>
        <Text style={[styles.text, styles.number]}>$0</Text>
        <Text style={styles.text}>Balance</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { following, followers, likes, isMyProfile } = this.props
    return (
      <View style={styles.statsContainer}>
        { isMyProfile ? this.renderBalance() : null }
        <TouchableOpacity style={styles.statsTotal} onPress={this.onFollowingPress}>
          <Text style={[styles.text, styles.number]}>{`${following}`}</Text>
          <Text style={styles.text}>Following</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statsTotal} onPress={this.onFollowersPress}>
          <Text style={[styles.text, styles.number]}>{`${followers}`}</Text>
          <Text style={styles.text}>Followers</Text>
        </TouchableOpacity>
        <View style={styles.statsTotal}>
          <Text style={[styles.text, styles.number]}>{`${likes}`}{likes}</Text>
          <Text style={styles.text}>Likes</Text>
        </View>
      </View>
    )
  }
}

export default StatsView;

