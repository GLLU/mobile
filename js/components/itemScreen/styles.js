import {StyleSheet, Dimensions} from 'react-native';

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

export default StyleSheet.create({
  container: {

  },
  tempBtn: {
    position: 'absolute',width: 50, height: 50, backgroundColor :'green'
  },
  itemImage: {
    width: w,
    height: h,
  },
  topContainer: {
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
    flexDirection: 'row',
    bottom: 20
  },

  bottomLeft: {
    left: 10
  },
  bottomRight: {
    flexWrap: 'wrap',
    flexDirection:'row',
    position: 'absolute',
    right: 10
  },
  footerButton: {
    flexWrap: 'wrap',
    flexDirection:'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',

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
    flexDirection:'row',
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
  BuyItButton: {
    position: 'absolute'
  }
});
