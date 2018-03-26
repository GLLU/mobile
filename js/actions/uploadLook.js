export const EDIT_NEW_LOOK = 'EDIT_NEW_LOOK';
export const EDIT_TAG = 'EDIT_TAG';
export const CREATE_CUSTOM_LOOK_ITEM = 'CREATE_CUSTOM_LOOK_ITEM';
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
export const SET_SUGGESTIONS_ITEMS = 'SET_SUGGESTIONS_ITEMS';
export const REMOVE_ITEM_COLOR = 'REMOVE_ITEM_COLOR';
export const ADD_ITEM_COLOR = 'ADD_ITEM_COLOR';
export const DONE_UPLOADING_FILE = 'DONE_UPLOADING_FILE';
export const CLEAR_UPLOAD_LOOK = 'CLEAR_UPLOAD_LOOK';

import { normalize } from 'normalizr';
import { lookSchema } from '../schemas/schemas';
import { unifyLooks } from '../utils/FeedUtils';

import UploadLookService from '../services/uploadLookService';
import _ from 'lodash';
import rest from '../api/rest';
import { loadBrands, showProcessing, hideProcessing } from './index';
import RNFetchBlob from 'react-native-fetch-blob';
import uploadLookService from '../services/uploadLookService';
import { newItem } from '../reducers/uploadLook';
import Utils from '../utils';
import FEED_TYPE_BEST_MATCH from './feed';
import {setLooksData, setFeedData} from './feed';

let api_key = null;

function _getSuggestion(image, dispatch, resolve) {
  return new Promise((innerResolve, reject) => {
    RNFetchBlob
  .config({
    fileCache: true,
  })
  .fetch('GET', image.localPath)
  .then((resp) => {
    resp.base64().then((readFile) => {
      uploadLookService.getLookSuggestions(Utils.convertDataURIToBinary(readFile)).then((data) => {
        if (data) {
          innerResolve(data);
          resolve(data);
        } else {
          reject('Error - No data');
        }
      }).catch(() => {
        reject('error retrieving suggestions');
      });
    });
  });
  });
}
let incrementedItemId = 0;

// Actions
export function addNewLook(image) {
  return (dispatch, getState) => {
    dispatch(showProcessing());
    dispatch(clearUploadLook());
    return new Promise((resolve, reject) => {
      const user = getState().user;
      if (user && user.id !== -1) {
        Utils.getKeychainData().then(credentials => {
          api_key = credentials.password;
          if (api_key) {
            UploadLookService.createLook().then((emptyLookData) => {
              let items=[];
              _getSuggestion(image, dispatch, resolve).then((tagsData) => {
                items = tagsData.map(function(tag, i) {
                  return {
                    cover_x_pos: tag.x,
                    cover_y_pos: tag.y,
                    category: tag.category,
                    offers: tag.offers,
                    id: (incrementedItemId + 100 + i),
                    isCustom: false,
                  };
                });
                const payload = _.merge(emptyLookData.look, {
                  image: image.localPath,
                  items: (items && items.length > 0) ? items : [newItem],
                  isUploading: true,
                });
                dispatch({
                  type: EDIT_NEW_LOOK,
                  payload,
                });
                resolve(payload);
                dispatch(hideProcessing());
                Utils.postMultipartForm(api_key, `/looks/${emptyLookData.look.id}`, [], image.type, image).then((data) => {
                  if (data) {
                    dispatch({
                      type: DONE_UPLOADING_FILE,
                    });
                  } else {
                    reject('Uplaod error');
                  }
                }).catch(reject);
              });
            });
          } else {
            dispatch(hideProcessing());
            reject('Authorization error');
          }
        }).catch(reject);

      } else {
        reject('Authorization error');
      }
    });
  }
}

