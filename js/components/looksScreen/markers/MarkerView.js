import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from 'react-native';
import { noop } from 'lodash';

const marker = require('../../../../images/markers/tag_green.png');

export const MARKER_WIDTH = 55;
export const MARKER_HEIGHT = 55;

class MarkerView extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.getMarkerAngleByOrientation = this.getMarkerAngleByOrientation.bind(this);
    this.state = { isSelected: false };
  }

  static propTypes = {
    position: React.PropTypes.object,
    dimensions: React.PropTypes.object,
    containerDimensions: React.PropTypes.object,
    orientation: React.PropTypes.object,
    onPress: React.PropTypes.func,
  };

  static defaultProps = {
    dimensions: {
      height: 30,
      width: 30,
    },
    onPress: noop,
  };

  onPress(e) {
    this.setState({ isSelected: !this.state.isSelected });
    this.props.onPress(e);
  }

  getMarkerAngleByOrientation(orientation) {
    if (orientation.top) {
      if (orientation.left) {
        return '135deg';
      } else {
        return '225deg';
      }
    } else if (orientation.left) {
      return '45deg';
    } else {
      return '315deg';
    }
  }

  render() {
    const { item, activeItem, isPopupActive, orientation } = this.props;
    const { isSelected } = this.state;
    const isItemShown = (activeItem && (item.id === activeItem.id));

    return (
      <TouchableWithoutFeedback onPress={e => this.onPress(e)}>
        <View style={[styles.container, { transform: [{ rotate: this.getMarkerAngleByOrientation(orientation) }] }]}>
          <Image
            source={marker}
            style={styles.marker} resizeMode={'contain'} />
          {(isItemShown && isPopupActive) ?
            <Image
              source={require('../../../../images/indicators/Ellipse.png')} resizeMode={'cover'}
              style={styles.selectedIndicator} />
            : null}
        </View>
      </TouchableWithoutFeedback >
    );
  }
}

const styles = StyleSheet.create({
  marker: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  selectedIndicator: {
    height: MARKER_HEIGHT,
    width: MARKER_WIDTH,
    position: 'absolute',
  },
  container: {
    width: MARKER_HEIGHT,
    height: MARKER_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MarkerView;
