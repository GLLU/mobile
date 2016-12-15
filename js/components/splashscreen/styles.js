
const React = require('react-native');
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
  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
  logoContainer: {
    flex: 1,
    marginTop: 0,
    paddingTop: 120,
    paddingLeft: 10,
    paddingRight: 10,
    bottom: 0,
    alignSelf: 'center'
  },
  logo: {
    flex: 1,
    width: 220,
    height: 220
  },
  signupContainer: {
    flex: 1,
    marginTop: 0,
    paddingTop: 120,
    paddingLeft: 10,
    paddingRight: 10,
    bottom: 0,
    alignSelf: 'center',
  },
  label: {
    textAlign: 'center',
    color: 'white',
    marginTop: 20, marginBottom: 20,
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
    marginTop: 20,
    alignSelf: 'center'
  },
  bottomContainerContent: {
    color: '#E0E0E0',
    fontSize: 15,
    fontWeight: 'normal'
  }
});