export function editNewLook(lookId) {
  return (dispatch) => {
    dispatch(showProcessing());
    dispatch(clearUploadLook());
    return new Promise((resolve) => {
      dispatch(rest.actions.looks.get({id: lookId}, (err, data) => {
        dispatch(hideProcessing());
        if (!err) {
          const url = data.look.cover.type === "image" ? _.find(data.look.cover.list, x => x.version === 'small').url : _.find(data.look.cover.list, x => x.version === 'original').url;
          let payload = {
            image: url,
            ...data.look,
          };
          dispatch({
            type: EDIT_NEW_LOOK,
            payload,
          });
          resolve(payload);
        } else {
          throw err;
        }
      }));
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
        type: CREATE_CUSTOM_LOOK_ITEM,
        itemId: newItemId
      })
      resolve(newItemId);
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
    const payload = { categoryItem, itemId }
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
      const payload = { tagId, itemId }
      dispatch({
        type: REMOVE_ITEM_OCCASION_TAG,
        payload
      });
    } else { // add
      const payload = { tagId, itemId }
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
      const payload = { colorId, itemId }
      dispatch({
        type: REMOVE_ITEM_COLOR,
        payload
      });
    } else { // add
      const payload = { colorId, itemId }
      dispatch({
        type: ADD_ITEM_COLOR,
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

export function clearUploadLook() {

  return (dispatch) => {
    dispatch({
      type: CLEAR_UPLOAD_LOOK,
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
      dispatch(rest.actions.brands.post({}, { body: JSON.stringify(body) }, (err, data) => {
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

function filteredOffers(item) {
  let filteredOffers = [];
  if (item.offers) {
    filteredOffers = item.offers.filter(offer => offer.selected === true);
    if (filteredOffers.length === 0) {
      filteredOffers = item.offers.slice(0, 6);
    }
  }
  return filteredOffers;
}

export function publishLook() {
  return (dispatch, getState) => {
    const state = getState();

    const { lookId, items, description, isUploading } = state.uploadLook;

    let interval;
    return new Promise((resolve, reject) => {
      _.forEach(items, (item) => {
        let body;
        if (item.isCustom) {
          body = {
            item: {
              cover_x_pos: item.locationX,
              cover_y_pos: item.locationY,
              category_id: item.category,
              brand_id: item.brand,
              color_ids: item.color_ids,
              url: item.url,
            },
          };
          const editOrCreate = item.isNew ? { method: 'post' } : { method: 'put', itemId: item.id };
          UploadLookService.createOrEditItem(lookId, body, editOrCreate).then((createdItemData) => {
            _.forEach(item.occasions, (occasion) => {
              const occasionBody = {
                tag_id: occasion,
              };
              UploadLookService.addItemOccasions(lookId, createdItemData.item.id, occasionBody).then((occasionData) => {
              });
            });
          });
        } else {
          body = {
            item: {
              cover_x_pos: item.locationX,
              cover_y_pos: item.locationY,
              category_name: item.category,
              product_suggestions_attributes: filteredOffers(item),
            },
          };
          UploadLookService.createOrEditItem(lookId, body, { method: 'post' });
        }
      });

      interval = setInterval(function () {
        if (getState().uploadLook.isUploading) {
          //Do nothing, wait until next interval.
        } else {
          clearInterval(interval);

          UploadLookService.publishLook(lookId).then((look) => {
            const state = getState().feed['bestMatch'];
            const normalizedLooksData = normalize([look], [lookSchema]);
            const unfiedLooks = unifyLooks(normalizedLooksData.entities.looks, getState().looks.flatLooksData);
            dispatch(setLooksData({ flatLooksData: { ...unfiedLooks } }));
            const unifiedLooksIds = state.flatLooksIdData;
            unifiedLooksIds.unshift(look.id);
            dispatch(setFeedData({ flatLooksIdData: unifiedLooksIds, meta: state.meta, query: state.query, feedType: 'bestMatch' }));
            if (description.length > 0) {
              const descriptionBody = {
                description
              }
              UploadLookService.updateLook(lookId, descriptionBody).then((look) => {
              })
            }
          })
        }
      }, 2000);

      resolve();
    })
  }
}
