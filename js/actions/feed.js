import type { Action } from '../actions/types';
import { showLoader, hideLoader } from './index';
import _ from 'lodash';
import rest from '../api/rest';

export const SET_FLAT_LOOKS_FEED_DATA = 'SET_FLAT_LOOKS_FEED_DATA';
export const RESET_FEED_DATA = 'RESET_FEED_DATA';

const parseQueryFromState = function(state) {
  const params = Object.assign({}, state, { category: state.category ? state.category.name : null })
  return params;
}

export function getFeed(query):Action {
  return (dispatch, getState) => {
    dispatch(showLoader());
    const state = getState().feed;
    const newState = Object.assign({}, state.query, query, {
      page: {
        size: 10,
        number: 1
      }
    });
    console.log('newState', newState);
    const params = parseQueryFromState(newState);
    return new Promise((resolve, reject) => {
      return dispatch(rest.actions.feeds(params, (err, data) => {
        if (!err && data) {
          console.log('feed data', data, newState)
          dispatch(setFeedData({data, query: newState}));
          dispatch(hideLoader());
          resolve();
        } else {
          dispatch(hideLoader());
          reject();
        }
      }));
    });
  };
}

export function resetFeed():Action {
  return (dispatch, getState) => {
    dispatch(showLoader());
    const params = {
      type: 'relevant',
      category: null,
      term: '',
      page: {
        size: 10,
        number: 1
      }
    };
    return new Promise((resolve, reject) => {
      return dispatch(rest.actions.feeds(params, (err, data) => {
        if (!err && data) {
          dispatch({
            type: RESET_FEED_DATA,
            payload: { 
              data,
              query: params
            }
          });
          dispatch(hideLoader());
          resolve();
        } else {
          dispatch(hideLoader());
          reject();
        }
      }));
    });
  };
}

export function loadMore():Action {
  return (dispatch, getState) => {
    const state = getState().feed;
    const nextPageNumber = state.query.page.number + 1;
    const newState = _.merge(state.query, {page: { number: nextPageNumber }});
    const params = parseQueryFromState(newState);
    return new Promise((resolve, reject) => {
      return dispatch(rest.actions.feeds(params, (err, data) => {
        if (!err && data) {
          console.log('feed data', data, newState)
          dispatch(setFeedData({data, query: newState, loadMore: true}));
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
