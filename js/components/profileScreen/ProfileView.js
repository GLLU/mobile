'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { View } from 'native-base';

import styles from './styles';

class ProfileView extends Component {

  static propTypes = {
    isMyProfile: React.PropTypes.bool,
    profilePic: React.PropTypes.string,
    name: React.PropTypes.string,
    username: React.PropTypes.string,
    onPress: React.PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.avatar, this.props.isMyProfile ? null : {left: 20}]}>
        <Image source={{uri: this.props.profilePic}} style={styles.avatarImg} />
        <Text style={styles.name}>{this.props.name}</Text>
        <Text style={styles.username}>@{this.props.username}</Text>
        {this.props.isMyProfile ?
          <TouchableOpacity style={styles.editBtn} onPress={() => this.props.onPress()}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.followBtn} onPress={() => this.props.onPress()}>
            <Text style={styles.followText}>Follow</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }
}

export default ProfileView

