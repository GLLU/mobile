// @flow

import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import I18n from 'react-native-i18n';
import _ from 'lodash';
import BaseComponent from '../common/base/BaseComponent';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import i18n from 'react-native-i18n';
import FilterRow from './filters/FilterRow';
const deviceDimensions = Dimensions.get('window');
const deviceWidth = deviceDimensions.width;
const deviceHeight = Platform.os === 'ios' ? deviceDimensions.height : deviceDimensions.height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
import Colors from '../../styles/Colors.styles';
import {generateAdjustedSize} from '../../utils/AdjustabaleContent';
import withAnalytics from '../common/analytics/WithAnalytics';

type Props = {
  defaultFilters: object,
  getFeed: (object) => void,
  loadCategories: (string) => void,
  loadOccasionTags: (string) => void,
  toggleFiltersMenus: (boolean) => void,
  filters: array
};

class FiltersView extends BaseComponent {

  props: Props

  constructor(props) {
    super(props);
    this._updateCurrentFilter = this._updateCurrentFilter.bind(this);
    this._getFeed = this._getFeed.bind(this);
    this._resetFilters = this._resetFilters.bind(this);
    this._cancelFilter = this._cancelFilter.bind(this);
    console.log('props.defaultFilters', props.defaultFilters)
    this.state = {
      isLoading: false,
      openFilter: false,
      currentFilter: props.defaultFilters,
    };
  }

  _updateCurrentFilter(filter: object) {
    const currentFilterState = this.state.currentFilter;
    if (this.state.currentFilter[filter.kind] && this.state.currentFilter[filter.kind] === filter.name) {
      delete currentFilterState[filter.kind];
      this.setState({currentFilter: currentFilterState});
    } else {
      this.setState({currentFilter: {...this.state.currentFilter, [filter.kind]: filter.name}});
    }
  }

  _getFeed() {
    const {currentFilter} = this.state;
    this.props.logEvent('filterView', {
      feed: this.props.currentFeedTab,
      category: currentFilter.category ? currentFilter.category : 'empty',
      body_type: currentFilter.category ? currentFilter.body_type : 'empty',
      occasion: currentFilter.category ? currentFilter.occasion : 'empty',
    });
    this.props.getFeed(currentFilter);
    this.props.toggleFiltersMenus();
  }

  componentDidMount() {
    this.props.loadCategories();
    this.props.loadOccasionTags();
  }

  _getFilterTitle(filtersArray: array) {
    if (filtersArray[0]) {
      switch (filtersArray[0].kind) {
        case 'category':
          return I18n.t('CATEGORIES');
        case 'occasion':
          return I18n.t('EVENTS');
        case 'body_type':
          return I18n.t('BODY SHAPES');
        default:
          return I18n.t('FILTER');

      }
    }
  }

  _renderFilterRows() {
    const {filters} = this.props;
    const {currentFilter} = this.state;
    if (filters.length > 0) {
      return _.map(filters, (filter, i) => {
        const title = this._getFilterTitle(filter);
        return (
          <FilterRow
            key={i} title={title} currentFilter={currentFilter} filters={filter}
            updateCurrentFilter={this._updateCurrentFilter}/>
        );
      });
    }
  }

  _resetFilters() {
    const clearedFiltersState = _.cloneDeep(this.state.currentFilter)
    delete clearedFiltersState.body_type;
    delete clearedFiltersState.category;
    delete clearedFiltersState.occasion;
    this.setState({currentFilter: clearedFiltersState});
  }

  _cancelFilter() {
    this.props.logEvent('filterView', 'cancel filtering');
    this.props.toggleFiltersMenus();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.TopRow}>
          <Text style={styles.filterByText}>{I18n.t('FILTER_BY')}</Text>
          <View style={styles.clearRow}>
            <TouchableOpacity onPress={this._resetFilters}>
              <Text style={styles.cleaResetText}>{I18n.t('RESET FILTERS')}</Text>
            </TouchableOpacity>
            <Text style={styles.seperator}>/</Text>
            <TouchableOpacity onPress={this._cancelFilter}>
              <Text style={styles.cleaResetText}>{I18n.t('CANCEL')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this._renderFilterRows()}
        <TouchableOpacity onPress={this._getFeed} style={styles.applyBtnContainer}>
          <View style={styles.applyBtn}>
            <Text style={styles.applyText}>{I18n.t('APPLY')}</Text>
          </View>
        </TouchableOpacity>
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
    padding: 10,
  },
  clearRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cleaResetText: {
    fontSize: generateAdjustedSize(12),
  },
  filterByText: {
    fontWeight: '600',
  },
  seperator: {
    paddingHorizontal: 10,
  },
  applyBtn: {
    width: deviceWidth - 100,
    height: 45,
    backgroundColor: Colors.highlightColor,
    justifyContent: 'center',
  },
  applyBtnContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.primaryColor,
    paddingTop: 20,
  },
  applyText: {
    textAlign: 'center',
    color: Colors.white,
    fontWeight: '600',
  },
});

export default withAnalytics(FiltersView);
