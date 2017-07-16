import _ from 'lodash';
import rest from '../api/rest';

export const SET_FLAT_LOOKS_FEED_DATA = 'SET_FLAT_LOOKS_FEED_DATA';
export const SET_FLAT_LOOKS_FEED_DATA_QUEUE = 'SET_FLAT_LOOKS_FEED_DATA_QUEUE';
export const SET_FLAT_LOOKS_DATA = 'SET_FLAT_LOOKS_DATA';
export const CLEAR_FEED_DATA = 'CLEAR_FEED_DATA';

const parseQueryFromState = function(state) {
  return Object.assign({}, state, { category: state.category ? state.category.name : null })
}

export function getFeed(query, retryCount = 0) {
  return (dispatch) => {
    const newState = Object.assign({}, query, {
      page: {
        size: 10,
        number: 1
      }
    });
    return new Promise((resolve, reject) => {
      return dispatch(rest.actions.feeds(newState, (err, data) => {
        if (!err && !_.isEmpty(data)) {
          const feedLooksIdsArray = parseLooksArrayById(data.looks)
          dispatch(setLooksData({ data, query: newState }));
          dispatch(setFeedData({ feedLooksIdsArray, meta: data.meta, query: newState }));
          dispatch(loadMore())
          resolve(data.looks);
        } else {
          if(retryCount < 5) {
            dispatch(getFeed(query, retryCount+1))
          } else {
            reject();
          }

        }
      }));
    });
  };
}

function parseLooksArrayById(looks = []) {
  return _.map(looks, look => look.id);
}

export function clearFeed() {
  return (dispatch) => {
    return new Promise((resolve) => {
      dispatch({
        type: CLEAR_FEED_DATA
      });
      resolve();
    });
  };
}

export function loadMore(retryCount = 0) {
  return (dispatch, getState) => {
    const state = getState().feed;
    const currPage = state.query.page.number
    const nextPageNumber = currPage + 1;
    const newState = _.merge(state.query, {page: { number: nextPageNumber }});
    const params = parseQueryFromState(newState);
    return new Promise((resolve, reject) => {
      if(state.flatLooksDataQueue.length > 0 && currPage > 1) {
        const data = {looks: state.flatLooksDataQueue, meta: state.meta}
        dispatch(setFeedData({data, query: newState, loadMore: true}));
      }
      return dispatch(rest.actions.feeds(params, (err, data) => {
        if (!err && data) {
          const feedQueueLooksIdsArray = parseLooksArrayById(data.looks)
          dispatch(setFeedDataQueue({feedQueueLooksIdsArray, meta: data.meta, query: newState, loadMore: true}));
          resolve(data.looks);
        } else {
          if(retryCount < 5) {
            dispatch(loadMore(query, retryCount+1))
          } else {
            reject();
          }

        }
      }));
    });
  };
}

export function setFeedData(data) {
  return {
    type: SET_FLAT_LOOKS_FEED_DATA,
    payload: data,
  };
}

export function setLooksData(data) {
  console.log('bammm', data)
  return {
    type: SET_FLAT_LOOKS_DATA,
    payload: data,
  };
}

export function setFeedDataQueue(data) {
  return {
    type: SET_FLAT_LOOKS_FEED_DATA_QUEUE,
    payload: data,
  };
}
