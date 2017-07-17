import _ from 'lodash';
import rest from '../api/rest';
import LooksService from '../services/looksService';
import i18n from 'react-native-i18n';
import { normalize, schema } from 'normalizr';

export const SET_FLAT_LOOKS_FEED_DATA = 'SET_FLAT_LOOKS_FEED_DATA';
export const SET_FLAT_LOOKS_FEED_DATA_QUEUE = 'SET_FLAT_LOOKS_FEED_DATA_QUEUE';
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
  return (dispatch, getState) => {
    const newState = Object.assign({}, query, {
      page: {
        size: 10,
        number: 1,
      },
    });
    return LooksService.getLooks({ ...query, 'page[size]': 10, 'page[number]': 1 }).then((data) => {
      if (!_.isEmpty(data)) {
        const { looksIdsArray, looksData, meta } = data;
        const normalizedLooksData = normalizeLooksData(looksData, getState())
        dispatch(setLooksData({ flatLooksData: normalizedLooksData, query: newState }));
        dispatch(setFeedData({ looksIdsArray, meta, query: newState }));
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


function normalizeLooksData(looksData, state) {
  const currentLooksData = state.looks.flatLooksData;
  const newData = {}
  newData.looks = looksData
  const LooksData = new schema.Entity('looks');
  const mySchema = { looks: [LooksData] };
  const normalizedData = normalize(newData, mySchema);
  const flatLooksData = Object.assign({}, currentLooksData, normalizedData.entities.looks);
  return flatLooksData;
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
      if (state.flatLooksDataQueue.length > 0 && currPage > 1) {
        dispatch(setFeedData({ looksIdsArray: state.flatLooksDataQueue, meta: state.meta, query: newState }));
      }
      return LooksService.getLooks(params).then((data) => {
        if (!_.isEmpty(data)) {
          const { looksIdsArray, looksData, meta } = data;
          const normalizedLooksData = normalizeLooksData(looksData, getState())
          dispatch(setLooksData({ flatLooksData: normalizedLooksData, query: newState }));
          dispatch(setFeedDataQueue({ looksIdsArray, meta, query: newState }));
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

export function setFeedData(data) {
  return {
    type: SET_FLAT_LOOKS_FEED_DATA,
    payload: data,
  };
}

export function setLooksData(data) {
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
