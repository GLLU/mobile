// @flow

import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, TextInput, Platform, View, Dimensions, StyleSheet } from 'react-native';
import Spinner from '../../loaders/Spinner';
import { noop } from 'lodash';

import Colors from '../../../styles/Colors.styles';

const cameraWhite = require('../../../../images/icons/cameraWhite.png');

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImg: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: 'transparent',
  },
  profilePicBtn: {
    width: 30,
    height: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarImage: {
    borderWidth: 2,
    borderColor: Colors.white,
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
  },
});

class ProfileAvatar extends PureComponent {

  static propTypes = {
    isLoading: React.PropTypes.bool,
    avatarUrl: React.PropTypes.string,
    isEditable: React.PropTypes.bool,
    changeUserAvatar: React.PropTypes.func,
  };

  static defaultProps = {
    changeUserAvatar: noop,
  };

  getContainerStyle = () => Platform.OS === 'ios' ?
    [styles.avatarImg, styles.editAvatarImage] :
    styles.avatarImg

  renderAvatar(): React.Component {
    const { avatarUrl, isEditable, isLoading, style } = this.props;

    let borderRadius = 50;

    if (style && style.width) {
      borderRadius = style.width / 2;
    }
    return (
      <Image source={{ uri: avatarUrl }} style={[this.getContainerStyle(), style, {borderRadius}]} borderRadius={borderRadius}>
        {this.renderOverlay(isEditable, isLoading, style)}
      </Image>
    );
  }

  renderWhiteCircle(): React.Component {
    const { isEditable, isLoading, style } = this.props;

    let borderRadius = 50;

    if (style && style.width) {
      borderRadius = style.width / 2;
    }

    return (
      <View style={[this.getContainerStyle(), style]} borderRadius={borderRadius}>
        {this.renderOverlay(isEditable, isLoading, style)}
      </View>
    );
  }

  renderOverlay(isEditable: boolean, isLoading: boolean): React.Component {
    return isEditable ? isLoading ?
      <Spinner color="white" style={styles.profilePicBtn} /> :
      <Image source={cameraWhite} style={styles.profilePicBtn} resizeMode={'contain'} />
      : null;
  }

  render(): React.Component {
    const { avatarUrl, changeUserAvatar } = this.props;
    return (
      <TouchableOpacity transparent onPress={changeUserAvatar}>
        {avatarUrl ? this.renderAvatar() : this.renderWhiteCircle()}
      </TouchableOpacity>
    );
  }
}

export default ProfileAvatar;

