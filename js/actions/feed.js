import type { Action } from '../actions/types';
import { showLoader, hideLoader } from './index';
import _ from 'lodash';
import rest from '../api/rest';

export const SET_FLAT_LOOKS_FEED_DATA = 'SET_FLAT_LOOKS_FEED_DATA';

export function getFeed(query):Action {
  return (dispatch, getState) => {
    // dispatch(showLoader());
    const state = getState().feed;
    const params = _.merge(state.query, query);
    console.log('query params', params);
    return new Promise((resolve, reject) => {
      return dispatch(rest.actions.feeds(params, (err, data) => {
        if (!err && data) {
          console.log('feed data',data)
          dispatch(setFeedData({data, query: params}));
          // dispatch(hideLoader());
          resolve();
        } else {
          reject();
        }
      }));
    });
  };
}

export function setFeedData(data):Action {
  return {
    type: SET_FLAT_LOOKS_FEED_DATA,
    payload: data
  };
}
