import React, {Component} from 'react';
import {Dimensions, TouchableOpacity, Text, View, StyleSheet} from 'react-native';
const deviceWidth = Dimensions.get('window').width;
import Colors from '../../styles/Colors.styles'
import {generateAdjustedSize} from '../../utils/AdjustabaleContent';
import i18n from 'react-native-i18n';

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#e6e6e6',
  },
  RowTitle: {
    color: Colors.gray,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '300',
    fontSize: generateAdjustedSize(14),
  },
  historyRowContainer: {
    height: generateAdjustedSize(60),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderBottomWidth: generateAdjustedSize(1),
    borderBottomColor: Colors.separatorGray
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
    fontFamily: 'Montserrat-Regular',
    fontSize: generateAdjustedSize(12),
  },
  rowTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth,
    padding: generateAdjustedSize(15),
  },
});


class LooksSearchTab extends Component {

  static propTypes = {
    mode: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this._searchFromHistory = this._searchFromHistory.bind(this);
    this._renderSearchHistoryList = this._renderSearchHistoryList.bind(this);
    this._renderHistoryList = this._renderHistoryList.bind(this);
  }

  _searchFromHistory(item) {
    this.props.searchFromHistory(item)
  }

  _renderHistoryRow(item) {
    return (
      <TouchableOpacity onPress={() => this._searchFromHistory(item)} style={styles.historyRowContainer}>
        <Text style={styles.historyRowText}>{item}</Text>
      </TouchableOpacity>
    );
  }

  _renderSearchHistoryList() {
    return _.map(this.props.searchHistory, (item, index) => (
      <View key={index} style={styles.historyRowContainer}>
        {this._renderHistoryRow(item)}
      </View>
    ));
  }

  _renderEmptySearchHistory() {
    return (
      <View style={styles.historyRowContainer}>
        <Text style={styles.historyRowText}>{i18n.t('TRY_SEARCHING_FOR_ITEMS')}</Text>
      </View>
    );
  }

  _renderHistoryList = () => (
    <View>
      <View style={styles.rowTitleContainer}>
        <Text style={styles.RowTitle}>{i18n.t('RECENT_SEARCHES')}</Text>
        <TouchableOpacity>
          <Text style={styles.clearText}
                onPress={this.props.clearSearchHistory}>{i18n.t('CLEAR')}</Text>
        </TouchableOpacity>
      </View>
      {this.props.searchHistory.length > 0 ? this._renderSearchHistoryList() : this._renderEmptySearchHistory()}
    </View>
  );

  render() {
    return (
      <View style={{backgroundColor: Colors.backgroundGrey, flex: 1}}>
        {this._renderHistoryList()}
      </View>
    );
  }
}

export default LooksSearchTab;
