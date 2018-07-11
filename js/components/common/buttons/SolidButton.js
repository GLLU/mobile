// @flow

import React, { Component } from 'react';
import * as _ from 'lodash';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Spinner from '../../loaders/Spinner';
import { generateAdjustedSize } from '../../../utils/AdjustabaleContent';
import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Fonts.styles';

const styles = StyleSheet.create({
  center: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    fontSize: generateAdjustedSize(14),
    fontFamily: Fonts.regularFont,
  },
  basicStyle: {
    width: generateAdjustedSize(265),
    height: generateAdjustedSize(45),
    alignSelf: 'center',
    backgroundColor: Colors.secondaryColor,
  },
  disabledButton: {
    opacity: 0.4,
  },
  enabledButton: {
    opacity: 1,
  },
});

type Props={
  label: string,
  disabled: boolean,
  onPress: void,
  style: any,
  showLoader: boolean,
  loaderColor: string
};

class SolidButton extends Component {

  static defaultProps = {
    onPress: _.noop,
    disabled: false,
    showLoader: false,
    loaderElement: null,
  }

  props: Props;

  render() {
    const { loaderColor, onPress, label, showLoader, style, disabled } = this.props;
    return (
      <TouchableOpacity style={[styles.center, styles.basicStyle, disabled ? styles.disabledButton : styles.enabledButton, style]} disabled={disabled} onPress={onPress}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.text}>{label}</Text>
          {showLoader ? <Spinner animating color={loaderColor} size={'small'} style={{ left: 10 }} /> : null}
        </View>
      </TouchableOpacity>
    );
  }
}

export default SolidButton;
