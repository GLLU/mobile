// @flow

import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import QuerySuggestion from './QuerySuggestion';
import _ from 'lodash';
import i18n from 'react-native-i18n';
import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Fonts.styles';
const deviceWidth = Dimensions.get('window').width;
import { generateAdjustedSize } from '../../../utils/AdjustabaleContent';

const emptyResultsIcon = require('../../../../images/emptyStates/user-woman.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 70,
  },
  rowsContainer: {
    flex: 1,
    flexDirection: 'row',
    width: deviceWidth,
    height: 130,
  },
  userSuggestionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    width: deviceWidth,
    height: generateAdjustedSize(45),
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    paddingVertical: 3,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.white,
  },
  userSuggestionHeaderText: {
    flex: 1,
    color: Colors.gray,
    fontWeight: '500',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: Fonts.regularFont,
  },
  userSuggestionHeaderIcon: {
    position: 'absolute',
    width: generateAdjustedSize(40),
    height: generateAdjustedSize(40),
    padding: generateAdjustedSize(5),
    left: generateAdjustedSize(15),
  },
});

type Props = {
  getFeedWithSuggestion: () => void,
  querySuggestions: array
};

class QuerySuggestions extends Component {

  props: Props;

  renderSuggestions() {
    const { querySuggestions } = this.props;
    return _.map(querySuggestions, (row, index) => (
      <View key={index} style={styles.rowsContainer}>
        {this.renderRow(row)}
      </View>
    ));
  }

  renderRow(row) {
    const { getFeedWithSuggestion } = this.props;
    return _.map(row, rowItem => (
        <QuerySuggestion key={rowItem.id} suggestion={rowItem} getFeedWithSuggestion={getFeedWithSuggestion} />
    ));
  }

  _renderSuggestionHeader() {
    return (
      <View style={styles.userSuggestionHeaderContainer}>
        <Text style={styles.userSuggestionHeaderText}>{i18n.t('QUERY_SUGGESTION_FEED')}</Text>
        <Image source={emptyResultsIcon} style={styles.userSuggestionHeaderIcon} resizeMode={'contain'} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderSuggestionHeader()}
        {this.renderSuggestions()}
      </View>
    );
  }
}

export default QuerySuggestions;

