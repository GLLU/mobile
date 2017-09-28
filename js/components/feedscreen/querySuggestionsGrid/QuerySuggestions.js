// @flow

import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import QuerySuggestion from './QuerySuggestion';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 70,
  },
});

type Props = {
  renderQuerySuggestions: array,
  getFeedWithSuggestion: () => void
};

class QuerySuggestions extends Component {

  props: Props;

  renderSuggestions() {
    const { querySuggestions, getFeedWithSuggestion } = this.props;
    const sortedGroups = _.groupBy(querySuggestions, item => item.rowNumber);
    return _.map(sortedGroups, (row,index) => (
      <QuerySuggestion key={index} rowArray={row} getFeedWithSuggestion={getFeedWithSuggestion}/>
    ));
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderSuggestions()}
      </View>
    )
  }
}

export default QuerySuggestions;

