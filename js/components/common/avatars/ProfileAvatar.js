'use strict';

import React, { PureComponent } from 'react';
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


class ProfileAvatar extends PureComponent {

  static propTypes = {
    isLoading: React.PropTypes.bool,
    avatarUrl: React.PropTypes.string,
    isEditable: React.PropTypes.bool,
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
    const {avatarUrl,isEditable,isLoading}=this.props;
    return (
        <Image source={{uri: avatarUrl}} style={this.getContainerStyle()} borderRadius={50}>
          {this.renderOverlay(isEditable, isLoading)}
        </Image>
    );
  }

  renderWhiteCircle() {
    const {isEditable,isLoading}=this.props;
    return (
        <View style={this.getContainerStyle()} borderRadius={50}>
          {this.renderOverlay(isEditable, isLoading)}
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
    const {avatarUrl, changeUserAvatar,style} = this.props;
    return(
      <TouchableOpacity transparent onPress={changeUserAvatar} style={style || styles.editProfileAvatarImg}>
        {avatarUrl ? this.renderAvatar() : this.renderWhiteCircle()}
      </TouchableOpacity>
    );
  }
}

export default ProfileAvatar

