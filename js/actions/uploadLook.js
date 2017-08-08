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
export function addNewLook(image) {
  return (dispatch, getState) => {
    dispatch(showProcessing());
    return new Promise((resolve, reject) => {
      const user = getState().user;
      if (user && user.id !== -1) {
        Utils.getKeychainData().then(credentials => {
          api_key = credentials.password;
          if (api_key) {
            Utils.postMultipartForm(api_key, '/looks', [], image.type, image).then((data) => {
              if (data) {
                const url = data.look.cover.type === "image" ? _.find(data.look.cover.list, x => x.version === 'small').url : _.find(data.look.cover.list, x => x.version === 'original').url;
                if (data.look.cover.type !== "image") {
                  const payload = _.merge(data.look, {
                    image: url,
                    items: [{
                      brand: null,
                      id: -1,
                      category: null,
                      cover_x_pos: 0.5,
                      cover_y_pos: 0.5,
                      look_id: -1,
                      occassions: [],
                      tags: [],
                    }],
                    localFilePath: image.localPath
                  });

                  dispatch({
                    type: EDIT_NEW_LOOK,
                    payload,
                  });
                  resolve(payload);
                  dispatch(hideProcessing());
                } else {
                  Utils.preloadImages([url]).then(() => {
                    const payload = _.merge(data.look, {
                      image: url,
                      items: [],
                    });
                    dispatch({
                      type: EDIT_NEW_LOOK,
                      payload,
                    });
                    resolve(payload);
                    dispatch(hideProcessing());
                  }).catch(reject);
                }
              } else {
                reject('Uplaod error');
              }
            }).catch(reject);
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

export function editNewLook(lookId) {
  return (dispatch, getState) => {
    dispatch(showProcessing());
    return new Promise((resolve, reject) => {
      dispatch(rest.actions.looks.get({id: lookId}, (err, data) => {
        dispatch(hideProcessing());
        if (!err) {
          ;
          const url = data.look.cover.type === "image" ? _.find(data.look.cover.list, x => x.version === 'small').url : _.find(data.look.cover.list, x => x.version === 'original').url;
          const items = data.look.items.length > 0 ? data.look.items.length : [{
            brand: null,
            id: -1,
            category: null,
            cover_x_pos: 0.5,
            cover_y_pos: 0.5,
            look_id: -1,
            occassions: [],
            tags: [],
          }]
          let payload = {
            image: url,
            items: items,
            ...data.look
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
    const state = getState();
    const lookId = state.uploadLook.lookId;
    const body = {
      item: {
        cover_x_pos: position.locationX,
        cover_y_pos: position.locationY,
      }
    };
    return new Promise((resolve, reject) => {
      dispatch(rest.actions.items.post({look_id: lookId}, {body: JSON.stringify(body)}, (err, data) => {
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

export function removeLookItem(itemId) {
  return (dispatch, getState) => {
    const state = getState();
    const lookItems = _.cloneDeep(state.uploadLook.items)
    console.log('lookItems', lookItems)
    const newItemsArr = _.filter(lookItems, (item) => item.id !== itemId);
    console.log('newItemsArr', newItemsArr)
    dispatch({
      type: REMOVE_LOOK_ITEM,
      newItemsArr,
    });
    // return new Promise((resolve, reject) => {
    //   dispatch(rest.actions.items.post({look_id: lookId}, {body: JSON.stringify(body)}, (err, data) => {
    //     if (!err) {
    //       resolve(dispatch({
    //           type: CREATE_LOOK_ITEM_BY_POSITION,
    //           payload: data
    //         })
    //       );
    //     } else {
    //       reject(err);
    //     }
    //   }));
    // });
  }
}

export function selectLookItem(itemId) {
  return {
    type: SELECT_LOOK_ITEM,
    payload: itemId
  }
}

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
  console.log('currItemId',)
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

export function publishLookItem() {
  return (dispatch, getState) => {
    const state = getState();

    const {lookId, itemId} = state.uploadLook;

    return new Promise((resolve, reject) => {
      dispatch(rest.actions.publish({look_id: lookId}, {}, (err, data) => {
        if (!err) {
          resolve();
        } else {
          reject();
        }
      }));
    });
  }
}

export function addItemType(categoryItem, itemId) {
  return (dispatch, getState) => {
    const state = getState();
    const {lookId} = state.uploadLook;
    const params = {
      category_id: categoryItem.id,
    }
    return _updateItem(lookId, itemId, params, dispatch).then(data => {
      const payload = {categoryItem, itemId}
      dispatch({
        type: ADD_ITEM_TYPE,
        payload
      });
      dispatch(addItemTag(categoryItem.name, itemId)).catch(err => {
        console.log('do nothing');
      });
    }).catch(err => {
      console.log('addItemType error', err);
    });

  };
}

export function addBrandName(payload) {
  return (dispatch, getState) => {
    const state = getState();
    const {lookId} = state.uploadLook;
    const itemId = payload.itemId
    const params = {
      brand_id: payload.id,
    }
    return new Promise((resolve, reject) => {
      return _updateItem(lookId, itemId, params, dispatch).then(data => {
        dispatch({
          type: ADD_BRAND_NAME,
          payload: payload
        });
        dispatch(addItemTag(payload.name, itemId)).catch(reject);
        resolve();
      }).catch(reject);
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
          dispatch(addBrandName({
            id: data.brand.id,
            name: data.brand.name,
            itemId: newBrand.itemId
          })).then(resolve, reject);
        } else {
          reject(err);
        }
      }));
    });
  };
}

export function removeBrandName(itemId) {
  return {
    type: REMOVE_BRAND_NAME,
    payload: itemId
  };
}

export function addItemSize(payload) {
  return {
    type: ADD_ITEM_SIZE,
    payload: payload
  }
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

export function addSharingInfo(type, url) {
  return {
    type: ADD_SHARING_INFO,
    payload: {
      sharingType: type,
      sharingUrl: url
    }
  }
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

export function addLocation(payload) {
  return {
    type: ADD_LOCATION,
    payload: payload
  }
}

export function addPhotosVideo(image) {
  return {
    type: ADD_PHOTOS_VIDEO,
    payload: image
  };
}

export function toggleOccasionTag(tagId, selected, itemId) {
  return (dispatch, getState) => {
    const state = getState();
    const {lookId} = state.uploadLook;
    if (selected) {
      // remove
      dispatch(rest.actions.item_occasions.delete({look_id: lookId, item_id: itemId, id: tagId}, (err, data) => {
        if (!err) {
          const payload = {tagId, itemId}
          dispatch({
            type: REMOVE_ITEM_OCCASION_TAG,
            payload: payload
          });
        } else {
          throw err;
        }
      }));
    } else { // add
      const body = {
        tag_id: tagId
      }
      dispatch(rest.actions.item_occasions.post({
        look_id: lookId,
        item_id: itemId
      }, {body: JSON.stringify(body)}, (err, data) => {
        if (!err) {
          const payload = {tagId, itemId}
          dispatch({
            type: ADD_ITEM_OCCASION_TAG,
            payload: payload
          });
        } else {
          throw err;
        }
      }));
    }
  };
}
