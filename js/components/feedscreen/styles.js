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
  searchBar: {
    position: 'relative',
    height: 60,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchInputGroup: {
    borderBottomWidth: 0,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  searchInput: {
    borderLeftWidth: 1,
    backgroundColor: 'white',
    borderLeftColor: 'black',
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 18,
    fontWeight: '800'
  },
  searchInputBorder: {
    borderRightWidth: 2,
    borderColor: '#7F7F7F',
    height: 30,
    marginLeft: 10
  },
  
  tab: {
    backgroundColor: '#FFFFFF'
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
