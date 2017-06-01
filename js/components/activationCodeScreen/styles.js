
const React = require('react-native');
import { Platform } from 'react-native';
const { StyleSheet, Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
import ExtraDimensions from 'react-native-extra-dimensions-android';
import FontSizeCalculator from './../../calculators/FontSize';

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
    fontSize: new FontSizeCalculator(12).getSize(),
    fontWeight: 'normal',
  },
  link: {
    color: 'white',
    fontSize: new FontSizeCalculator(12).getSize(),
    fontWeight: 'normal',

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
    marginLeft: 80,
    marginRight: 80,
    borderBottomWidth: 4,
    borderColor: 'white',
    paddingLeft: 0,
    alignItems: 'flex-end'
  },
  formItemGetCode: {

    borderColor: 'rgba(192,192,192, .3)',
  },
  formItemGetCodeCorrect: {
    borderBottomWidth: 4,
    borderColor: 'rgba(255,61,61, .3)',
  },
  formGroup: {
    borderColor: 'transparent',
    alignItems: 'flex-end',
    paddingLeft: 0
  },
  label: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 20,
    width: 100
  },
  addOpacity: {
    opacity: 0.8
  },
  formInput: {
    paddingLeft: 20,
    lineHeight: 20,
    marginTop: (Platform.OS === 'ios') ? 22 : 0,
    alignItems: 'stretch',
    color: '#FFFFFF',
    textAlign: 'center',
    top: (Platform.OS === 'ios') ? 5 : 13,
  },
  formInputGetCode: {
    paddingLeft: 20,
    lineHeight: 20,
    marginTop: (Platform.OS === 'ios') ? 10 : 0,
    alignItems: 'stretch',
    color: '#FFFFFF',
    textAlign: 'left',
    top: (Platform.OS === 'ios') ? 5 : 13
  },
  formBtn: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: (Platform.OS === 'ios') ? 20 : 10,
    width: 280,
    height: 40,
    backgroundColor: '#ADADAD',
    borderRadius: 0,
    opacity: 1
  },
  validationPassed: {
    backgroundColor: '#009688'
  },
  errorText: {
    color: 'orange',
    textAlign: 'center',
    fontSize: 12
  },
  errorContainer: {
    flexDirection: 'column'
  },
  centerBox: {
    alignSelf: 'center',
    flexDirection:'row',
  },
  alreadyTxt: {
    color: '#FFFFFF',
    fontSize: 13,
    opacity: 1
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
  invitationText: {
    color: 'white'
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
