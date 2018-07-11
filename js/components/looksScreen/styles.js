import { StyleSheet, Dimensions, Platform } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Fonts from '../../styles/Fonts.styles';
import Colors from '../../styles/Colors.styles';
import { generateAdjustedSize } from '../../utils/AdjustabaleContent';
const width = Dimensions.get('window').width
const height = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');

export default StyleSheet.create({
  container: {},
  tempBtn: {
    position: 'absolute', width: 50, height: 50, backgroundColor: 'green'
  },
  noItemLink: {
    fontSize: generateAdjustedSize(16),
    backgroundColor: 'transparent',
    color: Colors.white,
    textAlign: 'center',
    padding: 5,
    fontFamily: Fonts.contentFont,
  },
  itemImage: {
    width,
    height,
  },
  descriptionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  loadingImage:{
    color: 'black',
    fontFamily: Fonts.contentFont,
    fontSize: generateAdjustedSize(18),
  },
  topLeft: {
    left: 10
  },
  topRight: {
    right: 10
  },
  bottomContainer: {
    position: 'absolute',
    flexDirection: 'column',
    bottom: 0,
    right: 0,
    zIndex: 1,
    width: width,
  },
  videoBackground: {
    position: 'absolute',
    top: 0 ,
    left: 0,
    bottom: 0,
    right: 0,
    width: null,
    height: height
  },
  bottomLeft: {
    left: 10
  },
  bottomRight: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10
  },
  footerButton: {
    flexDirection: 'column',
    padding: 5,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    minHeight: 35,
    minWidth: 45,
    borderRadius: 10,
  },
  footerButtonActive: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: 5,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'rgba(0,215,178, 0.75)',
    minHeight: 35,
    minWidth: 35,
    borderRadius: 10,
  },
  footerButtonIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  footerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textAlign: 'center',
    alignSelf: 'center',
    paddingBottom: 3,
    fontSize: 12
  },
  horizontalContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  topButton: {
    width: 84,
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bagItButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  bagItButtonIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginBottom: 5
  },
  bagItButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'transparent'
  },
  avatarButton: {
    backgroundColor: 'rgba(255,255,255,.5)'
  },
  bodyTypeButton: {
    backgroundColor: 'rgba(5, 215, 178,.5)'
  },
  bodyTypeButtonIcon: {
    width: 50,
    height: 50,
    opacity: 0.8
  },
  bodyTypeButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  lookInfo: {
    height: height,
  },
  buyItContainer: {
    position: 'absolute',
    height: height,
    top: 0
  },
  menuIcon: {
    color: 'white',
    fontSize: 22
  },
  bottomDrawerView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  }
});
