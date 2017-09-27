// @flow

import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Fonts.styles';
const deviceWidth = Dimensions.get('window').width;
import { generateAdjustedSize } from '../../../utils/AdjustabaleContent';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 3,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  titleOnImage: {
    position: 'absolute',
    backgroundColor: Colors.secondaryColor,
  },
  titleOnColor: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: generateAdjustedSize(18),
    flex: 2,
    lineHeight: 25,
    textAlign: 'center',
    fontFamily: Fonts.boldContentFont,
    textShadowColor: Colors.white,
    textShadowRadius: 5,
    textShadowOffset: { width: 1, height: 1 },
  },
});

type Props = {
  rowArray: array,
  getFeedWithSuggestion: () => void
};

class QuerySuggestion extends Component {

  props: Props;

  renderSuggestion(suggestion) {
    if (suggestion.coverUrl) {
      return (
        <Image source={{ uri: suggestion.coverUrl }} resizeMode={'stretch'} style={{ flex: 1 }}>
          <Text style={styles.titleOnImage}>{suggestion.title}</Text>
        </Image>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: suggestion.color, justifyContent: 'center', flexDirection: 'row' }}>
          <View style={{ flex: 1 }} />
          <Text ellipsizeMode={'head'} style={[styles.titleOnColor, { backgroundColor: suggestion.color, overflow: 'hidden' }]}>{suggestion.title}</Text>
          <View style={{ flex: 1 }} />
        </View>
      );
    }
  }

  renderRows() {
    const { rowArray, getFeedWithSuggestion } = this.props;
    return _.map(rowArray, rowItem => (
      <TouchableOpacity key={rowItem.id} onPress={() => getFeedWithSuggestion(rowItem.query)} style={{ flex: 1, margin: 5 }}>
        {this.renderSuggestion(rowItem)}
      </TouchableOpacity>
    ));
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', width: deviceWidth, minHeight: 130 }}>
        {this.renderRows()}
      </View>
    );
  }
}

export default QuerySuggestion;

