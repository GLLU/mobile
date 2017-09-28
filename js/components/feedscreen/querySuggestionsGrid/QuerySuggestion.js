// @flow

import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Fonts.styles';
const deviceWidth = Dimensions.get('window').width;
import { generateAdjustedSize } from '../../../utils/AdjustabaleContent';

const styles = StyleSheet.create({
  rowsContainer: {
    flex: 1,
    flexDirection: 'row',
    width: deviceWidth,
    height: 130
  },
  btnContainer: {
    flex: 1,
    margin: 5
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
    color: Colors.white
  },
  imgStyle: {
    flex: 1
  },
  titleOnImageContainer: {
    flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  titleOnColorContainer: {
    flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', flexDirection: 'row', justifyContent: 'center'
  }
});

type Props = {
  rowArray: array,
  getFeedWithSuggestion: () => void
};

class QuerySuggestion extends Component {

  props: Props;

  renderSuggestion(suggestion: object) {
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
            <Text style={[styles.titleOnColor ]}>{suggestion.title}</Text>
          </View>
        </View>
      );
    }
  }

  renderRows() {
    const { rowArray, getFeedWithSuggestion } = this.props;
    return _.map(rowArray, rowItem => (
      <TouchableOpacity key={rowItem.id} onPress={() => getFeedWithSuggestion(rowItem.query)} style={styles.btnContainer}>
        {this.renderSuggestion(rowItem)}
      </TouchableOpacity>
    ));
  }
  render() {
    return (
      <View style={styles.rowsContainer}>
        {this.renderRows()}
      </View>
    );
  }
}

export default QuerySuggestion;

