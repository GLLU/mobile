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


class FilterRow extends Component {

  constructor(props) {
    super(props);
    this.toggleFilterRow = this.toggleFilterRow.bind(this);
    this._setFilters = this._setFilters.bind(this);
    this.checkSelectedQuery = this.checkSelectedQuery.bind(this);
    this.state = {
      openFilter: false,
      filtersAnimHeight: new Animated.Value(70),
      currentFilterRowName: ''
    };
  }

  _setFilters(filter) {
    if (filter.name === this.state.currentFilterRowName) {
      this.setState({currentFilterRowName: ''})
    }
    this.props.updateCurrentFilter(filter)
  }

  toggleFilterRow() {
    this.setState({openFilter: !this.state.openFilter});
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
          toValue: 70,
          duration: 250,
        }            // Configuration
      ).start();
    }
  }

  checkSelectedQuery() {

    const checkedFilters = _.map(this.props.filters, (filter, i) => {
      const {currentFilter} = this.props;
      const clonedFilter = _.cloneDeep(filter)
      if (currentFilter[filter.kind]) {
        const filterName = filter['name'].toLowerCase();
        const filterKind = currentFilter[filter.kind].toLowerCase();
        if (filterKind === filterName) {
          clonedFilter.selected = true;
          if (this.state.currentFilterRowName !== filter.name) {
            this.setState({currentFilterRowName: filter.name});
          }
        }
      }
      return clonedFilter;
    })
    return checkedFilters

  }

  render() {
    const activeFilter = {
      color: '#757575',
      underline: true,
    };
    const arrowIcon = this.state.openFilter ? 'ios-arrow-down' : 'ios-arrow-forward';
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={this.toggleFilterRow}>
          <View
            style={styles.rowHeaderContainer}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.rowTitle}>{this.props.title}</Text>
              <Text style={styles.selectedFilter}>{this.state.currentFilterRowName}</Text>
            </View>
            <Icon style={StyleSheet.flatten(styles.backBtn)} name={arrowIcon}/>
          </View>

        </TouchableOpacity>
        <Animated.View
          style={[styles.filtersGroupContainer, {height: this.state.filtersAnimHeight,}]}>
          <Animated.View
            style={[styles.rowEdgeShadow, {height: this.state.filtersAnimHeight, left: 0}]}/>
          <FilterGroup
            mode="single" activeStyle={activeFilter} onSelectionChange={this._setFilters.bind(this)}
            filters={this.checkSelectedQuery()} currentFilter={this.props.currentFilter}/>
          <Animated.View
            style={[styles.rowEdgeShadow, {height: this.state.filtersAnimHeight, right: 0}]}/>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowEdgeShadow: {
    position: 'absolute',
    width: 15,
    backgroundColor: Colors.white,
    opacity: 0.8,
  },
  rowTitle: {
    fontWeight: '600'
  },
  selectedFilter: {
    fontWeight: '600',
    fontSize: 12,
    color: Colors.secondaryColor,
  },
  rowHeaderContainer: {
    width: deviceWidth,
    height: 55,
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  rowContainer: {
    width: deviceWidth,
    borderBottomColor: Colors.white,
    borderBottomWidth: 3,
  },
  filtersGroupContainer: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  }
});

export default FilterRow;
