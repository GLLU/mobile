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
  editProfileBg: {
    width: null,
    height: 150
  },
  cancelEdit: {
    marginLeft: 20,
    width: 40,
    height: 40,
  },
  profilePicBtn: {
    width: 30,
    height: 20,
  },
  editProfileAvatarImg: {
    position: 'absolute',
    top: 100,
    left: w / 2 - 50,

  },
  editAvatarImage: {
    borderWidth: 2,
    borderColor: 'white'
  },
  container: {
    top: 60,
    backgroundColor: '#ffffff',
    paddingTop: 25,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  editName: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Times New Roman',
  },
  editUsername: {
    textAlign: 'center',
    color: '#00ABED',
    padding: 20,
    fontSize: 18
  },
  editNameContainer: {
    borderBottomWidth: 2,
    borderColor : '#D9D9D9',
    paddingBottom: 5,
    marginHorizontal: 10,
  },
  editAboutMeContainer: {
    top: 60,
    marginHorizontal: 10,
    marginBottom: 30,
    padding: 10,
    borderWidth: 1,
    borderColor : '#D9D9D9',
    backgroundColor: 'white',
  },
  editBodyTypeTitleContainer: {
    top: 60,
    marginBottom: 20
  },
  editBodyTypeTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: 'grey'
  },
  editAboutMeInput: {
    fontSize: 14,
    lineHeight: 20
  },
  saveChangesContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#00D7B2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  },
  changeImageIconContainer: {
    width: 100,
    height: 100,
    opacity: 0.8,
    backgroundColor: '#00D7B2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  },
});
