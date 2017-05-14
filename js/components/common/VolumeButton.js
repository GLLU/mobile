'use strict';

import React, { Component } from 'react';
import { StyleSheet, Image, Platform, TouchableOpacity,View } from 'react-native';
import { Icon } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";

import { connect } from 'react-redux';

const likeIconView = require('../../../images/icons/like.png');

const styles = StyleSheet.create({
  likeContainer: {
    height: 30,
    width: 30,
    paddingBottom: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    marginRight: 10,
    alignItems: 'center',

  },
  bgShadow: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 60,
    height: 30
  },
  iconWithImage: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'lightgrey',
    marginLeft: 10
  },
  countLikeLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: (Platform.OS === 'ios' ? 10 : 0)
  },
});

class VolumeButton extends Component {

  static propTypes = {
    look: React.PropTypes.object,
    isMuted: React.PropTypes.bool,
    togglePlaySoundAction: React.PropTypes.func
  }

  constructor(props) {
    super(props);
  }


  render() {
    const {look, isMuted} = this.props
    let volumeIcon = isMuted ? 'ios-volume-off' : 'ios-volume-down'
    let volumeColor = isMuted ? 'rgba(0,0,0,0.6)' : 'rgba(29,233,182,0.6)'
    return (
      <View style={[styles.likeContainer, { marginTop: look.height - 35, backgroundColor: volumeColor}]}>
            <TouchableOpacity transparent onPress={() => this.props.togglePlaySoundAction()}>
              <Icon name={volumeIcon} style={StyleSheet.flatten(styles.iconWithImage)}/>
            </TouchableOpacity>
      </View>
    )
  }
}

export default VolumeButton

