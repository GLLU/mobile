'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { View, Icon } from 'native-base';
import { noop } from 'lodash';

import addItemIcon from '../../../../../images/icons/plus.png';

import styles from '../../styles'

class EmptyView extends Component {

  static propTypes = {
    isMyProfile: React.PropTypes.bool,
    name: React.PropTypes.string,
    onUploadButtonPress: React.PropTypes.func,
  };

  static defaultProps = {
    isMyProfile: true,
    onUploadButtonPress: noop
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
          <View style={{flexDirection:'row', paddingTop: 15}}>
            <View style={{flex:3}} name="spacer"/>
            <TouchableOpacity style={[styles.addItemContainer,{justifyContent:'center',flex: 1}]}
                              onPress={this.props.onUploadButtonPress}>
              <Image source={addItemIcon} style={[styles.itemPic, styles.addItem]}/>
            </TouchableOpacity>
            <View style={{flex:3}} name="spacer"/>
          </View>
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

