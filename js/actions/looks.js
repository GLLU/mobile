import type { Action } from '../actions/types';
import rest from '../api/rest';
import { showLoader, hideLoader } from './index';

export const SET_LOOK_DATA = 'SET_LOOK_DATA';
export const SET_USER_LOOKS_DATA = 'SET_USER_LOOKS_DATA';

export function getLook(lookId):Action {
  return (dispatch) => {
    return dispatch(rest.actions.look({id: lookId},{}, (err, screenLookData) => {
      if (!err && screenLookData) {
        dispatch(setLookData(screenLookData));
      }
    }));
  };
}

export function getUserLooksData(data):Action {
  console.log('page',data)
  return (dispatch) => {
    dispatch(showLoader());
    return dispatch(rest.actions.looks({id: data.id, "page[size]" : 6, "page[number]" : data.page}, {}, (err, userLooksData) => {
      if (!err && userLooksData) {
        dispatch(setUserLooksData(userLooksData.looks));
        dispatch(hideLoader());
      }
    }));
  };
}


export function setLookData(data):Action {
  return {
    type: SET_LOOK_DATA,
    payload: data
  };
}
export function setUserLooksData(data):Action {
  return {
    type: SET_USER_LOOKS_DATA,
    payload: data
  };
}
