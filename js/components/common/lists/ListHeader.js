'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text, Platform, View } from 'react-native';
import { Icon } from 'native-base';
import * as _ from 'lodash'
import FontSizeCalculator from '../../../calculators/FontSize';
import Fonts from '../../../styles/Fonts.styles';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 12,
    paddingBottom: 12,
    backgroundColor: '#f2f2f2',
    height: 60,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flex: 0.5,
  },
  column: {
    flexDirection: 'column',
  },
  followsTitle: {
    fontSize: new FontSizeCalculator(18).getSize(),
    color: 'black',
    fontFamily: Fonts.regularFont,
    flex: 9,
    textAlign: 'center',
  },
  followsCount: {
    fontSize: new FontSizeCalculator(18).getSize(),
    fontFamily: Fonts.regularFont,
    fontWeight: 'bold',
    color: '#00D7B2',
    textAlign: 'right',
    flex: 2,
  },
  backBtn: {
    color: 'black',
    backgroundColor: 'transparent',
  },
});

class ListViewHeader extends Component {

  static propTypes = {
    title: React.PropTypes.string,
    count: React.PropTypes.number,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, styles.column]}>
        <View style={[styles.header, styles.row]}>
          <View style={{flex: 0.5}} name="spacer"/>
          <TouchableOpacity style={{flex: 2}} onPress={this.props.goBack}>
            <Icon style={StyleSheet.flatten(styles.backBtn)} name="ios-arrow-back"/>
          </TouchableOpacity>
          <Text style={styles.followsTitle}>{_.startCase(this.props.title)}</Text>
          <Text style={styles.followsCount}>{this.props.count ? this.props.count : ' '}</Text>
          <View style={{flex: 0.5}} name="spacer"/>
        </View>
      </View>
    );
  }
}

export default ListViewHeader;

