// @flow

import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Animated,
  View,
} from 'react-native';
import Colors from '../../../styles/Colors.styles';
import FilterGroup from './FilterGroup';
import {Icon} from 'native-base';
const deviceWidth = Dimensions.get('window').width;


class FiltersView extends Component {

  constructor(props) {
    super(props);
    this.toggleFilterRow = this.toggleFilterRow.bind(this)
    this._setFilters = this._setFilters.bind(this)
    this.state = {
      openFilter: false,
      filtersAnimHeight: new Animated.Value(0),
    };
  }

  _setFilters(filters) {
    console.log('filtersaaaa', filters)
    const openFilter = _.find(filters, filter => filter.selected) || {};
    this.setState({filters: filters, openFilter: openFilter})
  }

  toggleFilterRow() {
    this.setState({openFilter: !this.state.openFilter})
    if (this.state.openFilter) {
      Animated.timing(          // Uses easing functions
        this.state.filtersAnimHeight,    // The value to drive
        {
          toValue: 0,

        }            // Configuration
      ).start();
    } else {
      Animated.timing(          // Uses easing functions
        this.state.filtersAnimHeight,    // The value to drive
        {
          toValue: 50,
          duration: 250
        }            // Configuration
      ).start();
    }
  }

  render() {
    const activeFilter = {
      color: '#757575',
      underline: true
    };
    const arrowIcon = this.state.openFilter ? "ios-arrow-down" : "ios-arrow-forward";
    return (
      <View style={{width: deviceWidth}}>
        <TouchableOpacity onPress={this.toggleFilterRow}>
          <View style={{
            width: deviceWidth,
            height: 50,
            justifyContent: 'space-between',
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: Colors.primaryColor,
            paddingHorizontal: 10,
            flexDirection: 'row'
          }}>
            <Text style={{fontWeight: '600'}}>{this.props.title}</Text>
            <Icon style={StyleSheet.flatten(styles.backBtn)} name={arrowIcon}/>
          </View>
        </TouchableOpacity>
        <Animated.View style={{height: this.state.filtersAnimHeight}}>
          <FilterGroup mode='single' activeStyle={activeFilter} onSelectionChange={this._setFilters.bind(this)}
                       filters={this.props.filters}/>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  filterActions: {
    marginTop: 12,
    backgroundColor: '#F5F5F5',
    height: 60,
  },
  filterActionsGrid: {
    backgroundColor: '#FFFFFF',
    height: 100
  }
});

export default FiltersView;
