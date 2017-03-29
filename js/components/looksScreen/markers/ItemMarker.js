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
import MarkerView from './MarkerView'
import ItemPopup from './ItemPopup'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'flex-start',
  },
  flex: {
    flexDirection: 'column',
  },
  flexReverse: {
    flexDirection: 'column-reverse',
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

  getContainerStyle(position, orientation, popupDimensions, ispopupVisible) {
    let containerStyles = [styles.container];
    let positionStyle = {
      top: position.y,
      left: position.x
    };
    if (!orientation.top) {
      if (ispopupVisible) {
        positionStyle.top -= popupDimensions.height;
      }
      containerStyles.push(positionStyle);
      containerStyles.push(styles.flexReverse)
    }
    else {
      containerStyles.push(positionStyle);
      containerStyles.push(styles.flex)
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
      right: !left
    };
  }

  getPositionByOrientation(orientation, pinPosition, markerDimensions) {
    let actualPosition = {
      y: pinPosition.y - markerDimensions.height,
      x: pinPosition.x
    };
    if (orientation.left) {
      actualPosition.x = pinPosition.x - markerDimensions.width
    }
    return actualPosition;
  }

  isPositionCloseToEdge(containerDimensions, position) {
    let closeToEdgeIndicator = {top: false, left: false, bottom: false, right: false};
    closeToEdgeIndicator.left = position.x < 20;
    closeToEdgeIndicator.top = position.y < 20;
    closeToEdgeIndicator.right = containerDimensions !== undefined && containerDimensions.width - position.x < 80;
    closeToEdgeIndicator.bottom = containerDimensions !== undefined && containerDimensions.height - position.y < 80;
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
      position.x = containerDimensions.width - 80;
    }
    if (closeToEdgeIndicator.bottom) {
      position.y = containerDimensions.height - 80;
    }
    return position;
  }


  _renderPopup(item, popupDimensions) {
    return <ItemPopup {...item} dimensions={popupDimensions}/>
  }

  render() {
    const pinPosition = {
      x: parseInt(this.props.pinPosition.x * this.props.containerDimensions.width),
      y: parseInt(this.props.pinPosition.y * this.props.containerDimensions.height)
    };
    const orientation = this.getOrientation(this.props.containerDimensions, pinPosition);

    const markerDimensions = {width: 40, height: 25};

    const popupDimensions = {width: 70, height: 60};

    let position = this.getPositionByOrientation(orientation, pinPosition, markerDimensions);

    const closeToEdgeIndicator = this.isPositionCloseToEdge(this.props.containerDimensions, position);

    position = this.limitPosition(position, closeToEdgeIndicator, this.props.containerDimensions);

    const isLeftMarker = (_.chain(Object.keys(closeToEdgeIndicator)).map(key => closeToEdgeIndicator[key]).sum() > 1) ? !orientation.left : orientation.left;

    return (
      <View style={this.getContainerStyle(position, orientation, popupDimensions, this.state.isViewActive)}>
        <MarkerView {...this.props}
                    isLeft={isLeftMarker}
                    position={position}
                    dimensions={markerDimensions}
                    onPress={this.onPress}/>
        <View style={{padding: 10}}/>
        { this.state.isViewActive ? this._renderPopup(this.props.item, popupDimensions) : null}
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