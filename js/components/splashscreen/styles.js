
import React , { Platform } from 'react-native';
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
    bottom: 0
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
    flex: 1,
    marginTop: 0,
    paddingTop: 80,
    paddingLeft: 10,
    paddingRight: 10,
    bottom: 0,
    alignSelf: 'center'
  },
  logo: {
    flex: 1,
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  titleHeading: {
    fontSize: 32,
    fontWeight: '300',
    fontFamily: 'Times New Roman',
    color: '#FFFFFF',
    marginTop: 20,
    paddingTop: 20,
    textAlign: 'center'
  },
  signupContainer: {
    flex: 1,
    marginTop: 0,
    paddingTop: (Platform.OS === 'ios') ? 120 : 80,
    paddingLeft: 10,
    paddingRight: 10,
    bottom: 0,
    alignSelf: 'center',
  },
  label: {
    textAlign: 'center',
    color: 'white',
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
    marginBottom: 20,
    fontSize: 15,
    fontWeight: 'bold',
  },
  iconButton: {
    textAlign: 'left'
  },
  btnFB: {
    marginTop: 0,
    height: 40,
    backgroundColor: '#1565C0',
    alignSelf: 'center',
    borderRadius: 0
  },
  btnContent: {
    color: 'white',
    fontSize: 15
  },
  bottomContainer: {
    marginBottom: 30,
    alignSelf: 'center'
  },
  bottomContainerContent: {
    color: '#E0E0E0',
    fontSize: 15,
    fontWeight: 'normal'
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
});
