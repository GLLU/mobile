import {StyleSheet, Dimensions} from 'react-native';

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

export default StyleSheet.create({
  content:{
    height: h
  },
  bg: {
    flex: 1,
    width: w,
    height: 450
  },
  linearGradient: {
    width: w,
    height:450,
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
    marginTop: 5,
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
  description: {
    backgroundColor: 'transparent',
    margin: 15,
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
    marginTop: 5,
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
    height: 55,
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
  bodyMeasureContainer: {
    flexBasis: 1,
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
    marginHorizontal: 10,
    marginBottom: 30,
    padding: 10,
    borderWidth: 1,
    borderColor : '#D9D9D9',
    backgroundColor: 'white',
  },
  editBodyTypeTitleContainer: {
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
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  scrollView: {
    marginTop: 60
  },
  privateInfoContainer: {
    marginTop: 15,
    marginBottom: 15,
    justifyContent: 'center'
  },
});
