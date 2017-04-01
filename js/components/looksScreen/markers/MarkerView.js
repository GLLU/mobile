import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

import { noop } from 'lodash'

import markerDirections from './markerDirections'

const markerTopLeft = require('../../../../images/markers/marker-top-left.png');
const markerTopRight = require('../../../../images/markers/marker-top-right.png');
const markerBottomLeft = require('../../../../images/markers/marker-bottom-left.png');
const markerBottomRight = require('../../../../images/markers/marker-bottom-right.png');

class MarkerView extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  static propTypes = {
    position: React.PropTypes.object,
    dimensions: React.PropTypes.object,
    containerDimensions: React.PropTypes.object,
    orientation: React.PropTypes.oneOf(markerDirections),
    onPress: React.PropTypes.func,
  }

  static defaultProps = {
    dimensions: {
      width: 40,
      height: 40
    },
    onPress: noop
  }

  onPress(e) {
    this.props.onPress(e);
  }

  getMarkerImageByOrientation(orientation) {
    switch (orientation) {
      case 'top-left':
        return markerBottomRight;
      case 'top-right':
        return markerBottomLeft;
      case 'bottom-left':
        return markerTopRight;
      case 'bottom-right':
      default:
        return markerTopLeft
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={(e) => this.onPress(e)}>
        <View>
          <Image
            source={this.getMarkerImageByOrientation(this.props.orientation)}
            style={[{resizeMode: 'cover'}, this.props.dimensions]}/>
        </View>
      </TouchableWithoutFeedback >
    );
  }
}

export default MarkerView;