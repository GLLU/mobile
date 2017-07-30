// @flow

import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Colors from '../../styles/Colors.styles';
import FeedActiveFilter from './items/FeedActiveFilter';
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 3,
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
});

type Props = {
  query: object,
  getFeed: (object) => void,
};

class FeedFilters extends Component {

  props: Props;

  constructor(props: Props) {
    super(props);
    this._getFilterParameters = this._getFilterParameters.bind(this);
    this._removeFeedFilter = this._removeFeedFilter.bind(this);
  }

  getFilters() {
    return _.map(this._getFilterParameters(), (filter, index) => {
      return <FeedActiveFilter key={index} title={filter} removeFilter={this._removeFeedFilter}/>
    })
  }

  _getFilterParameters() {
    const {query} = this.props
    const parsedQuery = _.cloneDeep(query);
    delete parsedQuery.page;
    delete parsedQuery.followings;
    delete parsedQuery.gender;
    return _.valuesIn(parsedQuery)
  }

  _removeFeedFilter(filter: string) {
    const {query, getFeed} = this.props
    const clonedQuery = _.cloneDeep(query);
    const boom = _.findKey(this.props.query, (value) => {
      return value === filter;
    })
    delete clonedQuery[boom];
    getFeed(clonedQuery);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.getFilters()}
      </View>
    );

  }
}

export default FeedFilters;

