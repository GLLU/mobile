const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create({
  typeContainer: {
    position: 'absolute',
    height: 40,
    width: 40,
    top: 4,
    left: 0,
    padding: 4,
    justifyContent: 'center',
    backgroundColor: '#05d7b2'
  },
  typeImage: {
    top: 8,
    width: 16,
    height: 16,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    alignSelf: 'center'
  },
  typeLabel: {
    top: 9,
    fontSize: 12,
    color: '#ffffff',
    alignSelf: 'center',
    textAlign: 'center'
  },
  tagsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent'
  },
  tagContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    height: 50
  },
  tagBgImage: {
    height: 40,
    width: 70,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  priceTagLabel: {
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    fontSize: 12,
    fontWeight: '500',
    alignSelf: 'center',
    paddingTop: 10
  }
});
