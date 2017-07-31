'use strict';

import React, {Component} from 'react';
import {Dimensions, Image, TouchableOpacity, Text, View, Platform} from 'react-native';
import SearchBar from '../feedscreen/SearchBar'
const backBtn = require('../../../images/icons/arrow_down.png');
import ExtraDimensions from 'react-native-extra-dimensions-android';
const deviceHeight = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const deviceWidth = Dimensions.get('window').width;
class SearchTab extends Component {

  static propTypes = {
    mode: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this._clearText = this._clearText.bind(this)
    this._handleSearchInput = this._handleSearchInput.bind(this)
  }

  _clearText() {
    console.log('clear search')
  }

  _handleSearchInput() {
    console.log('clear search')
  }

  render() {
    return (// Will remove the marginTop
      <View style={{backgroundColor: 'red', flex: 1, marginTop: 30}}>

      </View>
    );
  }
}

export default SearchTab;