'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, TextInput,View, StyleSheet } from 'react-native';

import BaseComponent from '../common/base/BaseComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

const cancelEdit = require('../../../images/icons/cancelEdit.png');

const styles = StyleSheet.create({
  header: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  headerBtn: {
    backgroundColor: 'transparent',
    height: 40
  },
  saveChangesContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#00D7B2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelEdit: {
    width: 40,
    height: 40,
  },
});


class ProfileHeader extends BaseComponent {

  static propTypes = {
    cancelEdit: React.PropTypes.func,
    save: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.handleCancelPress=this.handleCancelPress.bind(this);
    this.handleSavePress=this.handleSavePress.bind(this);
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
        <TouchableOpacity transparent onPress={this.handleCancelPress} style={styles.headerBtn}>
          <Image source={cancelEdit} style={styles.cancelEdit} />
        </TouchableOpacity>
        <TouchableOpacity transparent onPress={this.handleSavePress} style={styles.headerBtn}>
          <View style={styles.saveChangesContainer}>
            <Icon size={20} color={'white'} name={'check'}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default ProfileHeader

