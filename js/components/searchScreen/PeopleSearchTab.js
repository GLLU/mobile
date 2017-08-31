// @flow
import React, { Component } from 'react';
import { Dimensions, TouchableOpacity, Text, View, FlatList, StyleSheet, SectionList, ActivityIndicator } from 'react-native';
import i18n from 'react-native-i18n';
const deviceWidth = Dimensions.get('window').width;
import Separator from '../common/lists/Separator';
import UserActionRow from '../common/lists/UserActionRow';
import Colors from '../../styles/Colors.styles';
import { generateAdjustedSize } from '../../utils/AdjustabaleContent';
import EmptyStateScreen from '../common/EmptyStateScreen';
import Fonts from '../../styles/Fonts.styles';
import SectionSeparator from './SectionSeparator';
const emptyUser = require('../../../images/emptyStates/user-woman.png');
const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  RowTitle: {
    color: Colors.gray,
    fontFamily: Fonts.regularFont,
    fontWeight: '300',
    fontSize: generateAdjustedSize(14),
  },
  historyRowContainer: {
    height: generateAdjustedSize(60),
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  historyRowText: {
    fontWeight: '600',
    marginLeft: 15,
    fontSize: generateAdjustedSize(14),
  },
  historyListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth,
    backgroundColor: Colors.backgroundGrey,
    padding: generateAdjustedSize(15),
  },
  clearText: {
    color: 'red',
    fontWeight: '300',
    fontFamily: Fonts.regularFont,
    fontSize: generateAdjustedSize(12),
  },
  rowTitleContainer: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth,
    padding: generateAdjustedSize(15),
  },
  emptyViewContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  activityIndicator: {
    height: 50,
  },
});

type Props = {
  results: array,
  suggestions: array,
  searchHistory: array,
  canShowEmptyView: boolean,
  navigateTo: () => void,
  searchFromHistory: () => void,
  clearSearchHistory: () => void
};

class PeopleSearchTab extends Component {
  props: Props;

  constructor(props) {
    super(props);
    this._renderSuggestionUserActionRow = this._renderSuggestionUserActionRow.bind(this);
    this.renderResultsList = this.renderResultsList.bind(this);
    this.emptyOrInit = this.emptyOrInit.bind(this);
    this._renderInitView = this._renderInitView.bind(this);
    this._renderHistoryList = this._renderHistoryList.bind(this);
  }

  renderResultsList = () => (
    <View style={{flex: 1}}>
      <View style={styles.rowTitleContainer}>
        <Text style={styles.RowTitle}>{i18n.t('RESULTS')}</Text>
      </View>
      <FlatList
        style={styles.container}
        data={this.props.results}
        keyExtractor={(item, index) => item.id !== -1 ? item.id : index}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => <UserActionRow {...item} navigateTo={this.props.navigateTo} />}
      />
    </View>
  );

  renderHistoryRow(item) {
    const { searchFromHistory } = this.props;
    return (
      <TouchableOpacity onPress={() => searchFromHistory(item)} style={styles.historyRowContainer}>
        <Text style={styles.historyRowText}>{item}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyHistoryRow(item) {
    return (
      <TouchableOpacity disabled style={styles.historyRowContainer}>
        <Text style={styles.historyRowText}>{item}</Text>
      </TouchableOpacity>
    );
  }

  _renderEmptyView() {
    const emptyTitle = i18n.t('EMPTY_USER_SEARCH_TITLE');
    const emptySubtitle = i18n.t('EMPTY_USER_SEARCH_SUBTITLE');
    return (
      <View style={styles.emptyViewContainer}>
        <EmptyStateScreen
          title={emptyTitle}
          subtitle={emptySubtitle} icon={emptyUser} />
      </View>
    );
  }

  _renderInitView() {
    const { searchHistory, suggestions } = this.props;
    let searchHistorySection;
    if (searchHistory.length > 0) {
      searchHistorySection = { data: searchHistory, key: i18n.t('RECENT_SEARCHES'), renderItem: ({ item }) => this.renderHistoryRow(item), showClear: true };
    } else {
      searchHistorySection = { data: [i18n.t('TRY_SEARCH_FOR_PEOPLE')], key: i18n.t('RECENT_SEARCHES'), renderItem: ({ item }) => this.renderEmptyHistoryRow(item), showClear: false };
    }
    const sections = [
      searchHistorySection,
      { data: suggestions, key: i18n.t('FISHIONISTAS_YOU_WANNA_CHECK'), renderItem: ({ item }) => this._renderSuggestionUserActionRow(item), showClear: false },
    ];
    return (
      <SectionList
        renderSectionHeader={({ section }) => <SectionSeparator title={section.key} showClear={section.showClear} clearAction={this.props.clearSearchHistory} />}
        ItemSeparatorComponent={() => <Separator />}
        keyExtractor={(item, index) => index}
        removeClippedSubviews={false}
        sections={sections}
      />
    );
  }

  emptyOrInit() {
    const { canShowEmptyView, results } = this.props;
    if (canShowEmptyView) {
      return results.length > 0 ? this.renderResultsList() : this._renderEmptyView();
    } else {
      return this._renderInitView();
    }
  }

  _renderHistoryList = () => (
    <View>
      <View style={styles.rowTitleContainer}>
        <Text style={styles.RowTitle}>{i18n.t('RECENT_SEARCHES')}</Text>
        <TouchableOpacity>
          <Text
            style={styles.clearText}
            onPress={this.props.clearSearchHistory}>{i18n.t('CLEAR')}</Text>
        </TouchableOpacity>
      </View>
      {this.props.searchHistory.length > 0 ? this._renderSearchHistoryList() : this._renderEmptySearchHistory()}
    </View>
  );

  _renderSuggestionUserActionRow(item) {
    const { navigateTo } = this.props;
    return (
      <UserActionRow {...item} navigateTo={navigateTo} />
    );
  }

  renderLoader() {
    return (
      <View style={styles.loadingViewContainer}>
        <ActivityIndicator animating style={styles.activityIndicator} color={Colors.secondaryColor} />
      </View>
    );
  }

  render() {
    const { isLoading } = this.props;
    return (
      <View style={styles.tabContainer}>
        {isLoading ? this.renderLoader() : this.emptyOrInit()}
      </View>
    );
  }
}

export default PeopleSearchTab;
