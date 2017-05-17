
const React = require('react-native');
import { Platform } from 'react-native';
const { StyleSheet, Dimensions } = React;
const deviceWidth = Dimensions.get('window').width;
import ExtraDimensions from 'react-native-extra-dimensions-android';
import FontSizeCalculator from './../../calculators/FontSize';

module.exports = StyleSheet.create({
  topBtns: {
    backgroundColor: '#009688',
    width: deviceWidth/2,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 50,
    borderRadius: 10
  },
  pagingBtn: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 22
  },
  backBtn: {
    backgroundColor: '#009688',
    width: 30,
    height: 30,
    alignItems: 'center',
    borderRadius: 15
  }
});
