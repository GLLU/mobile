// @flow

import React from 'react';
import {
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Animated,
  View,
  ActivityIndicator
} from 'react-native';
import BaseComponent from '../common/base/BaseComponent';
import LinearGradient from 'react-native-linear-gradient';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import i18n from 'react-native-i18n';
import Colors from '../../styles/Colors.styles'
import FilterRow from './filters/FilterRow';
const profileBackground = require('../../../images/backgrounds/profile-screen-background.png');
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
import {Icon} from 'native-base';

class FiltersView extends BaseComponent {

  constructor(props) {
    super(props);
    this.toggleFilterRow = this.toggleFilterRow.bind(this)
    this.state = {
      isLoading: false,
      openFilter: false
    };
  }

  getFeed(query) {
    this.props.getFeed(query)
  }

  componentDidMount() {
    console.log('proips2323', this.props)
    this.props.loadCategories(this.props.defaultFilters.gender);
    //this.props.loadOccasionTags(this.props.defaultFilters.gender);
  }


  renderEmptyContent() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Image source={profileBackground}
               style={{resizeMode: 'stretch', width: deviceWidth, height: deviceHeight - 80, alignSelf: 'flex-start'}}>
          <LinearGradient
            colors={['#0C0C0C', '#4C4C4C']}
            style={[styles.linearGradient, {opacity: 0.7}]}/>
          <View style={{marginTop: 100}}>
            <ParisAdjustableMessage text={i18n.t('PARIS_NO_FEED_RESULTS')}/>
          </View>
        </Image>
      </View>
    );
  }

  _setFilters(filters) {
    console.log('filters', filters)
    const openFilter = _.find(filters, filter => filter.selected) || {};
    this.setState({filters: filters, openFilter: openFilter})
  }

  toggleFilterRow() {
    this.setState({openFilter: !this.state.openFilter})
  }

  _renderFilterRow() {

    const arrowIcon = this.state.openFilter ? "ios-arrow-forward" : "ios-arrow-down";
    return (
      <FilterRow title={'CATEGORIES'} filters={this.props.filters}/>
    )
  }


  render() {

    return (
      <View style={styles.container}>
        {this._renderFilterRow()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    height: deviceHeight,
    width: deviceWidth,
    top: 0,
  },
  linearGradient: {
    width: deviceWidth,
    position: 'absolute',
    top: 0,
  },
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
