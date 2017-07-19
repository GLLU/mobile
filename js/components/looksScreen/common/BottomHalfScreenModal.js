// @flow

import React, { Component } from 'react';
import {
  Animated, View, Text, StyleSheet, Modal, TouchableWithoutFeedback, Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { noop } from 'lodash'
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Colors from "../../../styles/Colors.styles";

const {height} = Dimensions.get('window');
const softMenuBarHeight = ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT');
const statusBarHeight = ExtraDimensions.get('STATUS_BAR_HEIGHT');

const styles = StyleSheet.create({
  container: {
    height: height - (softMenuBarHeight - statusBarHeight),
    flexDirection: 'column-reverse'
  },
  childrenContainer: {
    backgroundColor: Colors.white,
    flex: 1
  },
});

type Props = {
  descritpion: string,
  style: any,
  containerStyle: any,
  isOpen: bool,
  onRequestClose: void
}

export default class BottomHalfScreenModal extends Component {

  props: Props;

  constructor(props: Props) {
    super(props);
    this._onRequestClose = this._onRequestClose.bind(this);
  }

  static defaultProps = {
    isOpen: false,
    onRequestClose: noop
  };

  _onRequestClose() {
    this.props.onRequestClose(false)
  }

  render() {
    const {isOpen, children, style, containerStyle} = this.props;
    return (
      <Modal
        visible={isOpen}
        animationType='slide'
        transparent={true}
        onRequestClose={this._onRequestClose}>
        <KeyboardAvoidingView
          behavior='padding'
          style={[styles.container, containerStyle]}>
          <View style={[styles.childrenContainer, style]}>
            {children}
          </View>
          <TouchableWithoutFeedback onPress={this._onRequestClose}>
            <View style={{flex: 1}}/>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={{height: softMenuBarHeight}}/>
      </Modal>
    );
  }
}
