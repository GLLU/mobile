// @flow

import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../../styles/Colors.styles';
import QuerySuggestion from './QuerySuggestion';
import _ from 'lodash';

const deviceWidth = Dimensions.get('window').width;

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

  boom() {
    const { querySuggestions, getFeedWithSuggestion } = this.props;
    const sortedGroups = _.groupBy(querySuggestions, item => item.rowNumber);
    return _.map(sortedGroups, (row,index) => (
      <QuerySuggestion key={index} rowArray={row} getFeedWithSuggestion={getFeedWithSuggestion}/>
    ));
  }
  render() {
    return (
      <View style={styles.container}>
        {this.boom()}
      </View>
    )
  }
}

export default QuerySuggestions;

