'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, TextInput, Platform, View, Dimensions, StyleSheet } from 'react-native';
import Spinner from "../../loaders/Spinner";
import { noop } from "lodash";

const cameraWhite = require('../../../../images/icons/cameraWhite.png');

const w = Dimensions.get('window').width

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: 'white'
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  }
});


class ProfileAvatar extends Component {

  static propTypes = {
    isLoading: React.PropTypes.bool,
    avatarUrl: React.PropTypes.string,
    editable: React.PropTypes.bool,
    changeUserAvatar: React.PropTypes.func,
  };

  static defaultProps = {
    changeUserAvatar: noop
  };

  getContainerStyle = () => {
    return Platform.OS === 'ios' ?
      [styles.avatarImg, styles.editAvatarImage] :
      styles.avatarImg
  }

  renderAvatar() {
    return (
        <Image source={{uri: this.props.avatarUrl}} style={this.getContainerStyle()} borderRadius={50}>
          {this.renderOverlay(this.props.editable, this.props.isLoading)}
        </Image>
    );
  }

  renderWhiteCircle() {
    return (
        <View style={this.getContainerStyle()} borderRadius={50}>
          {this.renderOverlay(this.props.editable, this.props.isLoading)}
        </View>
    );
  }

  renderOverlay(isEditable, isLoading) {
    return isEditable ? (
      <View style={[styles.changeImageIconContainer, (Platform.OS === 'ios') ? null : styles.editAvatarImage]}>
        {
          isLoading ?
            <Spinner color='white' style={styles.profilePicBtn}/> :
            <Image source={cameraWhite} style={styles.profilePicBtn} resizeMode={'contain'}/>
        }
      </View>
    ) : null;
  }


  render() {
    return(
      <TouchableOpacity transparent onPress={this.props.changeUserAvatar} style={this.props.style || styles.editProfileAvatarImg}>
        {this.props.avatarUrl ? this.renderAvatar() : this.renderWhiteCircle()}
      </TouchableOpacity>
    );
  }
}

export default ProfileAvatar

