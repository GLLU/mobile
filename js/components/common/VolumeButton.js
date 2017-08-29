'use strict';

import React, {Component} from 'react';
import {StyleSheet, Image, Platform, TouchableOpacity, View} from 'react-native';

const mutedIcon = require('../../../images/icons/mutedIcon.png');
const unmutedIcon = require('../../../images/icons/unmutedIcon.png');

const styles = StyleSheet.create({
  likeContainer: {
    height: 30,
    width: 30,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    borderRadius: 15,
  },
  iconWithImage: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'lightgrey',
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
    togglePlaySoundAction: React.PropTypes.func,
    size: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { isMuted, size = 30 } = this.props
    const volumeIcon = isMuted ? mutedIcon : unmutedIcon;
    const volumeColor = isMuted ? 'rgba(0,0,0,0.6)' : 'rgba(29,233,182,0.6)'
    return (

      <View style={[styles.likeContainer, {
        top: 0,
        backgroundColor: volumeColor,
        height: size,
        width: size,
        borderRadius: size / 2,
      }]}>
        <TouchableOpacity transparent onPress={() => this.props.togglePlaySoundAction()}>
          <Image style={styles.iconWithImage} source={volumeIcon} resizeMode={'contain'}/>
        </TouchableOpacity>
      </View>
    )
  }
}

export default VolumeButton

