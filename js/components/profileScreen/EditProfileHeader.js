'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, TextInput } from 'react-native';
import { View } from 'native-base';

import styles from './styles';
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

