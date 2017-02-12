'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, TextInput } from 'react-native';
import { View } from 'native-base';

import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const cameraWhite = require('../../../images/icons/cameraWhite.png');

class CircleProfileImage extends Component {

  static propTypes = {
    avatarUrl: React.PropTypes.string,
    editable: React.PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      height: 0
    }
  }

  render() {
    return (
      <TouchableOpacity transparent onPress={() => this.props.changeUserAvatar()} style={styles.editProfileAvatarImg}>
        <Image source={{uri: this.props.avatarUrl}} style={[styles.avatarImg, styles.editAvatarImage]} >
          { this.props.editable ?
            <View style={styles.changeImageIconContainer}>
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

