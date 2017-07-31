'use strict';

import React, {Component} from 'react';
import {ListView, Image, TouchableOpacity, Text, View} from 'react-native';
import UserActionRow from "../common/lists/UserActionRow";
import ListScreen from "../common/lists/ListScreen";

class SearchScreen extends Component {

  static propTypes = {
    mode: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{backgroundColor: 'red'}}></View>
    );
  }
}

export default SearchScreen;