import type { Action } from '../actions/types';
import Util from '../Util';

import { readEndpoint } from 'redux-json-api';
import rest from '../api/rest';

export const SET_FLAT_LOOKS_FEED_DATA = 'SET_FLAT_LOOKS_FEED_DATA';

export function getFeed(type, category='', term=''):Action {
  return (dispatch) => {
    const params = { type, category, term };
    console.log('params', params);
    const feedTypeQuery = `feed[type]=`+type;
    const feedCategoryQuery = `&feed[category]=`+category
    const feedTermQuery = `&feed[term]=`+term;
    const query = feedTypeQuery+feedCategoryQuery+feedTermQuery
    return dispatch(rest.actions.feeds(params, (err, data) => {
      console.log('dataaa',data);
      if (!err && data) {
        dispatch(setFeedData(data));
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


