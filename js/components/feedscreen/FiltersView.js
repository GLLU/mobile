// @flow

import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import I18n from 'react-native-i18n';
import _ from 'lodash';
import BaseComponent from '../common/base/BaseComponent';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import i18n from 'react-native-i18n';
import Colors from '../../styles/Colors.styles';
import Fonts from '../../styles/Fonts.styles';
import {generateAdjustedSize} from '../../utils/AdjustabaleContent';
import withAnalytics from '../common/analytics/WithAnalytics';
import FilterRow from './filters/FilterRow';
const deviceDimensions = Dimensions.get('window');
const deviceWidth = deviceDimensions.width;
const deviceHeight = Platform.os === 'ios' ? deviceDimensions.height : deviceDimensions.height - ExtraDimensions.get('STATUS_BAR_HEIGHT');

export const FILTER = I18n.t('FILTER');

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
      body_type: currentFilter.body_type ? currentFilter.body_type : 'empty',
      occasion: currentFilter.occasion ? currentFilter.occasion : 'empty',
    });
    this.props.getFeed(currentFilter);
    this.props.toggleFiltersMenus();
  }

  componentDidMount() {
    this.props.loadCategories();
    this.props.loadOccasionTags();
  }

  _renderFilterRows() {
    const {filters} = this.props;
    const {currentFilter} = this.state;
    if (filters.length > 0) {
      return _.map(filters, (filter, i) => {
        return (
          <FilterRow
            key={i} title={filter.title} currentFilter={currentFilter} filters={filter.filters}
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
    this.props.logEvent('filterView', {name: 'cancel filtering'});
    this.props.toggleFiltersMenus();
  }

  render() {
    return (
      <ScrollView style={styles.filterViewContainer} contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.TopRow}>
            <TouchableOpacity onPress={this._resetFilters}>
              <Text style={styles.cleaResetText}>{I18n.t('RESET FILTERS')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._cancelFilter}>
              <Text style={styles.cleaResetText}>{I18n.t('CANCEL')}</Text>
            </TouchableOpacity>
          </View>
          {this._renderFilterRows()}
        <View style={styles.applyBottomContainer}>
          <TouchableOpacity onPress={this._getFeed} style={styles.applyBtnContainer}>
            <Text style={styles.applyText}>{I18n.t('APPLY')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  filterViewContainer: {
    top: 0,
    flexDirection: 'column',
  },
  contentContainerStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: 'flex-start',
    minHeight: deviceHeight - generateAdjustedSize(113.5)
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
    fontFamily: Fonts.regularFont,
  },
  filterByText: {
    fontWeight: '600',
  },
  seperator: {
    paddingHorizontal: 10,
  },
  applyText: {
    textAlign: 'center',
    color: Colors.white,
    fontWeight: '600',
  },
  applyBottomContainer: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    marginVertical: 45,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  applyBtnContainer: {
    width: deviceWidth - 90,
    height: 45,
    backgroundColor: Colors.highlightColor,
    justifyContent: 'center',
  },
});

export default withAnalytics(FiltersView);
