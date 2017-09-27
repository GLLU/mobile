// @flow

import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../../styles/Colors.styles';

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
  rowArray: array,
  getFeedWithSuggestion: () => void
};

class QuerySuggestion extends Component {

  props: Props;
  renderRows() {
    const { rowArray, getFeedWithSuggestion } = this.props;
    return _.map(rowArray, rowItem => (
      <TouchableOpacity key={rowItem.id} onPress={()=> getFeedWithSuggestion(rowItem.query)} style={{ flex: 1, margin: 5 }}>
        <Image source={{ uri: rowItem.coverUrl }}  style={{ flex: 1 }}>
          <Text style={{ position: 'absolute', backgroundColor: Colors.secondaryColor }}>{rowItem.title}</Text>
        </Image>
      </TouchableOpacity>
    ));
  }
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        {this.renderRows()}
      </View>
    )
  }
}

export default QuerySuggestion;

