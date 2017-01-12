
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
  icons: {
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
    alignItems: 'flex-end',
      marginTop: 20
  },
  formGroup: {
    flex: 1,
    borderColor: 'transparent',
    paddingLeft: 0
  },
  label: {
    color: 'lightgrey',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 10,
    width: 100
  },
  addOpacity: {
      opacity: 0.8
  },
  formInput: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
    lineHeight: 20,
    marginTop: 10,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  formBtn: {
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: (Platform.OS === 'ios') ? 20 : 0,
    width: 280,
    height: 40,
    backgroundColor: '#ADADAD',
    borderRadius: 0,
    opacity: 0.8
  },
  validationPassed: {
      backgroundColor: MKColor.Teal,
      opacity: 1
  },
  instuctionsContainer: {
      flex: 1,
      marginTop: 20,
      paddingTop: 30,
      paddingLeft: 10,
      paddingRight: 10,
      bottom: 0,
      alignSelf: 'center'
  },
  instuctions: {
      width: 300,
      height: (Platform.OS === 'ios') ? 40 : 50,
      color: '#FFFFFF',
      opacity: 0.8,
      textAlign: 'center'
  },


});
