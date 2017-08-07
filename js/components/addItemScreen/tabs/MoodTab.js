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
import FilterGroup from '../../feedscreen/filters/FilterGroup';
import {generateAdjustedSize} from '../../../utils/AdjustabaleContent';
import I18n from 'react-native-i18n';

const deviceWidth = Dimensions.get('window').width;

type Props = {
  updateCurrentFilter: void,
  filters: array,
  currentFilter: object,
};

class CategoryTab extends Component {

  props: Props

  constructor(props) {
    super(props);
    this._setFilters = this._setFilters.bind(this);
    this.checkSelectedQuery = this.checkSelectedQuery.bind(this);
  }

  _setFilters(filter) {
    this.props.updateCurrentFilter(filter, filter.selected);
  }

  checkSelectedQuery() {
    const checkedFilters = _.map(this.props.filters, (filter, i) => {
      const {currentFilter} = this.props;
      const clonedFilter = _.cloneDeep(filter);
      for (i = 0; i < currentFilter.length; i++) {
        if (currentFilter[i] === clonedFilter.id) {
          clonedFilter.selected = true;
        }
      }
      return clonedFilter
    })
    return checkedFilters
  }

  render() {
    return (
      <View style={styles.rowContainer}>
        <View
          style={[styles.filtersGroupContainer]}>
          <FilterGroup
            mode="single" onSelectionChange={this._setFilters.bind(this)}
            filters={this.checkSelectedQuery()}/>
          <View
            style={[styles.rowEdgeShadow, {right: 0}]}/>
          <View
            style={[styles.rowEdgeShadow, {left: 0}]}/>
        </View>
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

export default CategoryTab;
