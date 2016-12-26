const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create({
  likeContainer: {
    height: 30,
    width: 80,
    paddingRight: 5,
    paddingBottom: 6,
    backgroundColor: 'transparent',
  },
  bgShadow: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 80,
    height: 30
  },
  iconWithImage: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  countLikeLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 8
  },
  typeContainer: {
    position: 'absolute',
    height: 50,
    width: 50,
    top: 4,
    left: 0,
    paddingTop: 15,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#05d7b2'
  },
  typeImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    alignSelf: 'center'
  },
  typeLabel: {
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
    fontSize: 13,
    fontWeight: '500',
    alignSelf: 'center',
    paddingTop: 10
  }
});
