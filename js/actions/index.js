import { openDrawer, closeDrawer } from './drawer';
import { showLoader, hideLoader, showProcessing, hideProcessing } from './loader';
import { showError, hideError, showWarning, hideWarning } from './errorHandler';
import { loadCategories, loadBrands, loadItemSizes, loadOccasionTags } from './filters';
import { setMinMax, completeEdit, saveUserSize } from './myBodyMeasure';
import { changeBodyType, showBodyTypeModal, hideBodyTypeModal, getUserBodyType } from './myBodyType';
import { likeUpdate, unLikeUpdate } from './likes';
import { followUpdate, unFollowUpdate, getUserFollowsData, initUserFollows }  from './follows';
import { getUserFollowersData, initUserFollowers }  from './followers';
import { getUserLooksData } from './looks';
import { getFeed, resetFeed, loadMore } from './feed';
import { createEntity, updateEntity, readEndpoint, deleteEntity } from 'redux-json-api';
import {
  addNewLook,
  editNewLook,
  editTag,
  createLookItem,
  selectLookItem,
  updateLookItem,
  publishLookItem,
  setTagPosition,
  addItemType,
  createBrandName,
  addBrandName,
  removeBrandName,
  addItemSizeCountry,
  addItemSize,
  addItemTag,
  removeItemTag,
  addItemCurrency,
  addItemPrice,
  addSharingInfo,
  addDescription,
  addUrl,
  addLocation,
  addTrustLevel,
  addPhotosVideo,
  toggleOccasionTag
} from './uploadLook';
import { setUser, loginViaFacebook, checkLogin, getStats, logout } from './user';
import navigateTo from './sideBarNav';
import { actions } from 'react-native-navigation-redux-helpers';
const {
  reset,
  replaceAt,
  replaceAtIndex,
  popRoute,
  pushRoute,
  back,
} = actions;

export {
  createEntity,
  updateEntity,
  readEndpoint,
  deleteEntity,
  openDrawer,
  closeDrawer,
  loadCategories,
  loadOccasionTags,
  loadBrands,
  loadItemSizes,
  setMinMax,
  completeEdit,
  saveUserSize,
  getUserBodyType,
  changeBodyType,
  showBodyTypeModal,
  hideBodyTypeModal,
  addNewLook,
  editNewLook,
  createLookItem,
  selectLookItem,
  updateLookItem,
  publishLookItem,
  editTag,
  setTagPosition,
  setUser,
  getStats,
  checkLogin,
  logout,
  loginViaFacebook,
  navigateTo,
  reset,
  replaceAt,
  replaceAtIndex,
  pushRoute,
  popRoute,
  back,
  addItemType,
  createBrandName,
  addBrandName,
  removeBrandName,
  addItemSizeCountry,
  addItemSize,
  addItemTag,
  removeItemTag,
  addItemCurrency,
  addItemPrice,
  addSharingInfo,
  addDescription,
  addUrl,
  addLocation,
  addTrustLevel,
  toggleOccasionTag,
  addPhotosVideo,
  showLoader,
  hideLoader,
  showProcessing,
  hideProcessing,
  showError,
  hideError,
  showWarning,
  hideWarning,
  getUserLooksData,
  likeUpdate,
  unLikeUpdate,
  followUpdate,
  unFollowUpdate,
  getUserFollowsData,
  initUserFollows,
  getUserFollowersData,
  initUserFollowers,
  getFeed,
  resetFeed,
  loadMore,
};
