'use strict';

import React, {Component} from 'react';
import {Dimensions, Image, TouchableOpacity, View, Platform, StyleSheet} from 'react-native';
import SearchBar from '../feedscreen/SearchBar'
import SearchTabs from './SearchTabs'
const leftLongArrow = require('../../../images/icons/left-long-arrow.png');
import Colors from "../../styles/Colors.styles";

const styles = StyleSheet.create({
  searchScreenContainer: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
  },
  searchBarContainer: {
    flexDirection: 'row',
  },
  searchIconContainer: {
    padding: 5,
    justifyContent: 'center'
  },
  searchIcon: {
    width: 20,
    height: 20,
    alignSelf: 'center'
  },
});

class SearchScreen extends Component {

  static propTypes = {
    mode: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this._clearSearchBar = this._clearSearchBar.bind(this)
    this._handleSearchInput = this._handleSearchInput.bind(this)
    this.handleSearchInput = _.debounce(this._handleSearchInput)
    this._handleSearch = this._handleSearch.bind(this)
    this._setCurrentTab = this._setCurrentTab.bind(this)
    this._seachFromHistory = this._seachFromHistory.bind(this)
    this.state = {
      searchTerm: '',
      currentTab: {key: 'looks', title: ''},
    }
  }

  _clearSearchBar() {
    this.props.clearPeopleSearchResults()
    this.setState({
      searchTerm: ''
    })
  }

  componentWillMount() {
    this.props.getUsersSuggestions()
  }

  componentWillUnmount() {
    this.props.clearPeopleSearchResults()
  }

  _setCurrentTab(currentTab) {
    this.setState({currentTab})
  }

  _handleSearchInput(value) {
    this.setState({
      searchTerm: value
    }, () => {
    });
  }

  _handleSearch() {
    if (this.state.searchTerm.length > 0) { // currently sever-side doesnt return results for less then 3 digits
      if (this.state.currentTab.key === 'looks') {
        this.props.getFeed({term: this.state.searchTerm});
        this.props.goBack();
      }
      else {
        this.props.getUsers(this.state.searchTerm);
      }
    }
  }

  _seachFromHistory(value) {
    this.setState({searchTerm: value}, () => {
      this._handleSearch()
    })
  }

  render() {
    const {navigateTo} = this.props
    return (// Will remove the marginTop
      <View style={styles.searchScreenContainer}>
        <View style={styles.searchBarContainer}>
          <TouchableOpacity onPress={this.props.goBack} style={styles.searchIconContainer}>
            <Image style={styles.searchIcon} source={leftLongArrow}/>
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <SearchBar handleSearchInput={this.handleSearchInput}
                       handleSearch={this._handleSearch} searchTerm={this.state.searchTerm}
                       clearSearchBar={this._clearSearchBar}/>
          </View>
        </View>
        <SearchTabs navigateTo={navigateTo} setCurrentTab={this._setCurrentTab}
                    searchFromHistory={this._seachFromHistory}/>
      </View>
    );
  }
}

export default SearchScreen;