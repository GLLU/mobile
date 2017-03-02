'use strict';

import React, { Component } from 'react';
import {StyleSheet, Dimensions, Image, TouchableOpacity, TextInput, Platform } from 'react-native';
import { View } from 'native-base';
const w = Dimensions.get('window').width

const cameraWhite = require('../../../images/icons/cameraWhite.png');

class CircleProfileImage extends Component {

  static propTypes = {
    avatarUrl: React.PropTypes.string,
    editable: React.PropTypes.bool,
    changeUserAvatar: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      height: 0
    }
  }

  render() {
    return (
      <TouchableOpacity transparent onPress={() => this.props.changeUserAvatar()} style={styles.editProfileAvatarImg}>
        <Image source={{uri: this.props.avatarUrl}} style={[styles.avatarImg, (Platform.OS === 'ios') ? styles.editAvatarImage : null]} borderRadius={50} >
          { this.props.editable ?
            <View style={[styles.changeImageIconContainer, (Platform.OS === 'ios') ? null : styles.editAvatarImage]}>
              <Image source={cameraWhite} style={styles.profilePicBtn} resizeMode={'contain'} />
            </View>
            : null
          }
        </Image>
      </TouchableOpacity>
    )
  }
}

export default CircleProfileImage

const styles = StyleSheet.create({
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
  },
  editProfileAvatarImg: {
    position: 'absolute',
    top: 100,
    left: w / 2 - 50,
  },
  changeImageIconContainer: {
    width: 100,
    height: 100,
    opacity: 0.8,
    backgroundColor: '#00D7B2',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  editAvatarImage: {
    borderWidth: 2,
    borderColor: 'white'
  },
});