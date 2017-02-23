const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;
const deviceHeight = Dimensions.get('window').height;
const MK = require('react-native-material-kit');

const {
  MKColor,
} = MK;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  tab: {
    backgroundColor: '#FFFFFF'
  },
  Textlabel: {
    paddingTop: 0,
    fontSize: 15,
    fontWeight: 'normal',
    textAlign: 'left'
  },
  TextResults: {
    paddingTop: 12,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'normal',
    color: '#757575'
  },
  mainGrid: {
    backgroundColor: '#FFFFFF',
    height: deviceHeight,
    marginTop: -10
  },
  customTabBar: {
    backgroundColor: '#1DE9B6'
  },
  sliderFilters: {
    marginTop: 10
  },
});
