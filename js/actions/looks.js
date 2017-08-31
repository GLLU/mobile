import {normalize, arrayOf} from 'normalizr';

import rest from '../api/rest';
import usersService from '../services/usersService';
import {unifyLooks} from '../utils/FeedUtils';
import {setLooksData, parseQueryFromState} from './feed';
import {lookSchema, lookListSchema} from '../schemas/schemas';
import {setFavoriteLooks, LOADING_FAVORITES_START} from '../actions/user';

export const SET_USER_LOOKS_DATA = 'SET_USER_LOOKS_DATA';
export const SET_USER_LOOKS = 'SET_USER_LOOKS';
export const SET_USER_LOOKS_FEED_DATA_QUEUE = 'SET_USER_LOOKS_FEED_DATA_QUEUE';
import _ from 'lodash';

const DEFAULT_PAGE_SIZE = 10;

export function getUserLooks(looksCall, query, retryCount = 0) {
  return (dispatch, getState) => {
    const query = Object.assign({}, query, {
      page: {
        size: 10,
        number: 1,
      },
      id: looksCall.id,
    });

    return usersService.getUserLooks(looksCall.id, { ...query, 'page[size]': 10, 'page[number]': 1 }).then((data) => {
      if (data) {
        const { looks, meta } = data;
        const normalizedLooksData = normalize(looks, [lookSchema]);
        const unfiedLooks = unifyLooks(normalizedLooksData.entities.looks, getState().looks.flatLooksData);
        dispatch(setLooksData({ flatLooksData: { ...unfiedLooks }, query }));
        dispatch(setUserLooks({ flatLooksIdData: normalizedLooksData.result, meta, query, currId: looksCall.id }));
        dispatch(loadMoreUserLooks(looksCall));
        Promise.resolve(data);
      } else if (retryCount < 5) {
        dispatch(getUserLooks(looksCall, query, retryCount + 1));
      } else {
        Promise.reject();
      }
    }).catch((error) => {
      Promise.reject(error);
    });
  };
}

export function loadMoreUserLooks(looksCall, retryCount = 0) {
  return (dispatch, getState) => {
    const state = getState().userLooks;
    const currPage = state.query.page.number;
    const nextPageNumber = currPage + 1;
    const newState = _.merge(state.query, { page: { number: nextPageNumber } });
    const params = parseQueryFromState(newState);

    const query = {
      page: {
        size: 10,
        number: nextPageNumber,
      },
      id: looksCall.id,
    };

    return usersService.getUserLooks(looksCall.id, params).then((data) => {
      if (data) {
        const { looks, meta } = data;
        const normalizedLooksData = normalize(looks, [lookSchema]);
        const unfiedLooks = unifyLooks(normalizedLooksData.entities.looks, getState().looks.flatLooksData);
        dispatch(setLooksData({ flatLooksData: { ...unfiedLooks }, query: newState }));
        const flatLooksIdData = state.flatLooksIdData.concat(normalizedLooksData.result);
        dispatch(setUserLooks({ flatLooksIdData, meta, query: newState, currId: looksCall.id }));
        Promise.resolve(data.looks);
      } else if (retryCount < 5) {
        dispatch(loadMoreUserLooks(looksCall, params, retryCount + 1));
      } else {
        Promise.reject();
      }
    }).catch((error) => {
      Promise.reject(error);
    });
  };
}

export function getFavoriteLooks() {
  return (dispatch, getState) => {

    const { favoriteLooks, id } = getState().user;
    const pageNumber = 1;
    const query = { page: { size: DEFAULT_PAGE_SIZE, number: pageNumber } };

    dispatch(({ type: LOADING_FAVORITES_START }));

    return usersService.getFavoriteLooks(id, query).then((data) => {
      const { looks } = data;
      const normalizedLooksData = normalize(looks, [lookSchema]);
      const unfiedLooks = unifyLooks(normalizedLooksData.entities.looks, getState().looks.flatLooksData);
      dispatch(setLooksData({ flatLooksData: { ...unfiedLooks } }));
      const flatLooksIdData = normalizedLooksData.result;
      dispatch(setFavoriteLooks({flatLooksIdData}));
      Promise.resolve(data.looks);
    });
  };
}

export function loadMoreFavoriteLooks() {
  return (dispatch, getState) => {

    const { favoriteLooks, id } = getState().user;
    const pageNumber = Math.floor(favoriteLooks.ids.length / DEFAULT_PAGE_SIZE) + 1;
    const query = { page: { size: DEFAULT_PAGE_SIZE, number: pageNumber } };

    dispatch(({ type: LOADING_FAVORITES_START }));

    return usersService.getFavoriteLooks(id, query).then((data) => {
      const { looks } = data;
      const normalizedLooksData = normalize(looks, [lookSchema]);
      const unfiedLooks = unifyLooks(normalizedLooksData.entities.looks, getState().looks.flatLooksData);
      dispatch(setLooksData({ flatLooksData: { ...unfiedLooks } }));
      const flatLooksIdData = favoriteLooks.concat(normalizedLooksData.result);
      dispatch(setFavoriteLooks({ flatLooksIdData }));
      Promise.resolve(data.looks);
    });
  };
}

export function getUserLooksData(data) {
  return (dispatch) => {
    const looksData = {
      currId: data.id,
      name: data.name,
      looksCount: data.looksCount,
      isMyProfile: data.isMyProfile,
    };
    dispatch(setUserLooksData(looksData));
  };
}

export function reportAbuse(look_id) {
  const data = { look_id };
  return dispatch => dispatch(rest.actions.report_abuse.post({}, { body: JSON.stringify(data) }, (err, data) => {
    if (!err && data) {
    } else {
    }
  }));
}

export function setUserLooksData(data) {
  return {
    type: SET_USER_LOOKS_DATA,
    payload: data,
  };
}

export function setUserLooks(data) {
  return {
    type: SET_USER_LOOKS,
    payload: data,
  };
}

export function setUserLooksDataQueue(data) {
  return {
    type: SET_USER_LOOKS_FEED_DATA_QUEUE,
    payload: data,
  };
}
