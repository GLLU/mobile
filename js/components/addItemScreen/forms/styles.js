const React = require('react-native');
const { StyleSheet, Dimensions } = React;

import FontSizeCalculator from './../../../calculators/FontSize';

const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  container: {
    height: 220,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    marginBottom: 20
  },
  categoriesContainer: {
    flex: 1,
    padding: 10
  },
  categoryItem: {
    width: (deviceWidth - 40) / 5,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 5
  },
  categoryItemTitle: {
    color: '#333333',
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  categoryItemSelectedTitle: {
    color: '#1DE9B6',
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  categoryItemImage: {
    height: 100,
    width: 50,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  categoryItemSelectedImage: {
    height: 110,
    width: 55,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  btncategoryItem: {
    height: 100,
    width: 50,
    alignSelf: 'center'
  },
  descContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 50,
    width: deviceWidth - 40,
    backgroundColor: 'black'
  },
  textDesc: {
    color: '#BDBDBD',
    textAlign: 'left',
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: '500',
    padding: 15
  },
  triangleContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    height: 15,
    width: deviceWidth - 40,
    backgroundColor: 'transparent'
  },
  blankItem: {
    width: ((deviceWidth - 40) / 5) * 2 + 20
  },
  textInput: {
    width: deviceWidth - 40,
    height: 50,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  autocompleteContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  inputContainerStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    padding: 5
  },
  itemText: {
    fontSize: new FontSizeCalculator(15).getSize(),
    margin: 2
  },
  listStyle: {
    height: 160,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: '#F5F5F5'
  },
  resultItem: {
    height: 40,
    borderWidth: 0,
    borderTopWidth: 1,
    borderColor: '#EEEEEE',
    padding: 10,
    backgroundColor: 'transparent'
  },
  autocompleteResults: {
  },
  btnCreateNew: {
    backgroundColor: '#FFFFFF'
  },
  btnCreateNewText: {
    color: '#1DE9B6',
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: '500',
  },
  btnContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderTopWidth: 0
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3
  },
  inputSelected: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3,
    fontWeight: 'bold'
  },
  iconCheckCompleteContainer: {
    position: 'absolute',
    right: -10,
    top: 10,
    width: 50,
    backgroundColor: 'transparent'
  },
  iconCheckComplete: {
    color: '#1DE9B6'
  }
});
