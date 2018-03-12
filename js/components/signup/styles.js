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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'left',
  },
  headerArrow: {
    color: '#FFFFFF',
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: deviceHeight - ExtraDimensions.get('STATUS_BAR_HEIGHT'),
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
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
    left: 0,
  },
  uploadImgContainer: {
    marginTop: 15,
    alignSelf: 'center',
    marginBottom: 10,
  },
  uploadImgBtn: {
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImgIcon: {
    backgroundColor: 'transparent',
    marginBottom: 5,
  },
  formItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formGroup: {
    flex: 1,
    borderColor: 'transparent',
    alignItems: 'flex-end',
    paddingLeft: 0,
  },
  label: {
    color: 'lightgrey',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 20,
    width: 100,
  },
  addOpacity: {
    opacity: 0.8,
  },
  confirmPass: {
    paddingBottom: 10,
  },
  genderSelectContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    bottom: 20,
  },
  formInput: {
    flex: 1,
    lineHeight: 18,
    height: generateAdjustedSize(45),
    fontSize: generateAdjustedSize(18),
    backgroundColor: 'transparent',
    alignItems: 'stretch',
    fontFamily: Fonts.contentFont,
    color: Colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  inputTitle: {
    color: Colors.lightGray,
    fontSize: 14,
    fontFamily: Fonts.contentFont,
  },
  formBtn: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: (Platform.OS === 'ios') ? 20 : 10,
    width: 280,
    height: 40,
    backgroundColor: '#ADADAD',
    borderRadius: 0,
    opacity: 0.8,
  },
  validationPassed: {
    backgroundColor: Colors.darkGreen,
  },
  alreadyBox: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  alreadyTxt: {
    color: Colors.white,
    fontFamily: Fonts.contentFont,
    fontSize: generateAdjustedSize(18),
    opacity: 0.8,
  },
  clickHere: {
    color: Colors.darkGreen,
    fontSize: generateAdjustedSize(16),
    paddingLeft: 5,
    fontFamily: Fonts.contentFont,
  },
  alreadyBtn: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 5,
    alignItems: 'flex-start',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    paddingTop: (Platform.OS === 'ios') ? 0 : 5,
  },
  genderBtnContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: deviceHeight / 4,
  },
  genderImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  genderLabel: {
    color: Colors.white,
    alignSelf: 'center',
    fontSize: generateAdjustedSize(18),
    marginTop: 15,
    opacity: 0.8,
    fontFamily: Fonts.regularFont,
  },
  bottomContainerContent: {
    justifyContent: 'center',
    marginBottom: 15,
    opacity: 0.8,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  text: {
    color: '#E0E0E0',
    fontSize: generateAdjustedSize(14),
    fontWeight: 'normal',
  },
  link: {
    color: Colors.white,
    fontSize: generateAdjustedSize(14),
    fontWeight: 'normal',

  },
});
