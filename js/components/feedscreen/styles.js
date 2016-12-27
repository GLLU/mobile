const React = require('react-native');
const { StyleSheet, Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  navigationBar: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    paddingTop: 20,
    paddingBottom: 5,
    backgroundColor: '#f2f2f2'
  },
  btnProfile: {
    position: 'absolute',
    left: 5
  },
  btnCamera: {
    position: 'absolute',
    right: 5
  },
  btnImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  normalBtn: {
    fontSize: 24
  },
  wallet: {
    paddingTop: 10,
    marginTop: 5,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'normal',
    color: '#757575'
  },
  mainView: {
    flex: 1,
    position: 'absolute',
    top: 60,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF'
  },
  tab: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  filter: {
    backgroundColor: '#F5F5F5',
    paddingLeft: 5,
    paddingBottom: 10,
    height: 40
  },
  filterActions: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    paddingTop: 0,
    height: 0
  },
  filterActionsGrid: {
    backgroundColor: '#FFFFFF',
    height: 170
  },
  btnFilter: {
    position: 'absolute',
    left: 5
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
  TextlabelReset: {
    paddingTop: 8,
    textAlign: 'right',
    color: '#757575',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6
  },
  mainGrid: {
    backgroundColor: '#FFFFFF',
    height: deviceHeight,
    marginTop: -10
  },
  customTabBar: {
    backgroundColor: '#1DE9B6'
  },
  filterCategories: {
    height: 100
  },
  categoryItem: {
    width: 80,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 5
  },
  categoryItemTitle: {
    color: '#757575',
    fontSize: 13,
    textAlign: 'center'
  },
  categoryItemImage: {
    height: 100,
    width: 50,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  btncategoryItem: {
    height: 100,
    width: 50,
    alignSelf: 'center'
  },
  sliderFilters: {
    marginTop: 10
  }
});
