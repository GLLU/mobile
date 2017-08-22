// @flow

import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import I18n from 'react-native-i18n';
import Slider from 'react-native-slider';
import _ from 'lodash';
import BaseComponent from '../common/base/BaseComponent';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import i18n from 'react-native-i18n';
import Colors from '../../styles/Colors.styles';
import Fonts from '../../styles/Fonts.styles';
import { generateAdjustedSize } from '../../utils/AdjustabaleContent';
import withAnalytics from '../common/analytics/WithAnalytics';
import FilterRow from './filters/FilterRow';
const deviceDimensions = Dimensions.get('window');
const deviceWidth = deviceDimensions.width;
const deviceHeight = Platform.os === 'ios' ? deviceDimensions.height : deviceDimensions.height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const maleIcon = require('../../../images/icons/filter-gender-male.png');
const maleIconActive = require('../../../images/icons/filter-gender-male-active.png');
const femaleIcon = require('../../../images/icons/filter-gender-female.png');
const femaleIconActive = require('../../../images/icons/filter-gender-female-active.png');
export const FILTER = I18n.t('FILTER');

type Props = {
  defaultQuery: object,
  gender: string,
  getFeed: (object) => void,
  loadCategories: () => void,
  loadOccasionTags: () => void,
  toggleFiltersMenus: (boolean) => void,
  changeFiltersGender: (string) => void,
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
      currentFilter: props.defaultQuery,
      sliderValue: this.genderToSliderValue(props.filtersGender),
    };
  }

  genderToSliderValue(gender: string) {
    switch (gender) {
      case 'male':
        return 0;
      case '':
        return 0.5;
      case 'female':
        return 1;
      default:
        return 0.5;
    }
  }

  _updateCurrentFilter(filter: object) {
    const currentFilterState = this.state.currentFilter;
    if (this.state.currentFilter[filter.kind] && this.state.currentFilter[filter.kind] === filter.name) {
      delete currentFilterState[filter.kind];
      this.setState({ currentFilter: currentFilterState });
    } else {
      this.setState({ currentFilter: { ...this.state.currentFilter, [filter.kind]: filter.name } });
    }
  }

  _getFeed() {
    const { currentFilter } = this.state;
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
    const { filters } = this.props;
    const { currentFilter } = this.state;
    if (filters.length > 0) {
      return _.map(filters, (filter, i) => (
        <FilterRow
          key={i} title={filter.title} currentFilter={currentFilter} filters={filter.filters}
          updateCurrentFilter={this._updateCurrentFilter} />
        ));
    } else return null;
  }

  _resetFilters() {
    const {changeFiltersGender} = this.props
    const clearedFiltersState = _.cloneDeep(this.state.currentFilter);
    delete clearedFiltersState.body_type;
    delete clearedFiltersState.category;
    delete clearedFiltersState.occasion;
    delete clearedFiltersState.gender;
    changeFiltersGender('')
    this.setState({ currentFilter: clearedFiltersState, sliderValue: 0.5 });
  }

  _cancelFilter() {
    this.props.logEvent('filterView', { name: 'cancel filtering' });
    this.props.toggleFiltersMenus();
  }

  handleSlide(value: number) {
    const { changeFiltersGender } = this.props;
    let gender;
    switch (value) {
      case 0:
        gender = 'male';
        break;
      case 0.5:
        gender = '';
        break;
      case 1:
        gender = 'female';
        break;
      default:
        gender = '';
    }
    changeFiltersGender(gender);
    const clearedFiltersState = _.cloneDeep(this.state.currentFilter);
    delete clearedFiltersState.body_type;
    delete clearedFiltersState.category;
    this.setState({ gender, sliderValue: value, currentFilter: { ...clearedFiltersState, gender } });
  }

  _renderGenderFilter() {
    const { sliderValue } = this.state;
    const maleColor = sliderValue === 0 ? maleIconActive : maleIcon;
    const femaleColor = sliderValue === 1 ? femaleIconActive : femaleIcon;
    return (
      <View style={styles.sliderRow}>
        <TouchableOpacity onPress={() => this.handleSlide(0)}>
          <Image source={maleColor} resizeMode={'contain'} style={styles.genderImage} />
        </TouchableOpacity>
          <Slider
            maximumTrackTintColor={'transparent'}
            minimumTrackTintColor={'transparent'}
            value={this.state.sliderValue}
            maximumValue={1}
            step={0.5}
            style={styles.slider}
            onSlidingComplete={value => this.handleSlide(value)}
            thumbStyle={{height: 30, width: 30, borderRadius: 15, borderColor: Colors.secondaryColor, backgroundColor: Colors.white}}/>
        <TouchableOpacity onPress={() => this.handleSlide(1)}>
          <Image source={femaleColor} resizeMode={'contain'} style={styles.genderImage} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { showGenderFilter = true } = this.props;
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
        { showGenderFilter ? this._renderGenderFilter() : null}
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
    minHeight: deviceHeight - generateAdjustedSize(113.5),
  },
  TopRow: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryColor,
    width: deviceWidth,
    justifyContent: 'space-between',
    padding: 10,
  },
  sliderRow: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryColor,
    width: deviceWidth,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
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
  genderImage: {
    width: 25,
    height: 25,
  },
  slider: {
    width: Platform.OS === 'ios' ? generateAdjustedSize(110) : generateAdjustedSize(110),
    backgroundColor: Colors.backgroundGrey,
    borderRadius: 20,
    marginHorizontal: 15,
  },
});

export default withAnalytics(FiltersView);
