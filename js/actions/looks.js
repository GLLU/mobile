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
  return (dispatch) => {
    return dispatch(rest.actions.user_looks({id: data.id, "page[size]" : 6, "page[number]" : data.page}, {}, (err, userLooksData) => {
      if (!err && userLooksData) {
        let looksData = {
          currId: data.id,
          looks: userLooksData.looks
        }
        dispatch(setUserLooksData(looksData));
      }
    }));
  };
}

export function reportAbuse(look_id):Action {
  const data = { look_id }
  return (dispatch) => {
    return dispatch(rest.actions.report_abuse.post({} ,{ body: JSON.stringify(data) } , (err, data) => {
      if (!err && data) {
        console.log('abuse Reported:', data)
      } else {
        console.log('abuse Reported Failed', err)
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
