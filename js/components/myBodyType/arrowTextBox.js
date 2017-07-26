import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { generateAdjustedSize } from '../../utils/AdjustabaleContent';
import Fonts from '../../styles/Fonts.styles';
import Colors from '../../styles/Colors.styles';

export default class ArrowTextBox extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    description: React.PropTypes.string,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bodyType}>{this.props.title}</Text>
        <Text style={styles.bodyTypeDesc}>{this.props.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyType: {
    fontSize: generateAdjustedSize(18),
    color: Colors.black,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: Fonts.regularFont,
  },
  bodyTypeDesc: {
    textAlign: 'center',
    fontSize: generateAdjustedSize(16),
    fontFamily: Fonts.contentFont,
  },
  container: {
    borderWidth: 2,
    borderColor: '#EBEBEB',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 10,
    height: 120,
  },
});
