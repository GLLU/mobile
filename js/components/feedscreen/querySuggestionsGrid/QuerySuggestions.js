// @flow

import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../../styles/Colors.styles';
import QuerySuggestion from './QuerySuggestion';
import _ from 'lodash';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 3,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});

type Props = {
  renderQuerySuggestions: array,
  getFeedWithSuggestion: () => void
};

class QuerySuggestions extends Component {

  props: Props;

  boom() {
    const { querySuggestions, getFeedWithSuggestion } = this.props;
    const sortedGroups = _.groupBy(querySuggestions, item => item.rowNumber);
    return _.map(sortedGroups, (row,index) => (
      <View key={index} style={{ flex: 1, width: deviceWidth, flexDirection: 'row' }}>
        <QuerySuggestion rowArray={row} getFeedWithSuggestion={getFeedWithSuggestion}/>
      </View>
    ));
  }
  render() {
    console.log('ok ok ok')
    return (
      <View>
        {this.boom()}
      </View>
    )
  }
}

export default QuerySuggestions;

