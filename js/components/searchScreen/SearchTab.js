'use strict';

import React, {Component} from 'react';
import {Dimensions, Image, TouchableOpacity, Text, View, Platform, FlatList, StyleSheet} from 'react-native';
import SearchBar from '../feedscreen/SearchBar'
const backBtn = require('../../../images/icons/arrow_down.png');
import ExtraDimensions from 'react-native-extra-dimensions-android';
const deviceHeight = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const deviceWidth = Dimensions.get('window').width;
import Separator from "../common/lists/Separator";
import UserActionRow from "../common/lists/UserActionRow";


const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#e6e6e6',
  },
});

class SearchTab extends Component {

  static propTypes = {
    mode: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this._clearText = this._clearText.bind(this)
    this._handleSearchInput = this._handleSearchInput.bind(this),
      this.state = {
        isTrueEndReached: false
      };
  }

  _clearText() {
    console.log('clear search')
  }

  _handleSearchInput() {
    console.log('clear search')
  }

  renderResultsList = () => {
    return (
      <FlatList
        style={styles.container}
        data={this.props.results}
        keyExtractor={(item, index) => item.userId !== -1 ? item.userId : index}
        ItemSeparatorComponent={() => <Separator/>}
        renderItem={({item}) => <UserActionRow {...item} navigateTo={this.props.navigateTo}/>}
        onEndReached={this.state.isTrueEndReached ? noop : this.props.onEndReached}
        onEndReachedThreshold={100}
      />
    );
  };

  renderHistoryList = () => {
    return (
      <FlatList
        style={styles.container}
        data={this.props.searchHistory}
        keyExtractor={(item, index) => item.userId !== -1 ? item.userId : index}
        ItemSeparatorComponent={() => <Separator/>}
        renderItem={({item}) => <View style={{backgroundColor: 'green', height: 10}}/>}
        onEndReached={this.state.isTrueEndReached ? noop : this.props.onEndReached}
        onEndReachedThreshold={100}
      />
    );
  };

  render() {
    console.log('this.props.results', this.props.searchHistory)
    return (// Will remove the marginTop
      <View style={{backgroundColor: 'red', flex: 1, marginTop: 30}}>
        {this.props.results.length > 0 ? this.renderResultsList() : <View></View> }
        {this.props.searchHistory.length > 0 ? this.renderHistoryList() : <View></View> }

      </View>
    );
  }
}

export default SearchTab;