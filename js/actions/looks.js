import type { Action } from '../actions/types';
import rest from '../api/rest';
import { showLoader, hideLoader } from './index';

export const SET_LOOK_DATA = 'SET_LOOK_DATA';

export function getLook(lookId):Action {

    return (dispatch) => {
      dispatch(showLoader());
      return dispatch(rest.actions.looks({id: lookId},{}, (err, screenLookData) => {
        if (!err && screenLookData) {
          dispatch(setLookData(screenLookData));
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
