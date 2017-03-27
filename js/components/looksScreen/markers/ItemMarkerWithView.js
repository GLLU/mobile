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

import ItemMarker from './ItemMarker'
import ItemView from './ItemView'

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

class ItemMarkerWithView extends Component {
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
    containerHeight: React.PropTypes.number,
    onPress: React.PropTypes.func
  };

  static defaultProps = {
    onPress: noop
  };

  onPress(e, pinPosition) {
    this.setState({
      isViewActive: true,
      position: pinPosition
    }, ()=>setTimeout(this.hideView, 5000))
  }

  hideView() {
    this.setState({isViewActive: false})
  }

  render() {
    if (!this.state.isViewActive) {
      return <ItemMarker {...this.props} onPress={this.onPress}/>
    }
    return <ItemView {...this.props}/>

  }
}

function bindActions(dispatch) {
  return {
    showInfo: text => dispatch(showInfo(text)),
  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindActions)(ItemMarkerWithView);