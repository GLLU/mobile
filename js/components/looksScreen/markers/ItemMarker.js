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
import { connect } from 'react-redux'
import { showInfo } from '../../../actions'
import { noop } from 'lodash'

const markerTopLeft = require('../../../../images/markers/marker-top-left.png');
const markerTopRight = require('../../../../images/markers/marker-top-right.png');
const markerBottomLeft = require('../../../../images/markers/marker-bottom-left.png');
const markerBottomRight = require('../../../../images/markers/marker-bottom-right.png');
const dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    alignItems: 'flex-start',
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

  onPress() {
    console.log(`clicked item at position ${this.props.pinPositionLeft},${this.props.pinPositionTop}`)
  }

  getOrientation(dimensions, pinPosition) {
    const isTop = dimensions.height / 2 < pinPosition.y;
    const isLeft = dimensions.height / 2 < pinPosition.x;
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
    return pinPosition
    switch (orientation) {
      case 'top-left':
        return {
          x: pinPosition.x - markerDimensions.width,
          y: pinPosition.y - markerDimensions.height,
        }
      case 'top-right':
        return {
          x: pinPosition.x + markerDimensions.width,
          y: pinPosition.y - markerDimensions.height,
        }
      case 'bottom-left':
        return {
          x: pinPosition.x - markerDimensions.width,
          y: pinPosition.y + markerDimensions.height,
        }
      case 'bottom-right':
      default:
        return {
          x: pinPosition.x + markerDimensions.width,
          y: pinPosition.y + markerDimensions.height,
        }
    }
  }

  getMarkerImageByOrientation(orientation) {
    switch (orientation) {
      case 'top-left':
        return markerBottomRight
      case 'top-right':
        return markerBottomLeft
      case 'bottom-left':
        return markerTopRight
      case 'bottom-right':
      default:
        return markerTopLeft
    }
  }

  render() {
    const containerDimensions = {width:this.props.containerWidth,height:this.props.containerHeight}

    const absoluteX = parseInt(this.props.pinPositionLeft * containerDimensions.width)
    const absoluteY = parseInt(this.props.pinPositionTop * containerDimensions.height)
    const pinPosition = {x: absoluteX, y: absoluteY};
    const orientation = this.getOrientation(containerDimensions, pinPosition);
    const markerDimensions = {width: 50, height: 50};
    const position = this.getPositionByOrientation(orientation, pinPosition, markerDimensions);
    const image = this.getMarkerImageByOrientation(orientation);

    console.log(`orientation: ${orientation}`);
    console.log(`pinPosition: ${JSON.stringify(pinPosition)}`);
    console.log(`position: ${JSON.stringify(position)}`);
    return (
      <TouchableWithoutFeedback onPress={(e)=>this.onPress(e,pinPosition)}>
        <View style={[styles.container, {top: position.y, left: position.x}]}>
            <Image
              source={image}
              style={[styles.marker,markerDimensions]}/>
          </View>
      </TouchableWithoutFeedback >
    );
  }
}

function bindActions(dispatch) {
  return {
    showInfo: text => dispatch(showInfo(text)),
  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindActions)(ItemMarker);