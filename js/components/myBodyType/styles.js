import {StyleSheet, Dimensions} from 'react-native';

const w = Dimensions.get('window').width
// const h = Dimensions.get('window').height

let fontSizeDefault = 14;
let fontColor = '#000';

export default StyleSheet.create({
  selectBodyTypeText: {
    marginTop: 10,
    marginBottom: 25,
    paddingHorizontal: 50,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: fontSizeDefault * 1.1,
    color: fontColor
  },
  container: {
    height: 350,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff'
  },
  bodyTypeText: {
    textAlign: 'center',
    fontSize: fontSizeDefault * 1.25,
    color: fontColor,
    fontFamily: 'PlayfairDisplay-Bold',
  },
  guideText: {
    borderWidth: 2,
    borderColor: '#EBEBEB',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    textAlign: 'center'
  },
  continueButton: {
    marginTop: 15,
    marginHorizontal: 50
  },
  imagePlaceHolder: {
    flex: 1,
    alignItems: 'center'
  },
  arrowBorder: {
    position: 'absolute',
    left: w/2.0 - 15,
    top: 12,
    width: 0,
    height: 0,
    borderTopWidth: 0,
    borderRightWidth: 9/2.0,
    borderBottomWidth: 9,
    borderLeftWidth: 9/2.0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: '#ebebeb',
    zIndex: 1
  },
  arrow: {
    position: 'absolute',
    left: w/2.0-14,
    top: 15,
    width: 0,
    height: 0,
    borderTopWidth: 0,
    borderRightWidth: 7/2.0,
    borderBottomWidth: 7,
    borderLeftWidth: 7/2.0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: '#fff',
    zIndex: 2
  }
})
