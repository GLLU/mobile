import type { Action } from '../actions/types';
import rest from '../api/rest';
import { showLoader, hideLoader } from './index';

export const SET_LOOK_DATA = 'SET_LOOK_DATA';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_LOOKS_DATA = 'SET_USER_LOOKS_DATA';
export const SET_USER_LOOKS = 'SET_USER_LOOKS';

export function getUser(id) {
  console.log('getUser', id)
  return (dispatch) => {
    dispatch(showLoader());
    dispatch(rest.actions.users.get({id}, (err, data) => {
      console.log('getUser response', data);
      if (!err && data) {
        dispatch({
          type: SET_USER_DATA,
          payload: data,
        });
        dispatch(hideLoader());
      } else {
        throw err;
      }
    }));
  };
}

export function getUserLooks(id, query = {}):Action {
  return (dispatch, getState) => {
    const state = getState().profile;
    const newState = Object.assign({}, state.query, query, {
      page: {
        size: 10,
        number: 1
      }
    });
    if(newState.page === 1) {
      dispatch(showLoader());
    }
    const params = Object.assign({}, {id: id}, query);
    return dispatch(rest.actions.user_looks(params, {}, (err, userLooksData) => {
      if (!err && userLooksData) {
        let looksData = {
          data: userLooksData,
          userId: id,
        }
        dispatch(setUserLooks(looksData));
        dispatch(hideLoader());
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

export function setUserLooks(data):Action {
  return {
    type: SET_USER_LOOKS,
    payload: data
  };
}
