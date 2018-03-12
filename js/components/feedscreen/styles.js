const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;
const deviceHeight = Dimensions.get('window').height;
import FontSizeCalculator from './../../calculators/FontSize';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Colors from '../../styles/Colors.styles';
import Fonts from '../../styles/Fonts.styles';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  normalBtn: {
    fontSize: 24
  },
  tab: {
    backgroundColor: '#FFFFFF'
  },
  mainNavHeader: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 0,
    paddingLeft: 0,
    flexDirection: 'column',
    paddingTop: Platform.OS === 'ios' ? 25 : 0,
  },
  Textlabel: {
    paddingTop: 0,
    fontSize: 15,
    fontWeight: 'normal',
    textAlign: 'left'
  },
  TextResults: {
    paddingTop: 12,
    textAlign: 'left',
    marginLeft: 8,
    fontSize: 12,
    fontWeight: 'normal',
    color: '#757575'
  },
  mainGrid: {
    backgroundColor: '#FFFFFF',
    height: deviceHeight,
    marginTop: -10
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    width: null,
    height: deviceHeight - ExtraDimensions.get('STATUS_BAR_HEIGHT')
  },
  customTabBar: {
    backgroundColor: '#1DE9B6'
  },
  sliderFilters: {
    marginTop: 10
  },
  smallBtn: {
    fontSize: new FontSizeCalculator(24).getSize(),
    color: 'grey'
  },
  btnImage: {
    height: 75,
    width: 75,
    marginBottom: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  talkBubble: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  talkBubbleSquare: {
    width: 230,
    height: 80,
    backgroundColor: Colors.highlightColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  talkBubbleTriangle: {
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 13,
    borderRightWidth: 26,
    borderRightColor: Colors.highlightColor,
    borderBottomWidth: 13,
    borderBottomColor: 'transparent',
    transform: [
      {rotate: '-90deg'}
    ]
  },
  cameraHintText: {
    fontSize: 16,
    color: 'white',
    fontFamily: Fonts.contentFont,
    textAlign: 'center',
    alignSelf: 'center',
  }

});
