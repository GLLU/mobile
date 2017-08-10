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
import UploadLookService from '../services/uploadLookService';

import _ from 'lodash';

import rest from '../api/rest';
import {loadBrands, showProcessing, hideProcessing} from './index';
import Utils from '../utils';

let api_key = null;
// Actions
export function addNewLook(image) {
  return (dispatch, getState) => {
    dispatch(showProcessing());
    return new Promise((resolve, reject) => {
      const user = getState().user;
      if (user && user.id !== -1) {
        Utils.getKeychainData().then(credentials => {
          api_key = credentials.password;
          if (api_key) {
            UploadLookService.createLook().then((emptyLookData) => {
              console.log('image',image)
              const payload = _.merge(emptyLookData.look, {
                image: image.localPath,
                items: [{
                  brand: null,
                  id: 0,
                  category: null,
                  cover_x_pos: 0.5,
                  cover_y_pos: 0.5,
                  look_id: emptyLookData.id,
                  occasions: [],
                  tags: [],
                }],
              });

              dispatch({
                type: EDIT_NEW_LOOK,
                payload,
              });
              resolve(payload);
              dispatch(hideProcessing());
              // Utils.postMultipartForm(api_key, `/looks/${emptyLookData.look.id}`, [], image.type, image).then((data) => {
              //   if (data) {
              //     console.log('looks image data',data)
              //     const url = data.look.cover.type === "image" ? _.find(data.look.cover.list, x => x.version === 'small').url : _.find(data.look.cover.list, x => x.version === 'original').url;
              //     if (data.look.cover.type !== "image") {
              //       const payload = _.merge(data.look, {
              //         image: url,
              //         items: [{
              //           brand: null,
              //           id: -1,
              //           category: null,
              //           cover_x_pos: 0.5,
              //           cover_y_pos: 0.5,
              //           look_id: -1,
              //           occassions: [],
              //           tags: [],
              //         }],
              //         localFilePath: image.localPath
              //       });
              //
              //       dispatch({
              //         type: EDIT_NEW_LOOK,
              //         payload,
              //       });
              //       resolve(payload);
              //       dispatch(hideProcessing());
              //     } else {
              //       Utils.preloadImages([url]).then(() => {
              //         const payload = _.merge(data.look, {
              //           image: url,
              //           items: [{
              //             brand: null,
              //             id: -1,
              //             category: null,
              //             cover_x_pos: 0.5,
              //             cover_y_pos: 0.5,
              //             look_id: -1,
              //             occassions: [],
              //             tags: [],
              //           }],
              //         });
              //         dispatch({
              //           type: EDIT_NEW_LOOK,
              //           payload,
              //         });
              //         resolve(payload);
              //         dispatch(hideProcessing());
              //       }).catch(reject);
              //     }
              //   } else {
              //     reject('Uplaod error');
              //   }
              // }).catch(reject);
            });

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

export function setTagPosition(payload) {
  return {
    type: SET_TAG_POSITION,
    payload: payload
  }
}

export function createLookItem() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const newItemId = incrementedItemId += 1
      dispatch({
        type: CREATE_LOOK_ITEM_BY_POSITION,
        itemId: newItemId
      })
      resolve(newItemId)
    });
  }
}

export function removeLookItem(itemId) {
  return (dispatch, getState) => {
    const state = getState();
    const lookItems = _.cloneDeep(state.uploadLook.items)
    const newItemsArr = _.filter(lookItems, (item) => item.id !== itemId);
    dispatch({
      type: REMOVE_LOOK_ITEM,
      newItemsArr,
    });
  }
}

export function addItemType(categoryItem, itemId) {
  return (dispatch) => {
    const payload = {categoryItem, itemId}
    dispatch({
      type: ADD_ITEM_TYPE,
      payload
    });
  };
}

export function toggleOccasionTag(tagId, selected, itemId) {
  return (dispatch) => {
    if (selected) {
      // remove
      const payload = {tagId, itemId}
      dispatch({
        type: REMOVE_ITEM_OCCASION_TAG,
        payload
      });
    } else { // add
      const payload = {tagId, itemId}
      dispatch({
        type: ADD_ITEM_OCCASION_TAG,
        payload
      });
    }
  };
}

export function addDescription(description) {
  return (dispatch) => {
    dispatch({
      type: ADD_DESCRIPTION,
      payload: description
    })
  };
}

export function addUrl(url, itemId) {
  return (dispatch, getState) => {
    const payload = {
      url,
      itemId
    }
    dispatch({
      type: ADD_ITEM_URL,
      payload
    })
  };
}