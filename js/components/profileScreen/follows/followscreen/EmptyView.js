'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text,View  } from 'react-native';
import { noop } from 'lodash';

import searchIcon from '../../../../../images/icons/search-white.png';


import styles from '../../styles'

class EmptyView extends Component {

  static propTypes = {
    isMyProfile: React.PropTypes.bool,
    name: React.PropTypes.string,
    onFindInterestingPeopleButtonPress: React.PropTypes.func,
  };

  static defaultProps = {
    isMyProfile: true,
    onFindInterestingPeopleButtonPress: noop
  };

  constructor(props) {
    super(props);
    this._renderFindPeopleView=this._renderFindPeopleView.bind(this);
  }

  _getText(isMyProfile, name) {
    if (isMyProfile) {
      return 'You are not following anyone';
    }
    return `${name} is not following anyone`
  }

  _renderFindPeopleView(isMyProfile) {
    if (isMyProfile) {
      return (
        <View>
          <Text style={{textAlign:'center'}}>
            Find Interesting People to Follow
          </Text>
          <View style={{flexDirection:'row', paddingTop: 15}}>
            <View style={{flex:3}} name="spacer"/>
            <TouchableOpacity style={[styles.addItemContainer,{justifyContent:'center',flex: 1}]}
                              onPress={this.props.onFindInterestingPeopleButtonPress}>
              <Image source={searchIcon} style={[styles.itemPic, styles.addItem]}/>
            </TouchableOpacity>
            <View style={{flex:3}} name="spacer"/>
          </View>
        </View>
      );
    }
  }


  render() {
    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <View style={{flex:1}} name="spacer"/>
        <View style={{flex:1}}>
          <Text style={{textAlign:'center'}}>
            {this._getText(this.props.isMyProfile, this.props.name)}
          </Text>
          {this._renderFindPeopleView(this.props.isMyProfile)}
        </View>
        <View style={{flex:1}} name="spacer"/>
      </View>
    );
  }
}

export default EmptyView

