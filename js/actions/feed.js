import type { Action } from '../actions/types';

import { readEndpoint } from 'redux-json-api';

export const SET_FEED_DATA = 'SET_FEED_DATA';

export function getFeed(feedType,feedCategory='',feedTerm=''):Action {
  const feedTypeQuery = `feed[type]=`+feedType;
  const feedCategoryQuery = `&feed[category]=`+feedCategory
  const feedTermQuery = `&feed[term]=`+feedTerm;
    return (dispatch) => {
        return dispatch(readEndpoint(`feed?`+feedTypeQuery+feedCategoryQuery+feedTermQuery+``)).then((feedData) => {
            console.log('feeds data', feedData);
            dispatch(setFeedData(feedData.data));
        });
    };
}

export function setFeedData(data):Action {
  return {
    type: SET_FEED_DATA,
    payload: data
  };
}
