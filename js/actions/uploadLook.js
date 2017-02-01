export const ADD_NEW_LOOK = 'ADD_NEW_LOOK';
export const EDIT_NEW_LOOK = 'EDIT_NEW_LOOK';
export const EDIT_TAG = 'EDIT_TAG';
export const CREATE_LOOK_ITEM_BY_POSITION = 'CREATE_LOOK_ITEM_BY_POSITION';
export const SELECT_LOOK_ITEM = 'SELECT_LOOK_ITEM';
export const SET_TAG_POSITION = 'SET_TAG_POSITION';
export const ADD_ITEM_TYPE = 'ADD_ITEM_TYPE';
export const ADD_BRAND_NAME = 'ADD_BRAND_NAME';
export const ADD_ITEM_SIZE_COUNTRY = 'ADD_ITEM_SIZE_COUNTRY';
export const ADD_ITEM_SIZE = 'ADD_ITEM_SIZE';
export const ADD_ITEM_TAG = 'ADD_ITEM_TAG';
export const REMOVE_ITEM_TAG = 'REMOVE_ITEM_TAG';
export const ADD_ITEM_CURRENCY = 'ADD_ITEM_CURRENCY';
export const ADD_ITEM_PRICE = 'ADD_ITEM_PRICE';
export const ADD_SHARING_INFO = 'ADD_SHARING_INFO';
export const ADD_DESCRIPTION = 'ADD_DESCRIPTION';
export const ADD_LOCATION = 'ADD_LOCATION';
export const ADD_TRUST_LEVEL = 'ADD_TRUST_LEVEL';
export const ADD_PHOTOS_VIDEO = 'ADD_PHOTOS_VIDEO';
import { createEntity, updateEntity, readEndpoint, deleteEntity } from 'redux-json-api';
import _ from 'lodash';

import rest from '../api/rest';
import { showLoader, hideLoader, loadBrands, loadItemSizes } from './index';

// Actions
export function addNewLook(image) {
  return (dispatch) => {
    dispatch(showLoader());
    const body = {
      look: {
        image: `data:image/jpeg;base64,${image.data}`
      }
    };
    return new Promise((resolve, reject) => {
      dispatch(rest.actions.looks.post({}, { body: JSON.stringify(body) } , (err, data) => {
        dispatch(hideLoader());
        if (!err) {
          const payload = _.merge(data, {image: image.path });
          resolve(dispatch(editNewLook(payload)));
        } else {
          reject(err);
        }
      }));
    });
  }
}

export function editNewLook(payload) {
  return (dispatch) => {
    return dispatch({
      type: EDIT_NEW_LOOK,
      payload: payload
    });
  }
}

export function editTag(editingTag) {
  return {
    type: EDIT_TAG,
    payload: {
      editingTag
    }
  }
}

export function setTagPosition(payload) {
  return {
    type: SET_TAG_POSITION,
    payload: payload
  }
}

export function createLookItem(position) {
  return (dispatch, getState) => {
    dispatch(showLoader());
    const state = getState();
    const lookId = state.uploadLook.lookId;
    const body = {
      item: {
        cover_x_pos: position.locationX,
        cover_y_pos: position.locationY,
      }
    };
    return new Promise((resolve, reject) => {
      dispatch(rest.actions.items.post({look_id: lookId}, { body: JSON.stringify(body) } , (err, data) => {
        dispatch(hideLoader());
        if (!err) {
          resolve(dispatch({
              type: CREATE_LOOK_ITEM_BY_POSITION,
              payload: data
            })
          );
        } else {
          reject(err);
        }
      }));
    });
  }
}

export function selectLookItem(itemId) {
  return {
    type: SELECT_LOOK_ITEM,
    payload: itemId
  }
}

