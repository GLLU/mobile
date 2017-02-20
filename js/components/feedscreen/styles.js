const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;
const deviceHeight = Dimensions.get('window').height;
const MK = require('react-native-material-kit');

const {
  MKColor,
} = MK;

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  navigationBar: {
    position: 'relative',
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
    paddingTop: (Platform.OS === 'ios' ? 10 : 0),
    marginTop: 5,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'normal',
    color: '#757575'
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
  mainView: {
    flex: 1,
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF'
  },
  tab: {
    backgroundColor: '#FFFFFF'
  },
  filter: {
    backgroundColor: '#F5F5F5',
    paddingLeft: 5,
    paddingBottom: 10,
    height: 45,
  },
  filterActions: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    paddingTop: 0,
    height: 0,
    marginBottom: 10,
    flex: 1,

  },
  filterActionsGrid: {
    backgroundColor: '#FFFFFF',

  },
  radioView: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    flex: 1,
  },
  radioOption: { // the box
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
  },
  radioOptionSelected: {
    borderBottomColor: MKColor.Teal,
    borderBottomWidth: 2,
  },
  radioBtnText: { //the text
    color: 'lightgrey',
    fontSize: 17,
    textAlign: 'center',
    paddingBottom: 5
  },
  radioBtnTextSelected: { //the text
    color: MKColor.Teal
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
  filterCategories: {
    flex: 1
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
    textAlign: 'center',
    height: 32
  },
  categoryItemImage: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  btncategoryItem: {
    height: 80,
    width: 50,
    alignSelf: 'center'
  },
  sliderFilters: {
    marginTop: 10
  },
});
