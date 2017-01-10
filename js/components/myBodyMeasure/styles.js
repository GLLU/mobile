import {StyleSheet} from 'react-native';

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
  continueButton: {
      marginTop: 15,
      marginHorizontal: 50
  },
  container: {
    paddingTop: 25,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    backgroundColor: '#ffffff'
  },
  bodyTypeText: {
    fontSize: fontSizeDefault * 1.25,
    color: fontColor,
    marginBottom: 15,
    fontFamily: 'PlayfairDisplay-Bold'
  },
  infoContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    marginBottom: 10
  },
  infoText: {
    flexDirection: 'column',
    width: 50,
    fontSize: fontSizeDefault * 0.9,
    color: '#ccc'
  },
  infoDetailTouch: {
    flexDirection: 'column',
    borderBottomWidth: 0,
    borderColor: '#ddd',
    flex: 1
  },
  sizeLineContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  sizeLine: {
    flexDirection: 'row',
    flex: 1,
    height: 2,
    backgroundColor: 'lightgrey',
  },
  sizeLineBtns: {
    flexDirection: 'row',
  },
  sizeLineIcons: {
    color: '#00c497',
    fontSize: 20,
  },
  infoDetailText: {
    fontSize: fontSizeDefault * 0.7,
    color: fontColor,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  toggleContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection:'row',
    marginBottom: 10
  },
  toggleActive: {
    flexDirection: 'column',
    fontWeight: 'bold'
  },
  toggleDeactive: {
    flexDirection: 'column',
  },
  sizeTypeContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection:'row',
    marginBottom: 20
  },
  sizeButton: {
    padding: 2,
    width: 28,
    marginRight: 1,
    backgroundColor: '#CCCCCC'
  },
  sizeButtonActive: {
    padding: 2,
    width: 28,
    marginRight: 1,
    backgroundColor: '#00E2B3'
  },
  sizeText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSizeDefault * 0.9,
    color: '#000'
  },
  sizeTextActive: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSizeDefault * 0.9,
    color: '#fff'
  },
  rangeContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    padding: 10,
    height: 180,
    backgroundColor: '#f2f2f2'
  },
  rangeButtonContainer: {
    flex: 1,
    alignSelf:'flex-end',
    marginBottom: 10
  },
  rangeCloseButton: {
    alignSelf: 'center'
  },
  rangeCloseIcon: {
    color: '#797979',
    textAlign: 'center'
  },
  rangeCompleteButton: {
    alignSelf: 'center',
  },
  rangeCompleteIcon: {
    color: '#05d7b2',
    textAlign: 'center'
  },
  sliderContainer: {
    flex: 1,
    alignItems: 'center',
  },
  sliderText: {
    position: 'absolute',
    top: 100,
    right: 10,
    fontSize: fontSizeDefault * 0.8,
    fontWeight: 'bold'
  },
  sliderSizeType: {
    height: 20,
    fontSize: fontSizeDefault * 0.9,
    fontWeight: 'bold',
    marginBottom: 10
  },
  slider: {
    marginTop: 45,
    width: 140,
    transform: [{ rotate: '90deg'}]
  }
})
