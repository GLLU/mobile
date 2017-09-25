import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import _, {noop} from 'lodash';
import MarkerView, {MARKER_WIDTH, MARKER_HEIGHT} from './MarkerView';
import ItemPopup, {POPUP_HEIGHT, POPUP_WIDTH} from './ItemPopup';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  align: {
    alignItems: 'flex-start',
  },
  alignReverse: {
    alignItems: 'flex-end',
  },
  flex: {
    flexDirection: 'column',
  },
  flexReverse: {
    flexDirection: 'column-reverse',
  },

});

class ItemMarker extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this._renderMarker = this._renderMarker.bind(this);
    this._renderPopup = this._renderPopup.bind(this);
    this.state = {
      isViewActive: false,
    };
  }

  static propTypes = {
    containerDimensions: React.PropTypes.object,
    pinPosition: React.PropTypes.object.isRequired,
    brand: React.PropTypes.object,
    item: React.PropTypes.object,
    onPress: React.PropTypes.func,
  };

  static defaultProps = {
    onPress: noop,
  };

  onPress() {
    const { isViewActive } = this.state;
    if (!this.props.item.is_verified) {
      this.props.onPress(!isViewActive);
    }
    this.setState({
      popupOffset: 0,
      isViewActive: !isViewActive,
    });
  }

  getContainerStyle(position, orientation, popupDimensions, isPopupVisible) {
    const containerStyles = [styles.container];
    const positionStyle = {
      top: position.y,
      left: position.x,
    };
    if (!orientation.top) {
      if (isPopupVisible) {
        positionStyle.top -= popupDimensions.height;
      }
      containerStyles.push(positionStyle);
      containerStyles.push(styles.flexReverse);
    } else {
      containerStyles.push(positionStyle);
      containerStyles.push(styles.flex);
    }
    if (orientation.left) {
      containerStyles.push(styles.align);
    } else {
      containerStyles.push(styles.alignReverse);
    }
    return containerStyles;
  }

  getOrientation(dimensions, pinPosition) {
    const top = pinPosition.y < dimensions.height / 2;
    const left = pinPosition.x < dimensions.width / 2;
    return {
      top,
      left,
      bottom: !top,
      right: !left,
    };
  }

  reverseOrientation(orientation) {
    return {
      top: !orientation.top,
      left: !orientation.left,
      bottom: !orientation.bottom,
      right: !orientation.right,
    };
  }

  getPositionByOrientation(orientation, pinPosition, markerDimensions) {
    const actualPosition = {
      x: pinPosition.x,
      y: pinPosition.y,
    };
    if (orientation.top) {
      actualPosition.y = pinPosition.y - markerDimensions.height;
    }
    if (orientation.left) {
      actualPosition.x = pinPosition.x - markerDimensions.width;
    }
    return actualPosition;
  }

  adjustPositionByPopup(position, orientation, markerDimensions, popupDimensions) {
    const adjustedPosition = {
      x: position.x,
      y: position.y,
    };
    if (orientation.right) {
      adjustedPosition.x = position.x - (popupDimensions.width - markerDimensions.width);
    }
    return adjustedPosition;
  }

  isPositionCloseToEdge(containerDimensions, position) {
    const closeToEdgeIndicator = { top: false, left: false, bottom: false, right: false };
    closeToEdgeIndicator.left = position.x < 20;
    closeToEdgeIndicator.top = position.y < 20;
    closeToEdgeIndicator.right = containerDimensions !== undefined && containerDimensions.width - position.x < 80;
    closeToEdgeIndicator.bottom = containerDimensions !== undefined && containerDimensions.height - position.y < 80;
    return closeToEdgeIndicator;
  }

  _openWebView(url) {
    this.props._openWebView(url);
  }

  limitPosition(position, closeToEdgeIndicator, containerDimensions) {
    if (closeToEdgeIndicator.left) {
      position.x = 20;
    }
    if (closeToEdgeIndicator.top) {
      position.y = 20;
    }
    if (closeToEdgeIndicator.right) {
      position.x = containerDimensions.width - 80;
    }
    if (closeToEdgeIndicator.bottom) {
      position.y = containerDimensions.height - 80;
    }
    return position;
  }

  _renderPopup(item, popupDimensions) {
    return <ItemPopup {...item} openWebView={this.props.openWebView} dimensions={popupDimensions}/>;
  }

  _renderMarker(position, dimensions, orientation) {
    return (
      <MarkerView
        {...this.props}
        position={position}
        orientation={orientation}
        dimensions={dimensions}
        onPress={this.onPress}/>
    );
  }

  render() {
    const pinPosition = {
      x: parseInt(this.props.pinPosition.x * this.props.containerDimensions.width),
      y: parseInt(this.props.pinPosition.y * this.props.containerDimensions.height),
    };
    const orientation = this.getOrientation(this.props.containerDimensions, pinPosition);

    const markerDimensions = { width: MARKER_WIDTH, height: MARKER_HEIGHT };

    const popupDimensions = { width: POPUP_WIDTH, height: POPUP_HEIGHT };

    let position = this.getPositionByOrientation(orientation, pinPosition, markerDimensions);

    const closeToEdgeIndicator = this.isPositionCloseToEdge(this.props.containerDimensions, position);

    position = this.limitPosition(position, closeToEdgeIndicator, this.props.containerDimensions);

    if (this.state.isViewActive) {
      position = this.adjustPositionByPopup(position, orientation, markerDimensions, popupDimensions);
    }

    const markerOrientation = (_.chain(Object.keys(closeToEdgeIndicator)).map(key => closeToEdgeIndicator[key]).sum() > 1) ? this.reverseOrientation(orientation) : orientation;

    // Actual Render
    return (
      <View style={this.getContainerStyle(position, orientation, popupDimensions, this.state.isViewActive)}>
        {this._renderMarker(position, markerDimensions, markerOrientation)}
        { this.state.isViewActive ? this._renderPopup(this.props.item, popupDimensions) : null}
      </View>
    );
  }
}

export default ItemMarker;
