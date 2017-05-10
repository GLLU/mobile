'use strict';

import React, { Component } from 'react';
import { View,ListView, Image, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import {  Icon } from 'native-base';
import { noop } from 'lodash'
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
const {popRoute} = actions;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
    height: 100

  },
  row: {
    flexDirection: 'row'
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0
  },
  column: {
    flexDirection: 'column'
  },
  backBtn: {
    color: 'black',
    alignSelf: 'center',
  },
  backBtnContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.5)'
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
      <View style={[styles.container, styles.column]}>
        <View style={[styles.header, styles.row]}>
          <View style={{flex: 1}} name="spacer"/>
          <View style={{flex: 3}}>
          <TouchableOpacity style={styles.backBtnContainer}
                            onPress={this.props.onBackNavigationPress}>
            <Icon style={styles.backBtn} name="ios-arrow-back"/>
          </TouchableOpacity>
          </View>
          <View style={{flex: 24}} name="spacer"/>
          <TouchableOpacity style={{flex: 4, justifyContent: 'center', flexDirection: 'row'}}
                            onPress={this.props.onProfileAvatarPress}>
            <Image source={this.props.avatar} style={styles.avatar} name="ios-arrow-back"/>
          </TouchableOpacity>
          <View style={{flex: 1}} name="spacer"/>
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

