import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { noop } from 'lodash'

const markerTopLeft = require('../../../../images/markers/marker-top-left.png')
const markerTopRight = require('../../../../images/markers/marker-top-right.png')
const markerBottomLeft = require('../../../../images/markers/marker-bottom-left.png')
const markerBottomRight = require('../../../../images/markers/marker-bottom-right.png')

class MarkerView extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
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
      width:30
    },
    onPress: noop
  };

  onPress(e) {
    this.props.onPress(e);
  }

  getMarkerByOrientation(orientation) {
    if (orientation.top) {
      if (orientation.left) {
        return markerBottomRight;
      }
      else {
        return markerBottomLeft;
      }
    }
    else {
      if (orientation.left) {
        return markerTopRight;
      }
      else {
        return markerTopLeft;
      }
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={(e) => this.onPress(e)}>
        <View style={{paddingVertical:10}}>
          <Image
            source={this.getMarkerByOrientation(this.props.orientation)}
            style={[{resizeMode: 'contain'}, this.props.dimensions]}/>
        </View>
      </TouchableWithoutFeedback >
    );
  }
}

export default MarkerView;