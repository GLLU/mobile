'use strict';

import React, { Component } from 'react';
import { View, Text,Image, Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

import styles from './styles';

const tagBackground = require('../../../../images/tag-background.png');

class Tag extends Component {

  static propTypes = {
    tag: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      portrait: true
    }
  }

  render() {
    const sampleWidth = 375; // iPhone 6
    const sampleHeight = 667;
    const marginLeft = (this.props.tag.x * deviceWidth) / sampleWidth - 10;
    const marginTop = (this.props.tag.y  * deviceHeight) / sampleHeight;
    return(<View style={[styles.tagContainer, { top: marginTop, left: marginLeft }]} >
          <Image source={tagBackground} style={styles.tagBgImage}>
            <Text style={styles.priceTagLabel}>{`₤${this.props.tag.price}`}</Text>
          </Image>
        </View>)
  }

}

export default Tag;
