import { openDrawer, closeDrawer } from './drawer';
import { showLoader, hideLoader, showProcessing, hideProcessing } from './loader';
import { showError, hideError, showWarning, hideWarning } from './errorHandler';
import { loadCategories, loadBrands, loadItemSizes } from './filters';
import { setMinMax, completeEdit, saveUserSize } from './myBodyMeasure';
import { changeBodyType, showBodyTypeModal, hideBodyTypeModal } from './myBodyType';
import { createEntity, updateEntity, readEndpoint, deleteEntity } from 'redux-json-api';
import { addNewLook,
         editTag,
         createLookItem,
         selectLookItem,
         updateLookItem,
         publishLookItem,
         setTagPosition,
         addItemType,
         createBrandName,
         addBrandName,
         addItemSizeCountry,
         addItemSize,
         addItemTag,
         removeItemTag,
         addItemCurrency,
         addItemPrice,
         addSharingInfo,
         addDescription,
         addLocation,
         addTrustLevel,
         addPhotosVideo,
} from './uploadLook';
import { setUser, loginViaFacebook, checkLogin } from './user';
import navigateTo from './sideBarNav';
import { actions } from 'react-native-navigation-redux-helpers';
const {
  reset,
  replaceAt,
  popRoute,
  pushRoute,
} = actions;

export {
  createEntity,
  updateEntity,
  readEndpoint,
  deleteEntity,
  openDrawer,
  closeDrawer,
  loadCategories,
  loadBrands,
  loadItemSizes,
  setMinMax,
  completeEdit,
  saveUserSize,
  changeBodyType,
  showBodyTypeModal,
  hideBodyTypeModal,
  addNewLook,
  createLookItem,
  selectLookItem,
  updateLookItem,
  publishLookItem,
  editTag,
  setTagPosition,
  setUser,
  checkLogin,
  loginViaFacebook,
  navigateTo,
  reset,
  replaceAt,
  pushRoute,
  popRoute,
  addItemType,
  createBrandName,
  addBrandName,
  addItemSizeCountry,
  addItemSize,
  addItemTag,
  removeItemTag,
  addItemCurrency,
  addItemPrice,
  addSharingInfo,
  addDescription,
  addLocation,
  addTrustLevel,
  addPhotosVideo,
  showLoader,
  hideLoader,
  showProcessing,
  hideProcessing,
  showError,
  hideError,
  showWarning,
  hideWarning
};
