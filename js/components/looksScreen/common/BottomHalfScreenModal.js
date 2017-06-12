import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { noop } from 'lodash'

const {height} = Dimensions.get('window')

export default class BottomHalfScreenModal extends Component {

  constructor(props) {
    super(props);
    this._onRequestClose = this._onRequestClose.bind(this);
  }

  static propTypes = {
    description: React.PropTypes.string,
    style: React.PropTypes.any,
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
        <View style={[{height: height}, this.props.style, {flexDirection: 'column-reverse'}]}>
          <View style={{backgroundColor: 'white', flex: 1}}>
            {this.props.children}
          </View>
          <TouchableWithoutFeedback onPress={this._onRequestClose}>
            <View style={{flex: 1}}/>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    );
  }
}
