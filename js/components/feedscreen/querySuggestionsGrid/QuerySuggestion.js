// @flow

import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Fonts.styles';
import { generateAdjustedSize } from '../../../utils/AdjustabaleContent';

const styles = StyleSheet.create({
  titleOnImage: {
    position: 'absolute',
    fontSize: generateAdjustedSize(16),
    fontFamily: Fonts.boldContentFont,
    margin: 5,
    color: Colors.white,
    backgroundColor: Colors.transparent,
  },
  titleOnColor: {
    fontSize: generateAdjustedSize(18),
    flex: 2,
    lineHeight: 25,
    textAlign: 'center',
    fontFamily: Fonts.boldContentFont,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.transparent,
    color: Colors.white,
  },
  imgStyle: {
    flex: 1,
  },
  titleOnImageContainer: {
    flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  titleOnColorContainer: {
    flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', flexDirection: 'row', justifyContent: 'center',
  },
});

type Props = {
  suggestion: object,
};

class QuerySuggestion extends Component {

  props: Props;
  render() {
    const { suggestion } = this.props;
    if (suggestion.imageUri) {
      return (
        <Image source={{ uri: suggestion.imageUri }} resizeMode={'stretch'} style={styles.imgStyle}>
          <View style={styles.titleOnImageContainer}>
            <Text style={styles.titleOnImage}>{suggestion.title}</Text>
          </View>
        </Image>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: suggestion.color }}>
          <View style={styles.titleOnColorContainer}>
            <Text style={[styles.titleOnColor]}>{suggestion.title}</Text>
          </View>
        </View>
      );
    }
  }
}

export default QuerySuggestion;

