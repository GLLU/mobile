import type { Action } from '../actions/types';
import { showLoader, hideLoader } from './index';

import rest from '../api/rest';

export const SET_FLAT_LOOKS_FEED_DATA = 'SET_FLAT_LOOKS_FEED_DATA';

export function getFeed(type, category='', term=''):Action {
  return (dispatch) => {
    dispatch(showLoader());
    const params = { type, category, term };
    return dispatch(rest.actions.feeds(params, (err, data) => {
      if (!err && data) {
        console.log('feed data',data)
        dispatch(setFeedData(data));
        dispatch(hideLoader());
      }
    }));
  };
}

export function setFeedData(data):Action {
  return {
    type: SET_FLAT_LOOKS_FEED_DATA,
    payload: data
  };
}


