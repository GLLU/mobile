import {StyleSheet, Dimensions, Platform} from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const w = deviceWidth / 2 - 50;
let fontSizeDefault = 14;
let fontColor = '#000';

export default StyleSheet.create({
  headerTitle: {
    fontSize: 22,
    fontWeight: '300',
    fontFamily: 'Times New Roman',
    color: '#FFFFFF',
    textAlign: 'left'
  },
  headerTitleContainer: {
    borderBottomWidth: 1.5,
    borderColor: 'lightgrey',
    paddingBottom: 10,
    width: 200,
    paddingLeft: 0
  },
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
  bodyType: {
    flexDirection: 'row',
    justifyContent: 'center',

  },
  bodyTypeShapeImage: {
      height: 30,
      width: 30,
      resizeMode: 'contain'
  },
  bodyTypeText: {
    fontSize: fontSizeDefault * 1.35,
    color: fontColor,
    marginBottom: 15,
    fontFamily: 'PlayfairDisplay-Bold',
  },
  bodyTypeImageContainer: {
    width: w,
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 15
  },
  bodyTypeImage: {
    width: w,
    height: 240
  },
  sizeListContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 25
  },
  infoContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    marginBottom: 15
  },
  infoText: {
    flexDirection: 'column',
    width: 50,
    fontSize: fontSizeDefault * 1.2,
    color: '#ccc',
    alignSelf: 'flex-end',
    marginBottom: (Platform.OS === 'ios') ? 16 : 5,
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
    fontSize: (Platform.OS === 'ios') ? 35 : 28,
  },
  infoDetailText: {
    fontSize: fontSizeDefault,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'flex-end',
    color: '#000000',
    width: 53,
    marginLeft: 8,
    marginRight: 4,
  },
  infoDetailTextColorChange: {
    color: '#009688'
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
  scaleRadioContainer: {
    alignItems: 'center',
    marginLeft: 50,
    flex:1
  },
  radioView: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: 60,
    width: 100,
    alignItems: 'flex-end',
    marginBottom: 15,
    marginLeft: 10
  },
  radioBtn: {
    color: 'lightgrey',
    fontSize: 17
  },
  radioOption: {
    flexDirection: 'row',
  },
  radioSlash: {
    paddingLeft: 5,
    paddingRight: 5,
    color: 'lightgrey',
    fontSize: 17
  }
})
