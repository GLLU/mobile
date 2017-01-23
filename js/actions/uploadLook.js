export const ADD_NEW_LOOK = 'ADD_NEW_LOOK';
export const EDIT_NEW_LOOK = 'EDIT_NEW_LOOK';
export const EDIT_TAG = 'EDIT_TAG';
export const CREATE_LOOK_ITEM_BY_POSITION = 'CREATE_LOOK_ITEM_BY_POSITION';
export const SET_TAG_POSITION = 'SET_TAG_POSITION';
export const ADD_ITEM_TYPE = 'ADD_ITEM_TYPE';
export const ADD_BRAND_NAME = 'ADD_BRAND_NAME';
export const ADD_ITEM_SIZE_COUNTRY = 'ADD_ITEM_SIZE_COUNTRY';
export const ADD_ITEM_SIZE = 'ADD_ITEM_SIZE';
export const ADD_ITEM_CURRENCY = 'ADD_ITEM_CURRENCY';
export const ADD_ITEM_PRIiCE = 'ADD_ITEM_PRICE';
export const ADD_SHARING_INFO = 'ADD_SHARING_INFO';
export const ADD_LOCATION = 'ADD_LOCATION';
export const ADD_TRUST_LEVEL = 'ADD_TRUST_LEVEL';
export const ADD_PHOTOS_VIDEO = 'ADD_PHOTOS_VIDEO';
import { createEntity, updateEntity, readEndpoint, deleteEntity } from 'redux-json-api';
import _ from 'lodash';

// Actions
export function addNewLook(image) {
  console.log('addNewLook', image.path);
  // return {
  //   type: ADD_NEW_LOOK,
  //   payload: {
  //     image: image
  //   }
  // }

  const entity = {
    "type": "looks",
    "attributes": {
      "image": `data:image/jpeg;base64,${image.data}`
    }
  }

  return (dispatch) => {
    return dispatch(createEntity(entity)).then((response) => {
      console.log('done create entity', response);
      return dispatch(editNewLook(response, image.path))
    });
  }
}

export function editNewLook(data, imagePath) {
  console.log('edit look', data);
  return {
    type: EDIT_NEW_LOOK,
    payload: _.merge(data, {image: imagePath })
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

export function createLookItem(lookId, position) {
  console.log('createLookItem', lookId, position);
  const entity = {
    "type": "items",
    "attributes": {
      "look_id": lookId,
      "cover_x_pos": position.locationX,
      "cover_y_pos": position.locationY,
    },
    "relationships": {
      "look": {
        "data": {
          "id": lookId,
          "type": 'looks'
        }
      }
    }
  }

  return (dispatch) => {
    return dispatch(createEntity(entity)).then(response => {
      console.log('response', response);
      dispatch(readEndpoint(`items/${response.data.id}`));
      return dispatch({
        type: CREATE_LOOK_ITEM_BY_POSITION,
        payload: {
          data: response.data
        }
      });
    });
  }
}

export function updateLookItem(item) {
  console.log('actions updateLookItem', item);
  const entity = {
    "type": "items",
    "id": item.itemId,
    "attributes": {
      "currency": item.currency,
      "price": item.price,
    }
  }

  console.log('before update entity', entity);

  return (dispatch) => {
    return dispatch(updateEntity(entity)).then(response => {
      console.log('update item', response);
    });
  }
}

export function addItemType(payload) {
  return {
    type: ADD_ITEM_TYPE,
    payload: payload
  }
}

export function addBrandName(payload) {
  return {
    type: ADD_BRAND_NAME,
    payload: payload
  }
}

export function addItemSizeCountry(payload) {
  return {
    type: ADD_ITEM_SIZE_COUNTRY,
    payload: payload
  }
}

export function addItemSize(payload) {
  return {
    type: ADD_ITEM_SIZE,
    payload: payload
  }
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

export function addPhotosVideo(photos, video) {
  return {
    type: ADD_PHOTOS_VIDEO,
    payload: {
      photos: photos,
      video: video
    }
  }
}
