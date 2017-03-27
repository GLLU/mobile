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

const markerTopLeft = require('../../../../images/markers/marker-top-left.png');
const markerTopRight = require('../../../../images/markers/marker-top-right.png');
const markerBottomLeft = require('../../../../images/markers/marker-bottom-left.png');
const markerBottomRight = require('../../../../images/markers/marker-bottom-right.png');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    resizeMode: 'cover'
  }
});

class ItemMarker extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  static propTypes = {
    pinPositionTop: React.PropTypes.number.isRequired,
    pinPositionLeft: React.PropTypes.number.isRequired,
    containerWidth: React.PropTypes.number,
    containerHeight: React.PropTypes.number,
    onPress: React.PropTypes.func
  }

  static defaultProps = {
    onPress: noop
  }

  onPress(e, position) {
    this.props.onPress(e,position);
  }

  getOrientation(dimensions, pinPosition) {
    const isTop = pinPosition.y < dimensions.height / 2;
    const isLeft = pinPosition.x < dimensions.width / 2;
    if (isTop && isLeft) {
      return 'top-left'
    }
    if (isTop && !isLeft) {
      return 'top-right'
    }
    if (!isTop && isLeft) {
      return 'bottom-left'
    }
    return 'bottom-right'
  }

  getPositionByOrientation(orientation, pinPosition, markerDimensions) {
    switch (orientation) {
      case 'top-left':
        return {
          x: pinPosition.x - markerDimensions.width,
          y: pinPosition.y - markerDimensions.height,
        }
      case 'top-right':
        return {
          x: pinPosition.x,
          y: pinPosition.y - markerDimensions.height,
        }
      case 'bottom-left':
        return {
          x: pinPosition.x - markerDimensions.width,
          y: pinPosition.y,
        }
      case 'bottom-right':
      default:
        return pinPosition
    }
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
    const containerDimensions = {width: this.props.containerWidth, height: this.props.containerHeight}
    const markerDimensions = {width: 40, height: 40};

    const pinPosition = {
      x: parseInt(this.props.pinPositionLeft * containerDimensions.width),
      y: parseInt(this.props.pinPositionTop * containerDimensions.height)
    };

    const orientation = this.getOrientation(containerDimensions, pinPosition);
    const position = this.getPositionByOrientation(orientation, pinPosition, markerDimensions);

    return (
      <TouchableWithoutFeedback onPress={(e) => this.onPress(e, position)}>
        <View style={[styles.container, {top: position.y, left: position.x}]}>
          <Image
            source={this.getMarkerImageByOrientation(orientation)}
            style={[styles.marker, markerDimensions]}/>
        </View>
      </TouchableWithoutFeedback >
    );
  }
}

export default ItemMarker;