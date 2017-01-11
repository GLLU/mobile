const React = require('react-native');
const { StyleSheet } = React;

import FontSizeCalculator from './../../../calculators/FontSize';

module.exports = StyleSheet.create({
  gridInput: {
    backgroundColor: '#FFFFFF',
    padding: 10
  },
  smallTextInput: {
    color: '#757575',
    fontWeight: '400',
    fontSize: new FontSizeCalculator(13).getSize(),
    marginTop: 10,
  },
  normalIconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 5
  },
  flagSelectOptions: {
    width: 40,
    height: 30,
    marginLeft: 10,
    marginTop: 5,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
});
