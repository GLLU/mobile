
const React = require('react-native');
import { Platform } from 'react-native';
const { StyleSheet, Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const MK = require('react-native-material-kit');

const {
    MKColor,
} = MK;

module.exports = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '300',
    fontFamily: 'Times New Roman',
    color: '#FFFFFF',
    textAlign: 'center'
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
    height: deviceHeight
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
    marginBottom: 10
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
    height: 55,
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
    width: 100,
  },
  addOpacity: {
      opacity: 0.8
  },
  confirmPass: {
    paddingBottom: 10
  },
  genderSelectContainer:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formInput: {
    flex: 1,
    paddingLeft: 20,
    lineHeight: 20,
    marginTop: 17,
    alignItems: 'stretch',
    color: '#FFFFFF',
    marginLeft: 10,

  },
  formBtn: {
    alignSelf: 'center',
    marginTop: 70,
    marginBottom: (Platform.OS === 'ios') ? 20 : 10,
    width: 280,
    height: 40,
    backgroundColor: '#ADADAD',
    borderRadius: 0,
    opacity: 0.8
  },
  validationPassed: {
    backgroundColor: MKColor.Teal
  },
  countrySelectView: {
    flex:1,
  },
  countrySelectInput: {
    padding:10,
    height:40,
    color: '#FFFFFF',
    paddingLeft: 20,
    marginLeft: 10
  },
  alreadyBox: {
    alignSelf: 'center',
    flexDirection:'row',
  },
  alreadyTxt: {
    color: '#FFFFFF',
    fontSize: 16,
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
      paddingTop: (Platform.OS === 'ios') ? 0 : 5,
  },
  genderBtnContainer:{
      flex: 1,
      alignItems: 'center',
      marginTop: deviceHeight/4
  },
  genderImage:{
      width: 130,
      height: 130,
      borderRadius: 65
  },
  genderLabel:{
      color: '#FFFFFF',
      alignSelf: 'center',
      marginTop: 15,
      opacity: 0.8
  },

});