export function updateLookItem() {
  return (dispatch, getState) => {
    const state = getState();

    const { lookId, itemId, brand, currency, price } = state.uploadLook;

    const brand_id = brand ? brand.id : null;

    const body = {
      item: {
        currency: currency,
        price: price,
        brand_id: brand_id,
      }
    }
    return new Promise((resolve, reject) => {
      return dispatch(rest.actions.items.put({look_id: lookId, id: itemId}, { body: JSON.stringify(body)}, (err, data) => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      }));
    });
  }
}

export function publishLookItem() {
  return (dispatch, getState) => {
    const state = getState();

    const { lookId, itemId, description } = state.uploadLook;

    const body = {
      look: {
        description
      }
    }
    return new Promise((resolve, reject) => {
      return dispatch(rest.actions.looks.put({id: lookId}, { body: JSON.stringify(body)}, (err, data) => {
        if (!err) {
          dispatch(rest.actions.publish({look_id: lookId}, {}, (err, data) => {
            if (!err) {
              resolve();
            } else {
              reject();
            }
          }));
        } else {
          reject(err);
        }
      }));
    });
    return dispatch(updateEntity(entity)).then(response => {
      const publish = {
        "type": "look_publish",
        "attributes": {
          "look_id": state.uploadLook.lookId,
        }
      }
      return dispatch(createEntity(publish));
    })
  }
}

export function addItemType(categoryId) {
  return (dispatch) => {

    dispatch({
        type: ADD_ITEM_TYPE,
        payload: categoryId
      });
    dispatch(loadItemSizes(categoryId));
  };
}

export function addBrandName(payload) {
  return {
    type: ADD_BRAND_NAME,
    payload: payload
  }
}

export function createBrandName(name) {
  return (dispatch) => {
    const body = {
      brand: {
        name: name
      }
    }
    return new Promise((resolve, reject) => {
      dispatch(rest.actions.brands.post({}, { body: JSON.stringify(body) }, (err, data) => {
        if (!err) {
          dispatch(loadBrands());
          dispatch(addBrandName({ id: data.brand.id, name: data.brand.name }));
        } else {
          reject(err);
        }
      }));
    });
  };
}

export function addItemSizeCountry(region) {
  return (dispatch, getState) => {
    const itemSizes = getState().filters.itemSizes;
    const sizesByCountry = _.filter(itemSizes, x => x.region == region);
    const itemSizeValue = sizesByCountry.length > 0 ? _.first(sizesByCountry.map(x => x.value)) : null;
    return dispatch({
      type: ADD_ITEM_SIZE_COUNTRY,
      payload: {
        itemSizeRegion: region,
        itemSizeValue,
      }
    });
  }
}

export function addItemSize(payload) {
  return {
    type: ADD_ITEM_SIZE,
    payload: payload
  }
}

export function addItemTag(tags) {
  return (dispatch) => {
    return dispatch({
      type: ADD_ITEM_TAG,
      payload: tags
    });
  };
}

export function removeItemTag(tag) {
  return (dispatch) => {
    return dispatch({
      type: REMOVE_ITEM_TAG,
      payload: tag
    });
  };
}

export function addItemCurrency(payload) {
  return {
    type: ADD_ITEM_CURRENCY,
    payload: payload
  }
}

export function addItemPrice(payload) {
  return {
    type: ADD_ITEM_PRICE,
    payload: payload
  }
}

export function addSharingInfo(type, url) {
  return {
    type: ADD_SHARING_INFO,
    payload: {
      sharingType: type,
      sharingUrl: url
    }
  }
}

export function addDescription(payload) {
  return {
    type: ADD_DESCRIPTION,
    payload: payload
  }
}

export function addLocation(payload) {
  return {
    type: ADD_LOCATION,
    payload: payload
  }
}

export function addTrustLevel(payload) {
  return {
    type: ADD_TRUST_LEVEL,
    payload: payload
  }
}

export function addPhotosVideo(image) {
  return {
    type: ADD_PHOTOS_VIDEO,
    payload: image
  };
}
