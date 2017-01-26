import type { Action } from '../actions/types';

import { readEndpoint } from 'redux-json-api';

export const SET_LOOK_DATA = 'SET_LOOK_DATA';

export function getLook(lookId):Action {
  console.log('lokkid',lookId)
    return (dispatch) => {
        return dispatch(readEndpoint(`looks/`+lookId+``)).then((screenLookData) => {
            console.log('look data', screenLookData);
            // const looks = Util.createFlatLooksObj(feedData.data);
             dispatch(setLookData(screenLookData));
        });
    };
}


export function setLookData(data):Action {
  return {
    type: SET_LOOK_DATA,
    payload: data
  };
}
