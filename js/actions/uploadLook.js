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
export const ADD_ITEM_OCCASION_TAG = 'ADD_ITEM_OCCASION_TAG';
export const REMOVE_ITEM_OCCASION_TAG = 'REMOVE_ITEM_OCCASION_TAG';
export const REMOVE_ITEM_TAG = 'REMOVE_ITEM_TAG';
export const ADD_ITEM_CURRENCY = 'ADD_ITEM_CURRENCY';
export const ADD_ITEM_PRICE = 'ADD_ITEM_PRICE';
export const ADD_SHARING_INFO = 'ADD_SHARING_INFO';
export const ADD_DESCRIPTION = 'ADD_DESCRIPTION';
export const ADD_LOCATION = 'ADD_LOCATION';
export const ADD_TRUST_LEVEL = 'ADD_TRUST_LEVEL';
export const ADD_PHOTOS_VIDEO = 'ADD_PHOTOS_VIDEO';

import _ from 'lodash';

import rest, { API_URL } from '../api/rest';
import { showLoader, hideLoader, loadBrands, loadItemSizes, showProcessing, hideProcessing } from './index';
import Utils from '../Utils';

var FileUpload = require('NativeModules').FileUpload;
// Actions
export function addNewLook(image) {
  return (dispatch, getState) => {
    dispatch(showProcessing());
    return new Promise((resolve, reject) => {
      const user = getState().user;
      if (user && user.id != -1) {
        Utils.getKeychainData().then(credentials => {
          const api_key = credentials.password;
          if (api_key) {
            var obj = {
              uploadUrl: `${API_URL}/looks`,
              method: 'POST', // default 'POST',support 'POST' and 'PUT'
              headers: {
                'Accept': 'application/json',
                "Authorization": `Token token=${api_key}`,
              },
              fields: {},
              files: [
                {
                  name: 'look[image]',
                  filename: _.last(image.path.split('/')), // require, file name
                  filepath: image.path, // require, file absoluete path
                },
              ]
            };

            FileUpload.upload(obj, function(err, result) {
              dispatch(hideProcessing());
              if (result && result.status == 201) {
                const data = JSON.parse(result.data);
                const payload = _.merge(data, {image: image.path });
                resolve(dispatch(editNewLook(payload)));
              } else {
                reject(err);
              }
            })
          } else {
            dispatch(hideProcessing());
            reject('Authorization error')  
          }
        }).catch(reject);
        
      } else {
        reject('Authorization error')
      }
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
      dispatch(showLoader());
      return dispatch(rest.actions.items.put({look_id: lookId, id: itemId}, { body: JSON.stringify(body)}, (err, data) => {
        dispatch(hideLoader());
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
      dispatch(showLoader());
      return dispatch(rest.actions.looks.put({id: lookId}, { body: JSON.stringify(body)}, (err, data) => {
        if (!err) {
          dispatch(rest.actions.publish({look_id: lookId}, {}, (err, data) => {
            dispatch(hideLoader());
            if (!err) {
              resolve();
            } else {
              reject();
            }
          }));
        } else {
          dispatch(hideLoader());
          reject(err);
        }
      }));
    });
  }
}

export function addItemType(categoryItem) {
  return (dispatch) => {

    dispatch({
        type: ADD_ITEM_TYPE,
        payload: categoryItem.id
      });
    dispatch(loadItemSizes(categoryItem.id));
    dispatch(addItemTag(categoryItem.name));
  };
}

export function addBrandName(payload) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_BRAND_NAME,
      payload: payload
    });
    dispatch(addItemTag(payload.name));
  };
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

export function addItemTag(tag) {
  return (dispatch, getState) => {
    const state = getState();
    const { lookId, itemId } = state.uploadLook;
    const body = {
      tag_name: tag
    }
    return new Promise((resolve, reject) => {
      // dispatch(showLoader());
      return dispatch(rest.actions.item_tags.post({look_id: lookId, id: itemId}, { body: JSON.stringify(body)}, (err, data) => {
        // dispatch(hideLoader());
        if (!err) {
          dispatch({
            type: ADD_ITEM_TAG,
            payload: data.item_tag.tag
          });
          resolve();
        } else {
          reject(err);
        }
      }));
    });
  };
}

export function removeItemTag(tag) {
  return (dispatch, getState) => {
    const state = getState();
    const { lookId, itemId } = state.uploadLook;
    const body = {
      tag_name: tag
    }
    return new Promise((resolve, reject) => {
      // dispatch(showLoader());
      return dispatch(rest.actions.remove_item_tags({look_id: lookId, id: itemId}, { body: JSON.stringify(body)}, (err, data) => {
        // dispatch(hideLoader());
        if (!err) {
          dispatch({
            type: REMOVE_ITEM_TAG,
            payload: tag
          });
          resolve();
        } else {
          reject(err);
        }
      }));
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

export function toggleOccasionTag(tag, selected) {
  return (dispatch, getState) => {
    const state = getState();
    const { lookId, itemId } = state.uploadLook;
    if (selected) {
      // remove
      dispatch(rest.actions.item_occasions.delete({look_id: lookId, item_id: itemId, id: tag.id}, (err, data) => {
        if (!err) {
          dispatch({
            type: REMOVE_ITEM_OCCASION_TAG,
            payload: tag
          });
        } else {
          throw err;  
        }
      }));
    } else { // add
      const body = {
        tag_id: tag.id
      }
      dispatch(rest.actions.item_occasions.post({look_id: lookId, item_id: itemId}, { body: JSON.stringify(body)}, (err, data) => {
        if (!err) {
          dispatch({
            type: ADD_ITEM_OCCASION_TAG,
            payload: data.item_tag.tag
          });
        } else {
          throw err;  
        }
      }));
    }
  };
}
