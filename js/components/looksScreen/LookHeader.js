'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { View, Icon } from 'native-base';
import { noop } from 'lodash'
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
const {popRoute} = actions;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.os === 'ios' ? 30 : 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: Platform.os === 'ios' ? 80 : 70,
  },
  row: {
    flexDirection: 'row'
  },
  header: {
    flex: 0.5
  },
  column: {
    flexDirection: 'column'
  },
  backBtn: {
    color: 'black',
    backgroundColor: 'transparent',
    alignSelf: 'center'
  },
  avatar: {
    alignSelf: 'center',
    height: 40,
    width: 40,
    borderRadius: 20
  },
});

class LookHeader extends Component {

  static propTypes = {
    avatar: React.PropTypes.object,
    onBackNavigationPress: React.PropTypes.func,
    onProfileAvatarPress: React.PropTypes.func,
  };

  static defaultProps = {
    avatar: {uri: ''},
    onBackNavigationPress: noop,
    onProfileAvatarPress: noop
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container,styles.column]}>
        <View style={[styles.header,styles.row]}>
          <TouchableOpacity style={{flex:1, justifyContent:'center', flexDirection:'row'}}
                            onPress={this.props.onBackNavigationPress}>
            <Icon style={styles.backBtn} name="ios-arrow-back"/>
          </TouchableOpacity>
          <View style={{flex:12}} name="spacer"/>
          <TouchableOpacity style={{flex:2, justifyContent:'center', flexDirection:'row'}}
                            onPress={this.props.onProfileAvatarPress}>
            <Image source={this.props.avatar} style={styles.avatar} name="ios-arrow-back"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key))
  };
}

const mapStateToProps = state => {
  return {
    navigation: state.cardNavigation
  };
};


export default connect(mapStateToProps, bindAction)(LookHeader);

