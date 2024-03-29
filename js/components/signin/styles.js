
const React = require('react-native');
import { Platform } from 'react-native';
const { StyleSheet, Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;

import ExtraDimensions from 'react-native-extra-dimensions-android';
import FontSizeCalculator from './../../calculators/FontSize';
import Fonts from '../../styles/Fonts.styles';
import Colors from '../../styles/Colors.styles';
import { generateAdjustedSize } from '../../utils/AdjustabaleContent';

module.exports = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    flex:1,
    flexDirection:'row',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '300',
    fontFamily: 'Times New Roman',
    color: '#FFFFFF',
    textAlign: 'left'
  },
  headerArrow: {
    color: '#FFFFFF'
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: deviceHeight - ExtraDimensions.get('STATUS_BAR_HEIGHT')
  },
  shadow: {
    flex: 1,
    width: null,
    height: null
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  bgShadow: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0
  },
  uploadImgContainer: {
    marginTop: 15,
    alignSelf: 'center',
    marginBottom: 15
  },
  text: {
    color: '#E0E0E0',
    fontSize: new FontSizeCalculator(14).getSize(),
    fontWeight: 'normal',
    fontFamily: Fonts.contentFont,
  },
  link: {
    color: Colors.white,
    fontSize: new FontSizeCalculator(14).getSize(),
    fontWeight: 'normal',
    fontFamily: Fonts.contentFont,

  },
  clickHere: {
    color: Colors.darkGreen,
    fontSize: generateAdjustedSize(13),
    paddingLeft: 5,
    fontFamily: Fonts.contentFont,
  },
  uploadImgBtn: {
   borderRadius: 50,
   backgroundColor: '#FFFFFF',
   height: 100,
   width: 100
  },
  uploadImgIcon: {
    backgroundColor: 'transparent',
    marginBottom: 5
  },
  formItem: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 2,
    borderColor: 'rgba(192,192,192, .3)',
    height: 50,
    paddingLeft: 0,
    alignItems: 'flex-end'
  },
  formGroup: {
    flex: 1,
    borderColor: 'transparent',
    alignItems: 'flex-end',
    paddingLeft: 0
  },
  label: {
    color: 'lightgrey',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 20,
    width: 100
  },
  addOpacity: {
    opacity: 0.8
  },
  formInput: {
    flex: 1,
    fontSize: generateAdjustedSize(18),
    paddingLeft: 20,
    lineHeight: 20,
    marginTop: (Platform.OS === 'ios') ? 22 : 0,
    fontFamily: Fonts.contentFont,
    alignItems: 'stretch',
    color: Colors.white,
    marginLeft: 10,
    top: (Platform.OS === 'ios') ? 0 : 13,
  },
  formBtn: {
    alignSelf: 'center',
    marginTop: 70,
    marginBottom: (Platform.OS === 'ios') ? 20 : 10,
    width: 280,
    height: 40,
    backgroundColor: '#6f9689',
    borderRadius: 0,
    opacity: 0.8
  },
  validationPassed: {
    backgroundColor: '#009688'
  },
  alreadyBox: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
  },
  alreadyTxt: {
    color: Colors.white,
    fontFamily: Fonts.contentFont,
    fontSize: generateAdjustedSize(16),
    opacity: 0.8
  },
  alreadyBtn: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 5,
    alignItems: 'flex-start',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    paddingTop: (Platform.OS === 'ios') ? 2 : 7,
  },
  logoContainer: {
    flex: 1,
    marginTop: 0,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    bottom: 0,
    alignSelf: 'center'
  },
  logo: {
      flex: 1,
      width: 175,
      height: 175,
      resizeMode: 'contain',
  },
  withouthF: {
    flex: 1,
    flexDirection: 'row',
    width: 300
  },
  bottomContainerContent: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginBottom: 15,
    opacity: 0.8,
    flexDirection: 'row',
  },
});
