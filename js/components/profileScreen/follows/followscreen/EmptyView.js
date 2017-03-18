'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'native-base';

class EmptyView extends Component {

  static propTypes = {
    isMyProfile: React.PropTypes.bool,
    name: React.PropTypes.string,
  };

  static defaultProps = {
    isMyProfile: true
  };

  constructor(props) {
    super(props);
  }

  _getText(isMyProfile, name) {
    if (isMyProfile) {
      return 'You are not following anyone';
    }
    return `${name} is not following anyone`
  }


  render() {
    return (
      <View>
        <View style={{flex:1}} name="spacer"/>
        <Text style={{flex:1, textAlign:'center'}}>
          {this._getText(this.props.isMyProfile, this.props.name)}
        </Text>
        <View style={{flex:1}} name="spacer"/>
      </View>
    );
  }
}

export default EmptyView

