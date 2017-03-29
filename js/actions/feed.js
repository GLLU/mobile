import type { Action } from '../actions/types';
import _ from 'lodash';
import rest from '../api/rest';

export const SET_FLAT_LOOKS_FEED_DATA = 'SET_FLAT_LOOKS_FEED_DATA';
export const RESET_FEED_DATA = 'RESET_FEED_DATA';

const parseQueryFromState = function(state) {
  return Object.assign({}, state, { category: state.category ? state.category.name : null })
}

export function getFeed(query):Action {
  return (dispatch) => {
    const newState = Object.assign({}, query, {
      page: {
        size: 10,
        number: 1
      }
    });
    return new Promise((resolve, reject) => {
      return dispatch(rest.actions.feeds(newState, (err, data) => {
        if (!err && data) {
          dispatch(setFeedData({data, query: newState}));
          resolve(data.looks);
        } else {
          reject();
        }
      }));
    });
  };
}

export function resetFeed():Action {
  return (dispatch, getState) => {
    const params = {
      gender: null,
      body_type: null,
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
          resolve(data.looks);
        } else {
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
          dispatch(setFeedData({data, query: newState, loadMore: true}));
          resolve(data.looks);
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
