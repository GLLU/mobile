export const EDIT_NEW_LOOK = 'EDIT_NEW_LOOK';
export const EDIT_TAG = 'EDIT_TAG';
export const CREATE_LOOK_ITEM_BY_POSITION = 'CREATE_LOOK_ITEM_BY_POSITION';
export const SELECT_LOOK_ITEM = 'SELECT_LOOK_ITEM';
export const REMOVE_LOOK_ITEM = 'REMOVE_LOOK_ITEM';
export const SET_TAG_POSITION = 'SET_TAG_POSITION';
export const ADD_ITEM_TYPE = 'ADD_ITEM_TYPE';
export const ADD_BRAND_NAME = 'ADD_BRAND_NAME';
export const REMOVE_BRAND_NAME = 'REMOVE_BRAND_NAME';
export const ADD_ITEM_SIZE = 'ADD_ITEM_SIZE';
export const ADD_ITEM_TAG = 'ADD_ITEM_TAG';
export const ADD_ITEM_OCCASION_TAG = 'ADD_ITEM_OCCASION_TAG';
export const REMOVE_ITEM_OCCASION_TAG = 'REMOVE_ITEM_OCCASION_TAG';
export const REMOVE_ITEM_TAG = 'REMOVE_ITEM_TAG';
export const ADD_SHARING_INFO = 'ADD_SHARING_INFO';
export const ADD_DESCRIPTION = 'ADD_DESCRIPTION';
export const ADD_ITEM_URL = 'ADD_ITEM_URL';
export const ADD_LOCATION = 'ADD_LOCATION';
export const ADD_PHOTOS_VIDEO = 'ADD_PHOTOS_VIDEO';

import _ from 'lodash';

import rest from '../api/rest';
import {loadBrands, showProcessing, hideProcessing} from './index';
import Utils from '../utils';

let api_key = null;
// Actions

function _updateLook(lookId, params, dispatch, options = {}) {
  const body = {
    look: Object.assign({}, params),
  }

  return makeRequest(dispatch, rest.actions.looks.put, [
    {id: lookId},
    {body: JSON.stringify(body)}
  ], options);
}

function _updateItem(lookId, itemId, params, dispatch) {
  const body = {
    item: Object.assign({}, params),
  }
  return makeRequest(dispatch, rest.actions.items.put, [
    {look_id: lookId, id: itemId},
    {body: JSON.stringify(body)}
  ]);
}

function makeRequest(dispatch, endPoint, endPointParams) {
  return new Promise((resolve, reject) => {
    dispatch(endPoint(...endPointParams, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    }));
  });
}

export function updateLookItem(currItemId) {
  return (dispatch, getState) => {
    const state = getState();
    const itemId = currItemId
    const {lookId, items} = state.uploadLook;
    const item = itemId ? _.find(items, item => item.id === itemId) : null;
    const {brand, category, locationX, locationY} = item;
    const brand_id = brand ? brand.id : undefined;
    const category_id = category ? category.id : undefined;
    const params = {
      brand_id,
      category_id,
      cover_x_pos: locationX,
      cover_y_pos: locationY,
    }

    return _updateItem(lookId, itemId, params, dispatch);
  }
}

function restAddItemCategory(lookId, itemId, dispatch) {
  const params = {
    category_id: categoryItem.id,
  }
  return _updateItem(lookId, itemId, params, dispatch).then(data => {
   console.log('add item category:', data)
  }).catch(err => {
    console.log('add item category error', err);
  });
}

function restAddItemBrand(lookId, itemId, dispatch) {
  const params = {
    brand_id: payload.id,
  }
  return _updateItem(lookId, itemId, params, dispatch).then(data => {
    console.log('add item brand:', data)
  }).catch(err => {
    console.log('add item brand error', err);
  });
}

export function addItemTag(tag, itemId) {
  return (dispatch, getState) => {
    const state = getState();
    const {lookId} = state.uploadLook;
    const body = {
      tag_name: tag
    }
    return new Promise((resolve, reject) => {
      return makeRequest(dispatch, rest.actions.item_tags.post, [
        {look_id: lookId, item_id: itemId},
        {body: JSON.stringify(body)}
      ]).then(data => {
        const payload = {data: data.item_tag.tag, itemId}
        dispatch({
          type: ADD_ITEM_TAG,
          payload
        });
        resolve();
      }).catch(reject);
    });
  };
}

export function removeItemTag(tag, itemId) {
  return (dispatch, getState) => {
    const state = getState();
    const {lookId} = state.uploadLook;
    const body = {
      tag_name: tag
    }
    return new Promise((resolve, reject) => {
      return makeRequest(dispatch, rest.actions.item_tags.delete, [
        {look_id: lookId, item_id: itemId},
        {body: JSON.stringify(body)}
      ]).then(data => {
        const payload = {data: tag, itemId}
        dispatch({
          type: REMOVE_ITEM_TAG,
          payload
        });
        resolve();
      }).catch(reject);
    });
  };
}

export function addDescription(description) {
  return (dispatch, getState) => {
    const state = getState();
    const {lookId} = state.uploadLook;
    const params = {
      description,
    }
    return _updateLook(lookId, params, dispatch).then(data => {
      dispatch({
        type: ADD_DESCRIPTION,
        payload: description
      })
    }).catch(err => {
      console.log('error', err);
    });
  };
}

export function addUrl(url, itemId) {
  console.log('urlll action', url)
  return (dispatch, getState) => {
    const state = getState();
    const {lookId} = state.uploadLook;
    const params = {
      url,
    }
    return _updateItem(lookId, itemId, params, dispatch).then(data => {
      const payload = {
        url,
        itemId
      }
      dispatch({
        type: ADD_ITEM_URL,
        payload
      })
    }).catch(err => {
      console.log('error', err);
    });
  };
}

export function toggleOccasionTag(tagId, selected, itemId) {
  return (dispatch, getState) => {
    const state = getState();
    const {lookId} = state.uploadLook;
    if (selected) {
      // remove
      const payload = {tagId, itemId}
      dispatch({
        type: REMOVE_ITEM_OCCASION_TAG,
        payload
      });
    } else {
      // add
      const payload = {tagId, itemId}
      dispatch({
        type: ADD_ITEM_OCCASION_TAG,
        payload
      });
    }
  };
}

export function resttoggleOccasionTag(tagId, selected, itemId) {
  return (dispatch, getState) => {
    const state = getState();
    const {lookId} = state.uploadLook;
    if (selected) {
      // remove
      dispatch(rest.actions.item_occasions.delete({look_id: lookId, item_id: itemId, id: tagId}, (err, data) => {
        console.log('remove Item Tag', data)
      }));
    } else { // add
      const body = {
        tag_id: tagId
      }
      dispatch(rest.actions.item_occasions.post({
        look_id: lookId,
        item_id: itemId
      }, {body: JSON.stringify(body)}, (err, data) => {
        console.log('add Item Tag', data)
      }));
    }
  };
}
