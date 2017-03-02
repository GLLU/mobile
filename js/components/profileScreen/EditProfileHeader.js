'use strict';

import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { View } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

const cancelEdit = require('../../../images/icons/cancelEdit.png');

class ProfileHeader extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
    save: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      height: 0
    }
  }

  render() {
    return (
      <View style={styles.header}>
        <TouchableOpacity transparent onPress={() => this.props.popRoute()} style={styles.headerBtn}>
          <Image source={cancelEdit} style={styles.cancelEdit} />
        </TouchableOpacity>
        <TouchableOpacity transparent onPress={() => this.props.save()} style={styles.headerBtn}>
          <View style={styles.saveChangesContainer}>
            <Icon size={20} color={'white'} name={'check'}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default ProfileHeader

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  headerBtn: {
    backgroundColor: 'transparent',
  },
  cancelEdit: {
    marginLeft: 20,
    width: 40,
    height: 40,
  },
  saveChangesContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#00D7B2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  },
});