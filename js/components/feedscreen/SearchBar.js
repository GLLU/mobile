import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, Platform, View, TouchableOpacity, Image} from 'react-native';
import withAnalytics from '../common/analytics/WithAnalytics';
import _ from 'lodash';
import Fonts from '../../styles/Fonts.styles';
import Colors from '../../styles/Colors.styles';
import FontSizeCalculator from './../../calculators/FontSize';
const searchIcon = require('../../../images/icons/search-black.png');
const clear = require('../../../images/icons/cancel-clear-x.png');

const styles = StyleSheet.create({
  searchBar: {
    position: 'relative',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
  searchInput: {
    borderBottomWidth: 0,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    flex: 1,
    backgroundColor: 'white',
    fontSize: Platform.OS === 'ios' ? new FontSizeCalculator(13).getSize() : new FontSizeCalculator(14).getSize(),
    fontFamily: Fonts.regularFont,
    color: Colors.gray,
    borderRadius: 10,
    height: Platform.OS === 'ios' ? 35 : 50,
  },
  btnCloseFilter: {
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.4,
    color: Colors.gray,
    borderRadius: 10,
    height: 20,
    width: 65
  },
  clearContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  clearText: {
    height: 10,
    width: 10,
    alignSelf: 'center',
  },
  searchIcon: {
    height: 20,
    width: 20,
    padding: 5,
    marginLeft: 10
  }
});

class SearchBar extends Component {
  static propTypes = {
    handleSearchInput: React.PropTypes.func,
    clearText: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    this._clearSearch = this._clearSearch.bind(this);
    this._getFeed = this._getFeed.bind(this);
    this._doSearch = this._doSearch.bind(this);
  }

  _doSearch(text) {
    const {logEvent, handleSearchInput} = this.props
    logEvent('Feedscreen', {name: 'Search'});
    handleSearchInput(text);
  }

  _clearSearch() {
    const {logEvent, clearSearchBar} = this.props
    logEvent('Feedscreen', {name: 'Clear search'});
    clearSearchBar();
  }

  _getFeed() {
    this.props.handleSearch();
  }

  render() {
    return (
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={this._getFeed}>
          <Image style={styles.searchIcon} resizeMode={'contain'} source={searchIcon}/>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder='Search'
          underlineColorAndroid='transparent'
          onChangeText={this._doSearch}
          value={this.props.searchTerm}
          returnKeyType={'search'}
          onSubmitEditing={this._getFeed}
        />
        <TouchableOpacity onPress={this._clearSearch}
                          style={styles.clearContainer}>
          <Image source={clear} style={styles.clearText}/>
        </TouchableOpacity>
      </View>
    )
  }
}

export default withAnalytics(SearchBar);
