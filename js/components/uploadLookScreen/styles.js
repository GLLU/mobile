import React from 'react';
import { Dimensions, StyleSheet, Platform } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Colors from '../../styles/Colors.styles';
import Fonts from '../../styles/Fonts.styles';
import { generateAdjustedSize } from '../../utils/AdjustabaleContent';

const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const w = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
  },
  mainView: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  renderActionsContainer: {
    height: h,
    width: w,
    justifyContent: 'space-between',
  },
  bottomBarToggle: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    opacity: 0.7,
    width: 40,
    height: 25,
  },
  carouselTitle: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    color: Colors.white,
    lineHeight: 24,
    fontFamily: Fonts.subHeaderFont,
  },
  footerToggleButton: {
    height: 8,
    width: 18,
  },
  nextBtnContainer: {
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: Platform.OS === 'ios' ? 22 : 0,
    backgroundColor: 'white',
    opacity: 0.7,
    height: 45,
    alignItems: 'center',
  },
  publishBtnText: {
    color: Colors.secondaryColor,
    textAlign: 'center',
    fontSize: generateAdjustedSize(20),
    fontFamily: Fonts.boldContentFont,
  },
  addItemContainer: {
    right: 10,
    height: 22,
    justifyContent: 'center',
    position: 'absolute',
  },
  addItemText: {
    color: Colors.secondaryColor,
    textAlign: 'center',
    fontFamily: Fonts.boldContentFont,
    fontSize: generateAdjustedSize(16),
  },
  removeBtnContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  removeBtnImage: {
    width: 22,
    height: 22,
    alignSelf: 'center',
  },
  backBtnContainer: {
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
  },
  videoItemsBtnContainer: {
    height: 35,
    width: 35,
    backgroundColor: 'rgba(32, 32, 32, 0.8)',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 3,
    marginRight: 3,
  },
  videoItemRedCircle: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
    top: 3,
    right: 3,
  },
  vidItemCategory: {
    flex: 1,
    width: 25,
    backgroundColor: 'transparent',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  titleAndAddContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: 'black',
    opacity: 0.7,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  videoItemNumber: {
    textAlign: 'center',
    fontSize: 13,
  },
  itemCategoryIconContainer: {
    flex: 1,
    padding: 2,
  },
  headerTitle: {
    fontWeight: '400',
    color: Colors.white,
  },
});
