import {StyleSheet, Dimensions} from 'react-native';

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

export default StyleSheet.create({
  bg: {
    flex: 1,
    width: null,
    height: h
  },
  linearGradient: {
    width: w,
    height: h,
    position: 'absolute',
    top: 0,
    left: 0
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  headerBtn: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'transparent',
  },
  toFeedScreenBtn: {
    width: 25,
    height: 25,
  },
  settingsBtn: {
    width: 25,
    height: 25,
  },
  reportBtn: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,

  },
  backBtn: {
    color: 'white',
    backgroundColor: 'transparent'
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
  },
  name:{
    color: 'white',
    fontSize: 35,
    fontFamily: 'Times New Roman',
    marginTop: 5,
  },
  username:{
    color: '#00ABED',
    fontSize: 20,
    fontFamily: 'Times New Roman',
  },
  followBtn: {
    backgroundColor: '#00D7B2',
    width: 75,
    height: 25,
    justifyContent: 'center',
    marginTop: 15
  },
  followText: {
    textAlign: 'center',
    color: 'white'
  },
  editBtn: {
    backgroundColor: 'transparent',
    width: 75,
    height: 25,
    justifyContent: 'center',
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#00D7B2',
  },
  editText: {
    textAlign: 'center',
    color: '#00D7B2'
  },
  description: {
    backgroundColor: 'transparent',
    margin: 15,
    height: 80,
  },
  descriptionText: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 20
  },
});
