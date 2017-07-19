// flow

import React, { Component } from 'react';
import * as _ from 'lodash';
import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

const deviceWidth = Dimensions.get('window').width;


class WalletScreen extends Component {

  props: {
    prop1: string
  };

  static defaultProps = {
    onPress: _.noop,
    showLoader: false,
    loaderElement: null,
  }

  render() {
    return (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});


export default WalletScreen;
