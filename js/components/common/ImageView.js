'use strict';

import React, {Component} from 'react';
import {StyleSheet, Image, Platform, TouchableOpacity, View, Dimensions} from 'react-native';

const  {width, height } = Dimensions.get('window');
const closeIcon = require('../../../images/icons/cancelEdit.png')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: width * 0.8,
    height: height * 0.8,
    alignSelf: 'center',
  },
  closeIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 32,
    height: 32,
  },
});

class ImageView extends Component {

  static propTypes = {
    imagePath: React.PropTypes.string,
  }

  render() {
    const { imagePath, onClose } = this.props
    return (
      <TouchableOpacity style={styles.container} onPress={onClose}>
        <Image style={styles.closeIcon} source={closeIcon} />
        <Image source={{uri:imagePath}} style={styles.image} resizeMode={'contain'}/>
      </TouchableOpacity>
    );
  }
}

export default ImageView;

