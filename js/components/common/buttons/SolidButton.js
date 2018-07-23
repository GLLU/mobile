// @flow

import React, { Component } from 'react';
import * as _ from 'lodash';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

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
});

type Props={
  label: string,
  isDisabled: boolean,
  onPress: void,
  style: any,
  showLoader: boolean,
  loaderColor: string
};

class SolidButton extends Component {

  static defaultProps = {
    onPress: _.noop,
    isDisabled: false,
    showLoader: false,
    loaderElement: null,
  }

  props: Props;

  render() {
    const { loaderColor, onPress, label, showLoader, style, isDisabled } = this.props;
    return (
      <TouchableHighlight style={[styles.center, styles.basicStyle, style]} isDisabled={isDisabled} onPress={onPress}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', height: '100%', backgroundColor: Colors.secondaryColor }}>
          <Text style={styles.text}>{label}</Text>
          {showLoader ? <Spinner animating color={loaderColor} size={'small'} style={{ left: 10 }} /> : null}
        </View>
      </TouchableHighlight>
    );
  }
}

export default SolidButton;
