// @flow

import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  View,
  Image
} from 'react-native';
import Colors from '../../../styles/Colors.styles';
import FilterGroup from './FilterGroup';
import {generateAdjustedSize} from '../../../utils/AdjustabaleContent';

const arrowRight = require('../../../../images/icons/collapsed-filterButton.png');
const arrowDown = require('../../../../images/icons/expand-filterButton.png');
const deviceWidth = Dimensions.get('window').width;

type Props = {
  updateCurrentFilter: void,
  filters: array,
  currentFilter: object,
  title: string
};

class FilterRow extends Component {

  props: Props

  constructor(props) {
    super(props);
    this.toggleFilterRow = this.toggleFilterRow.bind(this);
    this._setFilters = this._setFilters.bind(this);
    this.checkSelectedQuery = this.checkSelectedQuery.bind(this);
    this.checkSelectedFilter = this.checkSelectedFilter.bind(this);
    this.state = {
      openFilter: false,
      filtersAnimHeight: new Animated.Value(0),
      currentFilterRowName: '',
    };
  }

  componentDidMount() {
    this.checkSelectedFilter(this.props.filters, this.props.currentFilter)
  }

  checkSelectedFilter(filters, currentFilterProp) {
    const currentFilter = _.find(filters, (filter) => {
      if (currentFilterProp[filter.kind] === filter.name) {
        return filter.name;
      }
    });
    if (currentFilter) {
      this.setState({currentFilterRowName: currentFilter.name});
    } else {
      this.setState({currentFilterRowName: ''});
    }
  }

  componentWillReceiveProps(nextProps) {
    this.checkSelectedFilter(nextProps.filters, nextProps.currentFilter)
  }

  _setFilters(filter) {
    if (filter.name === this.state.currentFilterRowName) {
      this.setState({currentFilterRowName: ''});
    }
    this.props.updateCurrentFilter(filter);
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
      const clonedFilter = _.cloneDeep(filter);
      if (currentFilter[filter.kind]) {
        const filterName = filter.name.toLowerCase();
        const filterKind = currentFilter[filter.kind].toLowerCase();
        if (filterKind === filterName) {
          clonedFilter.selected = true;
        }
      }
      return clonedFilter;
    });
    return checkedFilters;
  }

  render() {
    const arrowIcon = this.state.openFilter ? arrowDown : arrowRight;
    const {currentFilterRowName, filtersAnimHeight} = this.state;
    const {currentFilter, title} = this.props;
    console.log('current filter', currentFilter)
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={this.toggleFilterRow}>
          <View
            style={styles.rowHeaderContainer}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.rowTitle}>{title}</Text>
              <Text style={styles.selectedFilter}>{currentFilterRowName}</Text>
            </View>
            <Image style={styles.arrows} source={arrowIcon}/>
          </View>
        </TouchableOpacity>
        <Animated.View
          style={[styles.filtersGroupContainer, {height: filtersAnimHeight}]}>

          <FilterGroup
            mode="single" onSelectionChange={this._setFilters.bind(this)}
            filters={this.checkSelectedQuery()} currentFilter={currentFilter}/>
          <Animated.View
            style={[styles.rowEdgeShadow, {height: filtersAnimHeight, right: 0}]}/>
          <Animated.View
            style={[styles.rowEdgeShadow, {height: filtersAnimHeight, left: 0}]}/>
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
    fontWeight: '600',
  },
  selectedFilter: {
    fontWeight: '600',
    fontSize: generateAdjustedSize(12),
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
  },
  arrows: {
    width: 20,
    height: 20
  },
});

export default FilterRow;
