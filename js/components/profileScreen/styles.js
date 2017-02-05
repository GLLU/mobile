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
    backgroundColor: 'transparent',
  },
  toFeedScreenBtn: {
    marginLeft: 20,
    width: 25,
    height: 25,
  },
  settingsBtn: {
    marginRight: 20,
    width: 25,
    height: 25,
  },
  reportBtn: {
    marginRight: 20,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,

  },
  backBtn: {
    marginLeft: 20,
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
  itemsContainer: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'transparent',
    // borderWidth: 2,
    // borderColor: 'red'
  },
  itemsSeparator:{
    flexDirection: 'row',
    flexGrow: 1,
    height: 75
  },
  itemsTotal: {
    backgroundColor: '#00D7B2',
    justifyContent: 'center',
    opacity: 0.8
  },
  text: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    width: 75,
  },
  number: {
    fontSize: 30
  },
  itemsRow: {
    backgroundColor: 'white',
    flexGrow: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  itemPic: {
    width: 55,
    height: 55,
  },
  statsContainer:{
    flexDirection: 'row',
    height: 75,
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30,
    backgroundColor: 'transparent',

  },
  statsTotal: {
    backgroundColor: 'black',
    justifyContent: 'center',
    opacity: 0.8
  },
  addItemContainer: {
    backgroundColor: '#00D7B2',
    width: 55,
    justifyContent: 'center'
  },
  addItem: {
    width: 15,
    height: 15,
    alignSelf: 'center'
  },
});
