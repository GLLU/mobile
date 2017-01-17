
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
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(192,192,192, .4)',
    height: deviceHeight
  },
  bgShadow: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0
  }
});
