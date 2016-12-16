const React = require('react-native');
const { StyleSheet, Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: deviceHeight
  },
  navigationBar: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    paddingTop: 15,
    backgroundColor: '#FFFFFF'
  },
  btnProfile: {
    position: 'absolute',
    left: 5
  },
  btnCamera: {
    position: 'absolute',
    right: 5
  },
  normalBtn: {
    fontSize: 24
  },
  wallet: {
    paddingTop: 10,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'normal',
    color: '#757575'
  },
  mainView: {
    flex: 1,
    position: 'absolute',
    top: 45,
    bottom: 0,
    left: 0,
    right: 0,
    height: deviceHeight,
    paddingTop: 15,
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
    paddingTop: 10,
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'normal',
    color: '#212121'
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
    marginTop: 10,
    paddingBottom: 10,
    paddingTop: 10,
    height: deviceHeight
  },
  cardItem: {
    padding: 0,
    paddingBottom: 10
  },
  customTabBar: {
    backgroundColor: '#1DE9B6'
  },
  filterCategories: {
    height: 100
  },
  categoryItem: {
    width: 100,
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
