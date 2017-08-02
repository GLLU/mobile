import React, {Component} from 'react';
import {Dimensions, Image, TouchableOpacity, Text, View, Platform, FlatList, StyleSheet} from 'react-native';
import SearchBar from '../feedscreen/SearchBar';
const backBtn = require('../../../images/icons/arrow_down.png');
import ExtraDimensions from 'react-native-extra-dimensions-android';
const deviceHeight = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const deviceWidth = Dimensions.get('window').width;
import Separator from '../common/lists/Separator';
import UserActionRow from '../common/lists/UserActionRow';
import Colors from '../../styles/Colors.styles'


const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#e6e6e6',
  },
  RowTitle: {
    color: Colors.gray,
    backgroundColor: Colors.backgroundGrey,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '300',
  },
  historyRowContainer: {
    height: 50,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  historyRowText: {
    fontWeight: '600',
    marginLeft: 15
  },
  historyListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth,
    backgroundColor: Colors.backgroundGrey,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  clearText: {
    color: 'red',
    fontWeight: '300',
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  rowTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth,
    padding: 15,
  },
});

class PeopleSearchTab extends Component {

  static propTypes = {
    mode: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this._searchFromHistory = this._searchFromHistory.bind(this),
      this.state = {
        isTrueEndReached: false,
      };
  }

  componentWillMount() {
    this.props.getUsersSuggestions()
  }

  renderResultsList = () => (
    <View>
      <View style={styles.rowTitleContainer}>
        <Text style={styles.RowTitle}>Results</Text>
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

  _searchFromHistory(item) {
    this.props.searchFromHistory(item)
  }

  renderHistoryRow(item) {
    return (
      <TouchableOpacity onPress={() => this._searchFromHistory(item)} style={styles.historyRowContainer}>
        <Text style={styles.historyRowText}>{item}</Text>
      </TouchableOpacity>
    );
  }

  _renderSearchHistoryList() {
    return (
      <FlatList
        style={styles.container}
        data={this.props.searchHistory}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({item}) => this.renderHistoryRow(item)}
      />
    )
  }

  _renderEmptySearchHistory() {
    return (
      <View style={styles.historyRowContainer}>
        <Text style={styles.historyRowText}>Try searching for people</Text>
      </View>
    );
  }

  renderHistoryList = () => (
    <View>
      <View style={styles.rowTitleContainer}>
        <Text style={styles.RowTitle}>Recent
          searches</Text>
        <TouchableOpacity>
          <Text style={styles.clearText}
                onPress={this.props.clearSearchHistory}>CLEAR</Text>
        </TouchableOpacity>
      </View>
      {this.props.searchHistory.length > 0 ? this._renderSearchHistoryList() : this._renderEmptySearchHistory()}
    </View>
  );

  renderSuggestionsList = () => (
    <View style={{}}>
      <View style={styles.rowTitleContainer}>
        <Text style={styles.RowTitle}>Fashionistas you wanna check</Text>
      </View>
      <FlatList
        style={styles.container}
        data={this.props.suggestions}
        keyExtractor={(item, index) => item.userId !== -1 ? item.userId : index}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({item}) => <UserActionRow {...item} navigateTo={this.props.navigateTo}/>}
      />
    </View>
  );

  render() {
    return (
      <View style={{backgroundColor: Colors.backgroundGrey, flex: 1}}>
        {this.props.results.length > 0 ? this.renderResultsList() : this.renderHistoryList() }
        {this.props.results.length === 0 ? this.renderSuggestionsList() : null }
      </View>
    );
  }
}

export default PeopleSearchTab;
