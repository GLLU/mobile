'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, TextInput, Platform, View, Dimensions, StyleSheet } from 'react-native';

const cameraWhite = require('../../../../images/icons/cameraWhite.png');

const w = Dimensions.get('window').width

const styles=StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
  },
  profilePicBtn: {
    width: 30,
    height: 20,
  },
  editProfileAvatarImg: {
    position: 'absolute',
    top: 100,
    left: w / 2 - 50,
  },
  editAvatarImage: {
    borderWidth: 2,
    borderColor: 'white'
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
  }
});


class CircleProfileImage extends Component {

  static propTypes = {
    avatarUrl: React.PropTypes.string,
    editable: React.PropTypes.bool,
    changeUserAvatar: React.PropTypes.func,
  }

  renderImage(){
    return <TouchableOpacity transparent onPress={() => this.props.changeUserAvatar()} style={this.props.style||styles.editProfileAvatarImg}>
      <Image source={{uri: this.props.avatarUrl}} style={[styles.avatarImg, (Platform.OS === 'ios') ? styles.editAvatarImage : null]} borderRadius={50} >
        { this.props.editable ?
          <View style={[styles.changeImageIconContainer, (Platform.OS === 'ios') ? null : styles.editAvatarImage]}>
            <Image source={cameraWhite} style={styles.profilePicBtn} resizeMode={'contain'} />
          </View>
          : null
        }
      </Image>
    </TouchableOpacity>
  }

  renderWhiteCircle(){
    return <TouchableOpacity transparent onPress={() => this.props.changeUserAvatar()} style={this.props.style||styles.editProfileAvatarImg}>
      <View style={[styles.avatarImg, (Platform.OS === 'ios') ? styles.editAvatarImage : null]} borderRadius={50} >
        { this.props.editable ?
          <View style={[styles.changeImageIconContainer, (Platform.OS === 'ios') ? null : styles.editAvatarImage]}>
            <Image source={cameraWhite} style={styles.profilePicBtn} resizeMode={'contain'} />
          </View>
          : null
        }
      </View>
    </TouchableOpacity>
  }


  render() {
    return this.props.avatarUrl ? this.renderImage() : this.renderWhiteCircle();
  }
}

export default CircleProfileImage

