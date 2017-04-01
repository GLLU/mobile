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
import _, { noop } from 'lodash'

import markerDirections from './markerDirections'
import MarkerView from './MarkerView'
import ItemPopup from './ItemPopup'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'flex-start',
    flexDirection: 'row',
  }
});

class ItemMarker extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this._renderPopup = this._renderPopup.bind(this);
    this.state = {
      isViewActive: false
    }

  }

  static propTypes = {
    containerDimensions: React.PropTypes.object,
    pinPosition: React.PropTypes.object.isRequired,
    brand: React.PropTypes.object,
    item: React.PropTypes.object,
    onPress: React.PropTypes.func
  };

  static defaultProps = {
    onPress: noop,
  };

  onPress() {
    const {isViewActive} = this.state;
    this.setState({
      popupOffset: 0,
      isViewActive: !isViewActive
    })
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

  isPositionCloseToEdge(containerDimensions, position) {
    let closeToEdgeIndicator = {top: false, left: false, bottom: false, right: false};
    closeToEdgeIndicator.left = containerDimensions !== undefined && position.x < 50;
    closeToEdgeIndicator.top = containerDimensions !== undefined && position.y < 50;
    closeToEdgeIndicator.right = containerDimensions !== undefined && containerDimensions.width - position.x < 100;
    closeToEdgeIndicator.bottom = containerDimensions !== undefined && containerDimensions.height - position.y < 100;
    return closeToEdgeIndicator
  }

  limitPosition(position, closeToEdgeIndicator, containerDimensions) {
    if (closeToEdgeIndicator.left) {
      position.x = 20;
    }
    if (closeToEdgeIndicator.top) {
      position.y = 20;
    }
    if (closeToEdgeIndicator.right) {
      position.x = containerDimensions.width - 120;
    }
    if (closeToEdgeIndicator.bottom) {
      position.y = containerDimensions.height - 60;
    }
    return position;
  }


  _renderPopup(item) {
    return <ItemPopup {...item}/>
  }

  render() {
    const pinPosition = {
      x: parseInt(this.props.pinPosition.x * this.props.containerDimensions.width),
      y: parseInt(this.props.pinPosition.y * this.props.containerDimensions.height)
    };
    const orientation = this.getOrientation(this.props.containerDimensions, pinPosition);

    const markerDimensions = {width: 30, height: 30};

    let position = this.getPositionByOrientation(orientation, pinPosition, markerDimensions);

    const closeToEdgeIndicator = this.isPositionCloseToEdge(this.props.containerDimensions, position);

    position = this.limitPosition(position, closeToEdgeIndicator, this.props.containerDimensions);

    const markerOrientation = (_.chain(Object.keys(closeToEdgeIndicator)).map(key => closeToEdgeIndicator[key]).sum() > 1) ? markerDirections.reverse(orientation) : orientation;

    return (
      <View style={[styles.container, {
        top: position.y,
        left: position.x,
      }]}>
        <MarkerView {...this.props}
                    orientation={markerOrientation}
                    position={position}
                    dimensions={markerDimensions}
                    onPress={this.onPress}/>
        <View style={{padding: 10}}/>
        { this.state.isViewActive ? this._renderPopup(this.props.item) : null}
      </View>
    )
  }
}

function bindActions(dispatch) {
  return {
    showInfo: text => dispatch(showInfo(text)),
  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindActions)(ItemMarker);