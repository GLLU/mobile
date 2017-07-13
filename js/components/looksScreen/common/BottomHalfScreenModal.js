import React, { Component } from 'react';
import {
  Animated, View, Text, StyleSheet, Modal, TouchableWithoutFeedback, Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { noop } from 'lodash'
import ExtraDimensions from 'react-native-extra-dimensions-android';

const {height} = Dimensions.get('window');
const statusBarHeight=ExtraDimensions.get('STATUS_BAR_HEIGHT');

export default class BottomHalfScreenModal extends Component {

  constructor(props) {
    super(props);
    this._onRequestClose = this._onRequestClose.bind(this);
  }

  static propTypes = {
    description: React.PropTypes.string,
    style: React.PropTypes.any,
    containerStyle: React.PropTypes.any,
    isOpen: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func
  };

  static defaultProps = {
    style: {},
    isOpen: false,
    onRequestClose: noop
  };

  _onRequestClose() {
    this.props.onRequestClose(false)
  }

  render() {
    return (
      <Modal
        visible={this.props.isOpen}
        animationType='slide'
        transparent={true}
        onRequestClose={this._onRequestClose}>
        <KeyboardAvoidingView behavior='padding' style={[{height: height-statusBarHeight}, this.props.containerStyle, {flexDirection: 'column-reverse'}]}>
          <View style={[{backgroundColor: 'white', flex: 1},this.props.style]}>
            {this.props.children}
          </View>
          <TouchableWithoutFeedback onPress={this._onRequestClose}>
            <View style={{flex: 1}}/>
          </TouchableWithoutFeedback>
          <View style={{height:statusBarHeight}}/>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}
