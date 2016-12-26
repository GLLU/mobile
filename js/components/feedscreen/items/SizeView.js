'use strict';

import React, { Component } from 'react';
import { Image } from 'react-native';
import { View } from 'native-base';

import styles from './styles';

const sizeM1 = require('../../../../images/sizes/m1.png');
const sizeM2 = require('../../../../images/sizes/m2.png');
const sizeM3 = require('../../../../images/sizes/m1.png');
const sizeM4 = require('../../../../images/sizes/m2.png');
const sizeXS = require('../../../../images/sizes/m1.png');

class SizeView extends Component {

  static propTypes = {
    size: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      sizes: [
        { name: 'M1', img: sizeM1 },
        { name: 'M2', img: sizeM2 },
        { name: 'M3', img: sizeM3 },
        { name: 'M4', img: sizeM4 },
        { name: 'XS', img: sizeXS }
      ]
    }
  }

  render() {
    let bgContainer = null;
    this.state.sizes.map((size) => {
      if (this.props.size === size.name) {
        bgContainer = size.img;
        return false;
      }
    });
    return (<View style={styles.sizeContainer}>
              <Image source={bgContainer} style={styles.sizeBgImage} />
            </View>)
  }
}

export default SizeView;
