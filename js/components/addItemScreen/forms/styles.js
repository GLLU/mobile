const React = require('react-native');
const { StyleSheet } = React;

import FontSizeCalculator from './../../../calculators/FontSize';

export const ITEM_WIDTH = 80;

export default StyleSheet.create({
  gridInput: {
    backgroundColor: '#FFFFFF',
    padding: 10
  },
  smallTextInput: {
    fontFamily: 'Montserrat-Regular',
    color: '#a6a6a6',
    fontWeight: '300',
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
  titleLabelInfo: {
    fontFamily: 'Montserrat-Regular',
    fontSize: new FontSizeCalculator(15).getSize(),
    color: '#7f7f7f',
    fontWeight: '300',
    marginBottom: 8
  },
  editAboutMeContainer: {
    minHeight: 80,
    backgroundColor: 'white',
  },
  editAboutMeInput: {
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    padding: 10,
    textAlign: 'left',
    borderColor: 'lightgrey'
  },
});
