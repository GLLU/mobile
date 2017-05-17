import { showLoader, hideLoader, showProcessing, hideProcessing } from './loader';
import { showError, hideError, showWarning, hideWarning, showInfo, hideInfo, showFatalError, hideFatalError } from './errorHandler';
import { loadCategories, loadBrands, loadItemSizes, loadOccasionTags } from './filters';
import { setMinMax, completeEdit, saveUserSize } from './myBodyMeasure';
import { changeBodyType, showBodyTypeModal, hideBodyTypeModal, getUserBodyType } from './myBodyType';
import { likeUpdate, unLikeUpdate } from './likes';
import { followUpdate, unFollowUpdate, getUserFollowsData, initUserFollows }  from './follows';
import { getNotifications, goToNotificationSubjectScreen, markAsReadNotifications, clearNewNotifications }  from './notifications';
import { getUserFollowersData, initUserFollowers }  from './followers';
import { getLookCommentsData, initLookComments, addLookComment } from './comments';
import { getUserLooksData, getUserLooks } from './looks';
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
  toggleOccasionTag,
} from './uploadLook';
import { setUser,
  loginViaFacebook,
  checkLogin,
  getStats,
  logout,
  setInvitationToken,
  invitationCheckExistance,
  createInvitationCode } from './user';

export {
  createEntity,
  updateEntity,
  readEndpoint,
  deleteEntity,
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
  showFatalError,
  hideFatalError,
  showWarning,
  hideWarning,
  showInfo,
  hideInfo,
  getUserLooksData,
  getUserLooks,
  likeUpdate,
  unLikeUpdate,
  followUpdate,
  unFollowUpdate,
  getUserFollowsData,
  initUserFollows,
  getUserFollowersData,
  initUserFollowers,
  getLookCommentsData,
  initLookComments,
  addLookComment,
  getFeed,
  resetFeed,
  loadMore,
  getNotifications,
  goToNotificationSubjectScreen,
  markAsReadNotifications,
  clearNewNotifications,
  setInvitationToken,
  invitationCheckExistance,
  createInvitationCode
};
