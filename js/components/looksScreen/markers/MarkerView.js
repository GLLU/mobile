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

const markerRight = require('../../../../images/markers/marker-right.png')
const markerLeft = require('../../../../images/markers/marker-left.png')

class MarkerView extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  static propTypes = {
    position: React.PropTypes.object,
    dimensions: React.PropTypes.object,
    containerDimensions: React.PropTypes.object,
    isLeft: React.PropTypes.bool,
    onPress: React.PropTypes.func,
  }

  static defaultProps = {
    dimensions: {
      height: 20
    },
    onPress: noop
  }

  onPress(e) {
    this.props.onPress(e);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={(e) => this.onPress(e)}>
        <View>
          <Image
            source={this.props.isLeft?markerRight:markerLeft}
            style={[{resizeMode: 'contain'}, this.props.dimensions]}/>
        </View>
      </TouchableWithoutFeedback >
    );
  }
}

export default MarkerView;