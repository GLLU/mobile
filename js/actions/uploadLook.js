export const ADD_NEW_LOOK = 'ADD_NEW_LOOK';
export const EDIT_TAG = 'EDIT_TAG';
export const ADD_TAG = 'ADD_TAG';
export const SET_TAG_POSITION = 'SET_TAG_POSITION';
import { createEntity } from 'redux-json-api';

// Actions
export function addNewLook(image) {

  return {
    type: ADD_NEW_LOOK,
    payload: {
      image: image
    }
  }
  
  // const entity = {
  //   "type": "looks",
  //   "attributes": {
  //     "data": image.data
  //   }
  // }

  // return (dispatch) => {
  //   return dispatch(createEntity(entity)).then((response) => {
  //     console.log('create look', response);
  //   });
  // }
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

export function addTag(tag) {
  console.log('addTag', tag);
  return {
    type: ADD_TAG,
    payload: {
      tag,
    }
  }
}
