const React = require('react-native');
const { StyleSheet, Dimensions } = React;

import FontSizeCalculator from './../../calculators/FontSize';

let Window = Dimensions.get('window');

const deviceWidth = Window.width;
const deviceHeight = Window.height;

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  breadcrumb: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    paddingTop: 20,
    backgroundColor: '#F2F2F2'
  },
  headingLabel: {
    fontSize: new FontSizeCalculator(24).getSize(),
    fontFamily: 'Times New Roman',
    color: '#333333',
    paddingTop: 10,
    alignSelf: 'center'
  },
  btnBack: {
    position: 'absolute',
    left: 0
  },
  btnImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  normalBtn: {
    fontSize: new FontSizeCalculator(24).getSize()
  },
  mainView: {
    flex: 1,
    position: 'absolute',
    top: 60,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#F2F2F2'
  },
  contentContainerStyle: {
    height:            700,
    alignItems:        'stretch',
    backgroundColor:   '#F0F8FF',
    justifyContent:    'space-around',
    paddingHorizontal: 15
  },
  stepsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  customTabBar: {
    backgroundColor: 'transparent',
    flex: 1
  },
  btnSteps: {
    width: 40,
    height: 40,
    borderColor: '#BDBDBD',
    borderWidth: 2
  },
  stepsLabel: {
    textAlign: 'center',
    color: '#BDBDBD',
    fontWeight: '500',
    fontFamily: 'Times New Roman'
  },
  stepsLine: {
    flex: 1,
    position: 'absolute',
    top: 20,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#BDBDBD',
    height: 2,
    marginLeft: 40,
    marginRight: 40
  },
  stepsTab: {
    marginTop: 40,
    marginBottom: 10
  },
  mainTab: {
    backgroundColor: 'transparent'
  },
  imageViewImage: {
    height: (deviceHeight * (deviceWidth - 140)) / deviceWidth,
    width: deviceWidth - 100,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 10,
    borderColor: '#FFFFFF'
  },
  itemInfoView: {
    backgroundColor: 'transparent',
    padding: 20
  },
  titleLabelInfo: {
    color: '#757575',
    fontWeight: '400',
    marginBottom: 8
  },
  textInput: {
    width: deviceWidth - 40,
    height: 50,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  textHalfInput: {
    width: deviceWidth / 2 - 30,
    height: 50,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  selectOptions: {
    backgroundColor: 'transparent'
  },
  arrowSelect: {
    color: '#BDBDBD',
    fontSize: new FontSizeCalculator(18).getSize(),
    paddingTop: 10
  },
  fakeBtnContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    paddingTop: 5,
    height: 50,
  },
  flagSelectOptions: {
    width: 40,
    height: 30,
    marginLeft: 10,
    marginTop: 5,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  btnTagAnother: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#333333',
    height: 50,
    width: deviceWidth / 2 - 28,
    borderRadius: 0
  },
  btnContinue: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#1DE9B6',
    height: 50,
    width: deviceWidth / 2 - 28,
    borderRadius: 0
  },
  textBtn: {
    fontWeight: '500',
    fontSize: new FontSizeCalculator(18).getSize(),
    color: '#FFFFFF',
    alignSelf: 'center'
  },
  headinSharing: {
    fontSize: new FontSizeCalculator(20).getSize(),
    fontWeight: '500',
    marginTop: 15,
    paddingTop: 20
  },
  legendLabel: {
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: '500',
    paddingTop: 8
  },
  containerStyle: {
  },
  labelStyle: {
    flex: 1
  },
  checkboxStyle: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderColor: '#BDBDBD',
    borderRadius: 13,
  },
  checkboxLabelStyle: {
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: '500',
    paddingTop: 15
  },
  actionsContainer: {
    flex: 1,
    width: deviceWidth,
    height: 100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent',
    padding: 20,
    paddingBottom: 0
  },
  tagBgImage: {
    height: 50,
    width: 100,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  tagsContainer: {
    flex    : 1,
    height: (deviceHeight * (deviceWidth - 140)) / deviceWidth,
    width: deviceWidth - 100,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 10,
    borderColor: '#FFFFFF'
  },
  text        : {
    marginTop   : 25,
    marginLeft  : 5,
    marginRight : 5,
    textAlign   : 'center',
    color       : '#fff'
  },
  draggableContainer: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  btnAddMorePhoto: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 0
  },
  btnWithImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },
  morePhotoItem: {
    width: 50,
    height: 50,
    alignSelf: 'center'
  },
  describe: {
    flex: 1,
    height: 100,
    fontSize: new FontSizeCalculator(18).getSize(),
    fontFamily: 'Times New Roman',
    color: '#9E9E9E',
    marginVertical:6,
    backgroundColor: '#FFFFFF',
    padding: 10
  },
  btnGoToStep3: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#1DE9B6',
    height: 45,
    width: (deviceWidth / 8) * 6,
    borderRadius: 0,
    alignSelf: 'center'
  },
  btnGoToStep3Text: {
    color: '#FFFFFF',
    fontSize: new FontSizeCalculator(18).getSize(),
    fontWeight: '500',
    textAlign: 'center'
  },
  confirmText: {
    flex: 1,
    height: 120,
    fontSize: new FontSizeCalculator(15).getSize(),
    fontFamily: 'Times New Roman',
    color: '#333333',
    marginVertical:6,
    backgroundColor: 'transparent',
    padding: 2
  },
  gridInput: {
    backgroundColor: '#FFFFFF',
    padding: 10
  },
  smallTextInput: {
    color: '#757575',
    fontWeight: '400',
    fontSize: new FontSizeCalculator(13).getSize(),
    marginTop: 10,
  },
  normalIconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 5
  },
  fakeCheckbox: {
    width: 25,
    height: 25,
    marginTop: 10,
    backgroundColor: 'transparent'
  },
  tagTextContainer: {
    height: 30,
    padding: 5,
    margin: 10,
    marginLeft: 0,
    backgroundColor: 'black',
    borderRadius: 5
  },
  tagRemove: {
    margin: 0,
    padding: 0,
    width: 30,
    height: 30,
    backgroundColor: 'transparent'
  },
  tagRemoveText: {
    textAlign: 'center',
    color: '#FFFFFF',
    position: 'absolute',
    right: 5,
    top: 0,
    fontSize: new FontSizeCalculator(15).getSize(),
  }
});
