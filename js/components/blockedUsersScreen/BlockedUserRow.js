// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { noop } from "lodash";
import UnblockView from "./UnblockView";
import Colors from "../../styles/Colors.styles";
import Fonts from "../../styles/Fonts.styles";

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  userContainer: {
    flex: 7,
    flexDirection: 'column',
    marginLeft: 12
  },
  name: {
    flex: 0.5,
    color: Colors.black,
    fontFamily: Fonts.boldFont,
    fontWeight: 'bold',
    fontSize: 14
  },
  username: {
    flex: 0.5,
    color: Colors.usernameColor,
    fontFamily: Fonts.boldFont,
  },
  photoContainer: {
    flex: 2,
  },
  photo: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  unblockView: {
    flex: 3
  }
});

type Props = {
  userId: number,
  name: string,
  username: string,
  avatar: object,
  onUnblockPress: void
}

class BlockedUserRow extends PureComponent {

  props: Props;

  static defaultProps = {
    onUnblockPress: noop
  };

  constructor(props: Props) {
    super(props);
    this._onUnblockPress = this._onUnblockPress.bind(this);
  }

  _onUnblockPress = () => this.props.onUnblockPress(this.props.userId);

  renderUserData() {
    const {name, username} = this.props;
    return (
      <View style={styles.userContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>@{username}</Text>
      </View>
    )
  }

  renderAvatar(avatar: object) {
    return (
      <View style={styles.photoContainer}>
        <Image resizeMode='cover' source={{uri: avatar.url}} style={styles.photo}/>
      </View>
    );
  }

  render() {
    console.log('this.props',this.props)
    const {avatar, style} = this.props;
    return (
      <View style={[styles.container, style]}>
        {this.renderAvatar(avatar)}
        {this.renderUserData()}
        <UnblockView onPress={this._onUnblockPress} style={styles.unblockView}/>
      </View>
    )
  }
}

export default BlockedUserRow