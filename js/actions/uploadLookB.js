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
export const REMOVE_ITEM_COLOR = 'REMOVE_ITEM_COLOR';
export const ADD_ITEM_COLOR = 'ADD_ITEM_COLOR';
import UploadLookService from '../services/uploadLookService';

import _ from 'lodash';

import rest from '../api/rest';
import { newItem } from '../reducers/uploadLook';
import {loadBrands, showProcessing, hideProcessing} from './index';
import Utils from '../utils';

let api_key = null;
let incrementedItemId = 0

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
              const payload = _.merge(emptyLookData.look, {
                image: image.localPath,
                items: [newItem],
              });
              dispatch({
                type: EDIT_NEW_LOOK,
                payload,
              });
              resolve(payload);
              dispatch(hideProcessing());
              Utils.postMultipartForm(api_key, `/looks/${emptyLookData.look.id}`, [], image.type, image).then((data) => {
                if (data) {
                  console.log('looks image data',data)
                  const url = data.look.cover.type === "image" ? _.find(data.look.cover.list, x => x.version === 'small').url : _.find(data.look.cover.list, x => x.version === 'original').url;
                  if (data.look.cover.type !== "image") {
                    resolve(payload);
                    dispatch(hideProcessing());
                  } else {
                    Utils.preloadImages([url]).then(() => {
                      resolve(payload);
                      dispatch(hideProcessing());
                    }).catch(reject);
                  }
                } else {
                  reject('Uplaod error');
                }
              }).catch(reject);
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

export function toggleItemColors(colorId, selected, itemId) {
  return (dispatch) => {
    if (selected) {
      // remove
      const payload = {colorId, itemId}
      dispatch({
        type: REMOVE_ITEM_COLOR,
        payload
      });
    } else { // add
      const payload = {colorId, itemId}
      dispatch({
        type: ADD_ITEM_COLOR,
        payload
      });
    }
  };
}

export function addDescription(description) {
  console.log('desc action', description)
  return (dispatch) => {
    dispatch({
      type: ADD_DESCRIPTION,
      payload: description
    })
  };
}

export function addUrl(url, itemId) {
  return (dispatch) => {
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

export function addBrandName(brand, itemId) {
  return (dispatch) => {
    const payload = {
      brand,
      itemId
    }
    dispatch({
      type: ADD_BRAND_NAME,
      payload: payload
    });
  };
}

export function createBrandName(newBrand) {
  return (dispatch) => {
    const body = {
      brand: {
        name: newBrand.name
      }
    }
    return new Promise((resolve, reject) => {
      dispatch(rest.actions.brands.post({}, {body: JSON.stringify(body)}, (err, data) => {
        if (!err && !_.isEmpty(data)) {
          dispatch(loadBrands());
          dispatch(addBrandName(data.brand.id, newBrand.itemId))
          resolve()
        } else {
          reject(err);
        }
      }));
    });
  };
}

export function publishLook() {
  return (dispatch, getState) => {
    const state = getState();

    const {lookId, items, description} = state.uploadLook;

    return new Promise((resolve, reject) => {
      _.forEach(items, (item) => {
        const body = {
          item: {
            cover_x_pos: item.locationX,
            cover_y_pos: item.locationY,
            category_id: item.category,
            brand_id: item.brand,
            color_ids: item.colors,
            url: item.url
          }
        };
        const editOrCreate = item.isNew ? {method: 'post'} : {method: 'put', itemId: item.id}
        UploadLookService.createOrEditItem(lookId, body, editOrCreate).then((createdItemData) => {
          _.forEach(item.occasions, (occasion) => {
            const occasionBody = {
              tag_id: occasion
            }
            UploadLookService.addItemOccasions(lookId, createdItemData.item.id ,occasionBody).then((occasionData) => {
              console.log('occasion data:',occasionData);
            })
          })
          UploadLookService.publishLook(lookId).then((newLook) => {
            if(description.length > 0){
              const descriptionBody = {
                description
              }
              UploadLookService.updateLook(lookId, descriptionBody).then((updatedLookLook) => {
                console.log('updatedLookLook data:',updatedLookLook)
              })
            }
          })

        })
      });
      //resolve()
    }).then(() => {

    });

    // return new Promise((resolve, reject) => {
    //   UploadLookService.createLook().then((publishedLookData) => {
    //     console.log('published look data',publishedLookData)
    //     resolve()
    //   });
    // });
  }
}