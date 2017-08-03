// @flow
import React, {Component} from 'react';
import {Dimensions, TouchableOpacity, Text, View, FlatList, StyleSheet} from 'react-native';
import i18n from 'react-native-i18n';
const deviceWidth = Dimensions.get('window').width;
import Separator from '../common/lists/Separator';
import UserActionRow from '../common/lists/UserActionRow';
import Colors from '../../styles/Colors.styles';
import {generateAdjustedSize} from '../../utils/AdjustabaleContent';
import EmptyStateScreen from '../common/EmptyStateScreen';
import Fonts from '../../styles/Fonts.styles';
const emptyUser = require('../../../images/emptyStates/user-woman.png');
const styles = StyleSheet.create({
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
    borderBottomWidth: generateAdjustedSize(1),
    borderBottomColor: Colors.separatorGray,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth,
    padding: generateAdjustedSize(15),
  },
  emptyViewContainer: {
    flex: 1,
    justifyContent: 'center',
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
    this._renderSearchHistoryList = this._renderSearchHistoryList.bind(this);
    this.emptyOrInit = this.emptyOrInit.bind(this);
    this._renderInitView = this._renderInitView.bind(this);
    this._renderHistoryList = this._renderHistoryList.bind(this);
  }

  renderResultsList = () => (
    <View>
      <View style={styles.rowTitleContainer}>
        <Text style={styles.RowTitle}>{i18n.t('RESULTS')}</Text>
      </View>
      <FlatList
        style={styles.container}
        data={this.props.results}
        keyExtractor={(item, index) => item.userId !== -1 ? item.userId : index}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({item}) => <UserActionRow {...item} navigateTo={this.props.navigateTo}/>}
      />
    </View>
  );

  renderHistoryRow(item) {
    const {searchFromHistory} = this.props;
    return (
      <TouchableOpacity onPress={() => searchFromHistory(item)} style={styles.historyRowContainer}>
        <Text style={styles.historyRowText}>{item}</Text>
      </TouchableOpacity>
    );
  }

  _renderSearchHistoryList() {
    const {searchHistory} = this.props;
    return _.map(searchHistory, (item, index) => (
      <View key={index} style={styles.historyRowContainer}>
        {this.renderHistoryRow(item)}
      </View>
    ));
  }

  _renderEmptySearchHistory() {
    return (
      <View style={styles.historyRowContainer}>
        <Text style={styles.historyRowText}>{i18n.t('TRY_SEARCH_FOR_PEOPLE')}</Text>
      </View>
    );
  }

  _renderEmptyView() {
    const emptyTitle = i18n.t('EMPTY_USER_SEARCH_TITLE');
    const emptySubtitle = i18n.t('EMPTY_USER_SEARCH_SUBTITLE');
    return (
      <View style={styles.emptyViewContainer}>
        <EmptyStateScreen
          title={emptyTitle}
          subtitle={emptySubtitle} icon={emptyUser}/>
      </View>
    );
  }

  _renderInitView() {
    return (
      <View>
        {this._renderHistoryList() }
        {this.renderSuggestionsList()}
      </View>
    );
  }

  emptyOrInit() {
    const {canShowEmptyView, results} = this.props;
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

  renderSuggestionsList = () => (
    <View style={{}}>
      <View style={styles.rowTitleContainer}>
        <Text style={styles.RowTitle}>{i18n.t('FISHIONISTAS_YOU_WANNA_CHECK')}</Text>
      </View>
      {this._renderSuggestionUserActionRow()}
    </View>
  );

  _renderSuggestionUserActionRow() {
    const {suggestions, navigateTo} = this.props;
    return _.map(suggestions, (item, index) => (
      <View key={index} style={styles.historyRowContainer}>
        <UserActionRow {...item} navigateTo={navigateTo}/>
      </View>
    ));
  }

  render() {
    return (
      <View style={{backgroundColor: Colors.backgroundGrey, flex: 1}}>
        {this.emptyOrInit()}
      </View>
    );
  }
}

export default PeopleSearchTab;
