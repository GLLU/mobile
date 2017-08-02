'use strict';

import React, {Component} from 'react';
import {Dimensions, Image, TouchableOpacity, Text, View, Platform} from 'react-native';
import SearchBar from '../feedscreen/SearchBar'
import SearchTabs from './SearchTabs'
const leftLongArrow = require('../../../images/icons/left-long-arrow.png');
import ExtraDimensions from 'react-native-extra-dimensions-android';
const deviceHeight = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const deviceWidth = Dimensions.get('window').width;
import Colors from "../../styles/Colors.styles";

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
    this.props.clearSearchResults(this.state.currentTab.key)
    this.setState({
      searchTerm: ''
    })
  }

  _setCurrentTab(currentTab) {
    this.setState({currentTab})
  }

  _handleSearchInput(value) {
    console.log('clear search', value)
    this.setState({
      searchTerm: value
    }, () => {
    });
  }

  _handleSearch() {
    console.log('this.state.searchTerm', this.state.searchTerm.length)
    if (this.state.searchTerm.length > 2) { // currently sever-side doesnt return results for less then 3 digits
      if (this.state.currentTab.key === 'looks') {
        this.props.getFeed({term: this.state.searchTerm});
        this.props.addSearchTermHistoryToLooks(this.state.searchTerm);
        this.props.goBack();
      }
      else {
        this.props.getUsers(this.state.searchTerm);
        this.props.addSearchTermHistoryToPeople(this.state.searchTerm);
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
      <View style={{backgroundColor: Colors.primaryColor, flex: 1, paddingTop: 30}}>
        <View style={{flexDirection: 'row', height: 30,}}>
          <TouchableOpacity onPress={this.props.goBack} style={{padding: 5, justifyContent: 'center'}}>
            <Image style={{width: 20, height: 20, alignSelf: 'center'}} source={leftLongArrow}/>
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <SearchBar handleSearchInput={this.handleSearchInput}
                       handleSearch={this._handleSearch} searchTerm={this.state.searchTerm}
                       clearSearchBar={this._clearSearchBar}/>
          </View>
        </View>
        <SearchTabs navigateTo={navigateTo} setCurrentTab={this._setCurrentTab}
                    peopleSearchResults={this.props.peopleSearchResults} searchFromHistory={this._seachFromHistory}/>
      </View>
    );
  }
}

export default SearchScreen;