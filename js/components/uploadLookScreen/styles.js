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
  starIcon: {
    margin: 4,
    width: 18,
    height: 18,
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
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 30,
  },
  carouselTitleText: {
    color: Colors.black,
    fontFamily: Fonts.subHeaderFont,
    paddingHorizontal: 10,
    fontWeight: '600',
    height: 30,
    paddingTop: 7,
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
    paddingTop: 10,
    backgroundColor: 'white',
    opacity: 0.7,
    height: Platform.OS === 'ios' ? 67 : 55,
    alignItems: 'center',
  },
  publishBtnText: {
    color: Colors.black,
    textAlign: 'center',
    fontSize: generateAdjustedSize(20),
    fontWeight: '700',
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
    width: 12,
    height: 15,
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
