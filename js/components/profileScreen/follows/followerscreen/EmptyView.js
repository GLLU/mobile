'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { View, Icon } from 'native-base';

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
      return 'You have no followers yet';
    }
    return `${name} has no followers yet`
  }

  _renderUploadSomethingView(isMyProfile) {
    if (isMyProfile) {
      return (
        <View>
          <Text style={{textAlign:'center'}}>
            Upload a look and get some followers
          </Text>
        </View>
      );
    }
  }


  render() {
    return (
      <View>
        <View style={{flex:1}} name="spacer"/>
        <View style={{flex:1}}>
          <Text style={{textAlign:'center'}}>
            {this._getText(this.props.isMyProfile, this.props.name)}
          </Text>
          {this._renderUploadSomethingView(this.props.isMyProfile)}
        </View>
        <Text style={{flex:1, textAlign:'center'}}>

        </Text>
        <View style={{flex:1}} name="spacer"/>
      </View>
    );
  }
}

export default EmptyView

