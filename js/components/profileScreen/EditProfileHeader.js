'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, TextInput,View } from 'react-native';

import BaseComponent from '../common/BaseComponent';

import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const cancelEdit = require('../../../images/icons/cancelEdit.png');

class ProfileHeader extends BaseComponent {

  static propTypes = {
    cancelEdit: React.PropTypes.func,
    save: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      height: 0
    }
  }

  handleCancelPress() {
    this.logEvent('EditProfileScreen', { name: 'Cancel click' });
    this.props.cancelEdit();
  }

  handleSavePress() {
    this.logEvent('EditProfileScreen', { name: 'Save click' });
    this.props.save();
  }

  render() {
    return (
      <View style={styles.header}>
        <TouchableOpacity transparent onPress={this.handleCancelPress.bind(this)} style={styles.headerBtn}>
          <Image source={cancelEdit} style={styles.cancelEdit} />
        </TouchableOpacity>
        <TouchableOpacity transparent onPress={this.handleSavePress.bind(this)} style={styles.headerBtn}>
          <View style={styles.saveChangesContainer}>
            <Icon size={20} color={'white'} name={'check'}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default ProfileHeader

