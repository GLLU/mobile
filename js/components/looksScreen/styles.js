import { StyleSheet, Dimensions, Platform } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

const width = Dimensions.get('window').width
const softMenuBarHeight=ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT');
const statusBarHeight=ExtraDimensions.get('STATUS_BAR_HEIGHT');
const height = Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - softMenuBarHeight + statusBarHeight

export default StyleSheet.create({
  container: {},
  tempBtn: {
    position: 'absolute', width: 50, height: 50, backgroundColor: 'green'
  },
  itemImage: {
    width: width,
    height: height,
  },
  descriptionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    bottom: Platform.OS === 'ios' ? 80:softMenuBarHeight + statusBarHeight,
    left: 0,
    zIndex: 1,
    width: width,
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    width: null,
    height: height - ExtraDimensions.get('STATUS_BAR_HEIGHT')
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
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: 5,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    minHeight: 45,
    minWidth: 45
  },
  footerButtonActive: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: 5,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'rgba(0,215,178, 0.75)',
    minHeight: 45,
    minWidth: 45
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
    textAlign: 'center'
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
