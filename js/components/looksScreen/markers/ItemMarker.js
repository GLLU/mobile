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

import MarkerView from './MarkerView'
import ItemPopup from './ItemPopup'

class ItemMarker extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.hideView = this.hideView.bind(this);
    this.state = {
      isViewActive: false,
      position: {}
    }

  }

  static propTypes = {
    pinPositionTop: React.PropTypes.number.isRequired,
    pinPositionLeft: React.PropTypes.number.isRequired,
    containerWidth: React.PropTypes.number,
    brand: React.PropTypes.object,
    containerHeight: React.PropTypes.number,
    item: React.PropTypes.object,
    onPress: React.PropTypes.func
  };

  static defaultProps = {
    onPress: noop
  };

  onPress(e, position) {
    this.setState({
      isViewActive: true,
      position
    }, () => setTimeout(this.hideView, 5000))
  }

  hideView() {
    this.setState({isViewActive: false})
  }

  render() {
    if (!this.state.isViewActive) {
      return <MarkerView {...this.props} onPress={this.onPress}/>
    }
    return <ItemPopup
      {...this.props.item}
      containerDimensions={{width: this.props.containerWidth, height: this.props.containerHeight}}
      position={this.state.position}/>

  }
}

function bindActions(dispatch) {
  return {
    showInfo: text => dispatch(showInfo(text)),
  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindActions)(ItemMarker);