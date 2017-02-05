import type { Action } from '../actions/types';
import rest from '../api/rest';

export const SET_LOOK_DATA = 'SET_LOOK_DATA';

export function getLook(lookId):Action {
  return (dispatch) => {
    return dispatch(rest.actions.looks({id: lookId},{}, (err, screenLookData) => {
      if (!err && screenLookData) {
        dispatch(setLookData(screenLookData));
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
