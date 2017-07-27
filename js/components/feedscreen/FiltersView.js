// @flow

import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import BaseComponent from '../common/base/BaseComponent';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import i18n from 'react-native-i18n';
import FilterRow from './filters/FilterRow';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
import Colors from '../../styles/Colors.styles';

class FiltersView extends BaseComponent {

  constructor(props) {
    super(props);
    this.toggleFilterRow = this.toggleFilterRow.bind(this)
    this.updateCurrentFilter = this.updateCurrentFilter.bind(this)
    this.getFeed = this.getFeed.bind(this)
    console.log('props.defaultFilter', props.defaultFilters)
    this.state = {
      isLoading: false,
      openFilter: false,
      currentFilter: props.defaultFilters
    };
  }

  updateCurrentFilter(filter) {
    this.setState({currentFilter: {...this.state.currentFilter, [filter.kind]: filter.name}});
  }

  getFeed() {
    this.props.getFeed(this.state.currentFilter)
  }

  componentDidMount() {
    this.props.loadCategories(this.props.defaultFilters.gender);
    this.props.loadOccasionTags(this.props.defaultFilters.gender);
  }

  toggleFilterRow() {
    this.setState({openFilter: !this.state.openFilter})
  }

  getFilterTitle(filtersArray) {
    if (filtersArray[0]) {
      switch (filtersArray[0].kind) {
        case 'category':
          return 'CATEGORIES';
        case 'occasion':
          return 'EVENTS';
        default:
          return 'FILTER'
      }
    }

  }

  _renderFilterRows() {
    const {filters} = this.props
    const {currentFilter} = this.state
    console.log('currentFilter', currentFilter)
    if (filters.length > 0) {
      return _.map(filters, (filter, i) => {
        const title = this.getFilterTitle(filter)
        return (
          <FilterRow key={i} title={title} currentFilter={currentFilter} filters={filter}
                     updateCurrentFilter={this.updateCurrentFilter}/>
        );
      });
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.TopRow}>
          <Text style={styles.filterByText}>Filter By</Text>
          <View style={styles.clearRow}>
            <TouchableOpacity>
              <Text style={styles.cleaResetText}>RESET FILTERS</Text>
            </TouchableOpacity>
            <Text style={styles.seperator}>/</Text>
            <TouchableOpacity>
              <Text style={styles.cleaResetText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this._renderFilterRows()}
        <View style={styles.applyBtnContainer}>
          <TouchableOpacity onPress={this.getFeed}>
            <View style={styles.applyBtn}>
              <Text style={styles.applyText}>APPLY</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    position: 'absolute',
    height: deviceHeight,
    width: deviceWidth,
    top: 0,
  },
  TopRow: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryColor,
    width: deviceWidth,
    justifyContent: 'space-between',
    padding: 10
  },
  clearRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cleaResetText: {
    fontSize: 12
  },
  filterByText: {
    fontWeight: '600'
  },
  seperator: {
    paddingHorizontal: 10
  },
  applyBtn: {
    width: deviceWidth - 100,
    height: 45,
    backgroundColor: Colors.highlightColor,
    justifyContent: 'center'
  },
  applyBtnContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.primaryColor,
    paddingTop: 20
  },
  applyText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600'
  },
});

export default FiltersView;
