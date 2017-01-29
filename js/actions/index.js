import { openDrawer, closeDrawer } from './drawer';
import { showLoader, hideLoader } from './loader';
import { loadCategories, loadBrands } from './filters';
import { setMinMax, completeEdit, saveUserSize } from './myBodyMeasure';
import { changeBodyType, showBodyTypeModal, hideBodyTypeModal } from './myBodyType';
import { createEntity, updateEntity, readEndpoint, deleteEntity } from 'redux-json-api';
import { addNewLook,
         editTag,
         createLookItem,
         updateLookItem,
         publishLookItem,
         setTagPosition,
         addItemType,
         createBrandName,
         addBrandName,
         addItemSizeCountry,
         addItemSize,
         addItemCurrency,
         addItemPrice,
         addSharingInfo,
         addDescription,
         addLocation,
         addTrustLevel,
         addPhotosVideo,
} from './uploadLook';
import { setUser, loginViaFacebook } from './user';
import navigateTo from './sideBarNav';
import { actions } from 'react-native-navigation-redux-helpers';
const {
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
  setMinMax,
  completeEdit,
  saveUserSize,
  changeBodyType,
  showBodyTypeModal,
  hideBodyTypeModal,
  addNewLook,
  createLookItem,
  updateLookItem,
  publishLookItem,
  editTag,
  setTagPosition,
  setUser,
  loginViaFacebook,
  navigateTo,
  replaceAt,
  pushRoute,
  popRoute,
  addItemType,
  createBrandName,
  addBrandName,
  addItemSizeCountry,
  addItemSize,
  addItemCurrency,
  addItemPrice,
  addSharingInfo,
  addDescription,
  addLocation,
  addTrustLevel,
  addPhotosVideo,
  showLoader,
  hideLoader,
};
