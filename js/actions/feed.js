// @flow

import _ from 'lodash';
import LooksService from '../services/looksService';
import { normalize, schema } from 'normalizr';
import { unifyLooks } from '../utils/FeedUtils';

export const SET_FLAT_LOOKS_FEED_DATA = 'SET_FLAT_LOOKS_FEED_DATA';
export const SET_FLAT_LOOKS_DATA = 'SET_FLAT_LOOKS_DATA';
export const CLEAR_FEED_DATA = 'CLEAR_FEED_DATA';

const parseQueryFromState = function (state) {
  const parsedState = { ...state, 'page[size]': state.page.size, 'page[number]': state.page.number };
  if (state.category) {
    parsedState.category = state.category;
  }
  delete parsedState.page;
  return parsedState
};

export function getFeed(query, retryCount = 0) {
  return (dispatch) => {
    const newState = Object.assign({}, query, {
      page: {
        size: 10,
        number: 1,
      },
    });
    return LooksService.getLooks({ ...query, 'page[size]': 10, 'page[number]': 1 }).then((data) => {
      if (!_.isEmpty(data)) {
        const { looks, meta } = data;
        const normalizedLooksData = normalizeLooksData(looks)
        dispatch(setLooksData({ flatLooksData: normalizedLooksData.entities.looks, query: newState }));
        dispatch(setFeedData({ flatLooksIdData: normalizedLooksData.result.looks, meta, query: newState }));
        dispatch(loadMore());
        Promise.resolve(data);
      } else if (retryCount < 5) {
        dispatch(getFeed(query, retryCount + 1));
      } else {
        Promise.reject();
      }
    }).catch((error) => {
      Promise.reject(error);
    });
  };
}


export function normalizeLooksData(looks) {
  const newData = {}
  newData.looks = looks
  const LooksData = new schema.Entity('looks');
  const mySchema = { looks: [LooksData] };
  const normalizedData = normalize(newData, mySchema);
  return normalizedData;
}

export function clearFeed() {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: CLEAR_FEED_DATA,
    });
    resolve();
  });
}

export function loadMore(retryCount = 0) {
  return (dispatch, getState) => {
    const state = getState().feed;
    const currPage = state.query.page.number;
    const nextPageNumber = currPage + 1;
    const newState = _.merge(state.query, { page: { number: nextPageNumber } });
    const params = parseQueryFromState(newState);
    return new Promise((resolve, reject) => {
      return LooksService.getLooks(params).then((data) => {
        if (!_.isEmpty(data)) {
          const { looks, meta } = data;
          const normalizedLooksData = normalizeLooksData(looks)
          const unfiedLooks = unifyLooks(normalizedLooksData.entities.looks, getState().looks.flatLooksData)
          dispatch(setLooksData({ flatLooksData: { ...unfiedLooks }, query: newState }));
          const flatLooksIdData = state.flatLooksData.concat(normalizedLooksData.result.looks)
          dispatch(setFeedData({ flatLooksIdData, meta, query: newState }));
          resolve(data.looks);
        } else if (retryCount < 5) {
          dispatch(loadMore(params, retryCount + 1));
        } else {
          reject();
        }
      }).catch((error) => {
        reject(error);
      });
    });
  };
}

export function setFeedData(data: object) {
  return {
    type: SET_FLAT_LOOKS_FEED_DATA,
    payload: data,
  };
}

export function setLooksData(data: object) {
  return {
    type: SET_FLAT_LOOKS_DATA,
    payload: data,
  };
}


