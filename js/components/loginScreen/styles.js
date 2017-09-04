import React, {Platform} from 'react-native';
const { StyleSheet, Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import ExtraDimensions from 'react-native-extra-dimensions-android';
import FontSizeCalculator from './../../calculators/FontSize';
import Fonts from '../../styles/Fonts.styles';
import Colors from '../../styles/Colors.styles';

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: deviceHeight
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    width: null,
    height: deviceHeight - ExtraDimensions.get('STATUS_BAR_HEIGHT')
  },
  shadow: {
    flex: 1,
    width: null,
    height: deviceHeight - ExtraDimensions.get('STATUS_BAR_HEIGHT')
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
  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
  logoContainer: {
    marginTop: 0,
    paddingTop: 80,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 175,
    height: 175,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  signupContainer: {
    flex: 0.1,
    marginTop: 0,
    paddingTop: (Platform.OS === 'ios') ? 20 : 20,
    paddingLeft: 10,
    paddingRight: 10,
    bottom: 10,
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },
  label: {
    textAlign: 'center',
    color: 'white',
    marginTop: (Platform.OS === 'ios') ? 25 : 10,
    marginBottom: (Platform.OS === 'ios') ? 25 : 15,
    fontSize: 15,
    fontWeight: 'bold',
  },
  iconButton: {
    textAlign: 'left'
  },
  btnSocial: {
    marginTop: 0,
    paddingTop: 2,
    paddingBottom: 2,
    alignSelf: 'center',
    borderRadius: 0,

  },
  socialIcon: {
    justifyContent: 'center',
  },
  btnContent: {
    color: 'white',
    fontSize: 15
  },
  bottomContainer: {
    marginBottom: 30,
    alignSelf: 'center'
  },
  allView: {
    flex: 1,
    height: deviceHeight - ExtraDimensions.get('STATUS_BAR_HEIGHT'),
    width: deviceWidth
  },
  bottomContainerContent: {
    justifyContent: 'center',
    marginBottom: 15,
    opacity: 0.8,
    flexDirection: 'row',
  },
  text: {
    color: '#E0E0E0',
    fontSize: new FontSizeCalculator(14).getSize(),
    fontFamily: Fonts.contentFont,
  },
  link: {
    color: Colors.white,
    fontSize: new FontSizeCalculator(14).getSize(),
    fontWeight: 'normal',
    fontFamily: Fonts.contentFont,

  },
  alreadyBox: {
    alignSelf: 'center',
    flexDirection: 'row',
    height: 25,
    marginTop: 5,
  },
  alreadyTxt: {
    color: Colors.white,
    fontFamily: Fonts.contentFont,
    fontSize: 16,
    opacity: 1,
  },
  loginTxt: {
    color: Colors.darkGreen,
    fontSize: 16,
    paddingLeft: 5,
    fontFamily: Fonts.contentFont,
  },
  alreadyBtn: {
    backgroundColor: 'transparent',
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'flex-start',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    paddingTop: (Platform.OS === 'ios') ? 1 : 7,
  },
  modalWarp: {
    flex: 1,
    position: 'absolute',
    top: 0,
    backgroundColor: '#f7f7fa',
    height: deviceHeight,
    width: deviceWidth
  },
  keyboardStyle: {
    flex: 1,
  },
  contentWarp: {
    height: deviceHeight,
    width: deviceWidth,
    marginTop: Platform.OS === 'ios' ? 30 : 0,
    backgroundColor: '#fff',
    alignSelf: 'center',
    flex: 1
  },
  btnStyle: {
    position: 'absolute',
    top: 12.5,
    right: 8,
  },
  closeStyle: {
    backgroundColor: Colors.transparent,
    color: Colors.white
  }
});
