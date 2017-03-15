
import React , { Platform } from 'react-native';
const { StyleSheet, Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import ExtraDimensions from 'react-native-extra-dimensions-android';
import FontSizeCalculator from './../../calculators/FontSize';

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
    flex: 0.3,
    marginTop: 0,
    paddingTop: 80,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center',
    justifyContent: 'flex-start'
  },
  logo: {
    width: 175,
    height: 175,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  titleHeading: {
    fontSize: 32,
    fontWeight: '300',
    fontFamily: 'Times New Roman',
    color: '#FFFFFF',
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
    paddingTop: 20,
    textAlign: 'center'
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
  btnFB: {
    marginTop: 0,
    paddingTop: 2,
    paddingBottom: 2,
    alignSelf: 'center',
    borderRadius: 0,

  },
  fbIcon: {
    justifyContent: 'center'
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
    fontSize: new FontSizeCalculator(12).getSize(),
    fontWeight: 'normal',
  },
  link: {
    color: 'white',
    fontSize: new FontSizeCalculator(12).getSize(),
    fontWeight: 'normal',

  },
  alreadyBox: {
      alignSelf: 'center',
      flexDirection:'row',
      height: 25,
      marginTop: 5
  },
  alreadyTxt: {
      color: '#FFFFFF',
      fontSize: 13,
      opacity: 1,
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
});
