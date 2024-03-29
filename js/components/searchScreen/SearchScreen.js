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
      currentTab: { key: props.navigation && 
        props.navigation.state &&
        props.navigation.state.params &&
        props.navigation.state.params.key ?
        props.navigation.state.params.key : 'looks', title: '' },
    }
  }

  _clearSearchBar() {
    this.props.clearPeopleSearchResults()
    this.setState({
      searchTerm: ''
    })
  }

  componentDidMount() {
    this.props.getUsersSuggestions()
  }

  componentWillUnmount() {
    this.props.clearPeopleSearchResults()
  }

  _setCurrentTab(currentTab) {
    this.setState({ currentTab })
  }

  _handleSearchInput(value) {
    this.setState({
      searchTerm: value
    }, () => {
    });
  }

  _handleSearch() {

    const { logEvent, getFeed, goBack, getUsers } = this.props;
    const { searchTerm } = this.state;

    if (searchTerm.length > 0) { // currently sever-side doesnt return results for less then 3 digits
      if (this.state.currentTab.key === 'looks') {
        logEvent('Feedscreen', { name: 'Search', type: 'looks', query: searchTerm });
        getFeed({ term: searchTerm });
        goBack();
      }
      else {
        logEvent('Feedscreen', { name: 'Search', type: 'people', query: searchTerm });
        getUsers(searchTerm);
      }
    }
  }

  _seachFromHistory(value) {
    this.setState({ searchTerm: value }, () => {
      this._handleSearch()
    })
  }

  render() {
    const { navigateTo } = this.props;
    const { currentTab } = this.state;
    return (// Will remove the marginTop
      <View style={styles.searchScreenContainer}>
        <View style={styles.searchBarContainer}>
          <TouchableOpacity onPress={this.props.goBack} style={styles.searchIconContainer}>
            <Image style={styles.searchIcon} source={leftLongArrow}/>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <SearchBar handleSearchInput={this.handleSearchInput}
                       handleSearch={this._handleSearch} searchTerm={this.state.searchTerm}
                       clearSearchBar={this._clearSearchBar}/>
          </View>
        </View>
        <SearchTabs navigateTo={navigateTo} setCurrentTab={this._setCurrentTab} activeTab={currentTab}
                    searchFromHistory={this._seachFromHistory}/>
      </View>
    );
  }
}

export default SearchScreen;