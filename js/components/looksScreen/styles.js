import { StyleSheet, Dimensions, Platform } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

const w = Dimensions.get('window').width
const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT')

export default StyleSheet.create({
  container: {},
  tempBtn: {
    position: 'absolute', width: 50, height: 50, backgroundColor: 'green'
  },
  itemImage: {
    width: w,
    height: h,
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
    flexDirection: 'row',
    bottom: 60,
    left: 0,
    zIndex: 1,
    width: w,
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    width: null,
    height: h - ExtraDimensions.get('STATUS_BAR_HEIGHT')
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
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',

    height: 40,
  },
  footerButtonActive: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: 'rgba(0,215,178, 0.75)',

    height: 40,
  },
  footerButtonIcon: {
    alignSelf: 'center',
    fontSize: 25,
    marginRight: 5
  },
  footerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'transparent'
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
    height: h - 35,
    justifyContent: 'space-between'
  },
  buyItContainer: {
    position: 'absolute',
    height: h,
    top: 0
  },
  menuIcon: {
    color: 'white',
    fontSize: 22
  },
  bottomDrawerView: {
    position: 'absolute',
    left: 0,
    right: 0
  }
});
