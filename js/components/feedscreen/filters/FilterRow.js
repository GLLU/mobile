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
import Fonts from '../../../styles/Fonts.styles';
import FilterGroup from './FilterGroup';
import {generateAdjustedSize} from '../../../utils/AdjustabaleContent';
import I18n from 'react-native-i18n';
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
    this.getCurrentFilterId = this.getCurrentFilterId.bind(this);
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
          toValue: generateAdjustedSize(80),
          duration: 250,
        }            // Configuration
      ).start();
    }
  }

  getCurrentFilterId() { // Current filter on FilterView is by the feed query (strings) i need the filter id.
    const {currentFilter, filters} = this.props;
    let checkedFilters = _.find(filters, (filter) => {
      return filter.name === currentFilter[filter.kind]
    })
    return checkedFilters ? checkedFilters.id : null;
  }

  render() {
    const arrowIcon = this.state.openFilter ? arrowDown : arrowRight;
    const {currentFilterRowName, filtersAnimHeight} = this.state;
    const {title, filters} = this.props;
    const currentFilter = this.getCurrentFilterId()
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={this.toggleFilterRow}>
          <View
            style={styles.rowHeaderContainer}>
            <View style={{flexDirection: 'column', alignSelf: 'center'}}>
              <Text style={styles.rowTitle}>{I18n.t(title)}</Text>
              {currentFilterRowName.length > 1 ?
                <Text style={styles.selectedFilter}>{currentFilterRowName}</Text> : null}
            </View>
            <Image style={styles.arrows} source={arrowIcon}/>
          </View>
        </TouchableOpacity>
        <Animated.View
          style={[styles.filtersGroupContainer, {height: filtersAnimHeight}]}>
          <FilterGroup
            mode={'single'} onSelectionChange={this._setFilters.bind(this)}
            filters={filters} currentFilter={currentFilter}/>
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
    fontSize: generateAdjustedSize(16),
    fontFamily: Fonts.regularFont,
  },
  selectedFilter: {
    fontSize: generateAdjustedSize(12),
    fontFamily: Fonts.subHeaderFont,
    color: Colors.secondaryColor,
  },
  rowHeaderContainer: {
    width: deviceWidth,
    height: generateAdjustedSize(55),
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
