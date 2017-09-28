// @flow

import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Fonts.styles';
import { generateAdjustedSize } from '../../../utils/AdjustabaleContent';

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    margin: 5,
  },
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
  getFeedWithSuggestion: () => void,
};

class QuerySuggestion extends Component {

  props: Props;
  render() {
    const { suggestion, getFeedWithSuggestion } = this.props;

    if (suggestion.imageUri) {
      return (
        <TouchableOpacity onPress={() => getFeedWithSuggestion(suggestion.query)} style={styles.btnContainer}>
          <Image source={{ uri: suggestion.imageUri }} resizeMode={'cover'} style={styles.imgStyle}>
            <View style={styles.titleOnImageContainer}>
              <Text style={styles.titleOnImage}>{suggestion.title}</Text>
            </View>
          </Image>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => getFeedWithSuggestion(suggestion.query)} style={styles.btnContainer}>
          <View style={{ flex: 1, backgroundColor: suggestion.color }}>
            <View style={styles.titleOnColorContainer}>
              <Text style={[styles.titleOnColor]}>{suggestion.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

export default QuerySuggestion;

