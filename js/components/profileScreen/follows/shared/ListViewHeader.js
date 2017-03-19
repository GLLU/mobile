'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { View, Icon } from 'native-base';
import * as _ from 'lodash'
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
const {popRoute} = actions;
import FontSizeCalculator from './../../../../calculators/FontSize';

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#f2f2f2',
    height:60
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
  followsTitle: {
    fontSize: new FontSizeCalculator(26).getSize(),
    color: 'black',
    fontFamily: 'Times New Roman',
    flex: 9,
    textAlign: 'center'
  },
  followsCount: {
    fontSize: new FontSizeCalculator(26).getSize(),
    fontWeight: 'bold',
    color: '#00D7B2',
    textAlign: 'right',
    flex: 2,
  },
  backBtn: {
    color: 'black',
    backgroundColor: 'transparent'
  },
});

class ListViewHeader extends Component {

  static propTypes = {
    title: React.PropTypes.string,
    count: React.PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.popRoute = this.popRoute.bind(this);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    return (
      <View style={[styles.container,styles.column]}>
        <View style={[styles.header,styles.row]}>
          <View style={{flex:0.5}} name="spacer"/>
          <TouchableOpacity style={{flex:1}} onPress={() => this.popRoute()}>
            <Icon style={styles.backBtn} name="ios-arrow-back"/>
          </TouchableOpacity>
          <Text style={styles.followsTitle}>{_.startCase(this.props.title)}</Text>
          <Text style={styles.followsCount}>{this.props.count}</Text>
          <View style={{flex:0.5}} name="spacer"/>
        </View>
        {/*{search will come here}*/}
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


export default connect(mapStateToProps, bindAction)(ListViewHeader);

