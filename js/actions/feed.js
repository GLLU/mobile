// @flow

import _ from 'lodash';
import LooksService from '../services/looksService';
import { normalize, arrayOf } from 'normalizr';
import { unifyLooks } from '../utils/FeedUtils';
import { lookSchema, lookListSchema } from '../schemas/schemas';
export const SET_FLAT_LOOKS_FEED_DATA = 'SET_FLAT_LOOKS_FEED_DATA';
export const SET_FLAT_LOOKS_DATA = 'SET_FLAT_LOOKS_DATA';
export const CLEAR_FEED_DATA = 'CLEAR_FEED_DATA';
export const START_FETCHING = 'START_FETCHING';
export const FINISH_FETCHING = 'FINISH_FETCHING';
export const FEED_TYPE_FOLLOWING = 'following';
export const FEED_TYPE_BEST_MATCH = 'bestMatch';
export const FEED_TYPE_WHATS_HOT = 'whatsHot';
export const OPEN_FEED_FILTER = 'OPEN_FEED_FILTER';
export const CLOSE_FEED_FILTER = 'CLOSE_FEED_FILTER';
export const CHANGE_FILTERS_GENDER = 'CHANGE_FILTERS_GENDER';


export const parseQueryFromState = function (state: array) {
  const parsedState = { ...state, 'page[size]': state.page.size, 'page[number]': state.page.number };
  if (state.category) {
    parsedState.category = state.category;
  }
  delete parsedState.page;
  return parsedState;
};

export function getFeed(query: object, feedType = FEED_TYPE_BEST_MATCH, retryCount = 0) {
  return (dispatch, getState) => {
    const newState = Object.assign({}, query, {
      page: {
        size: 10,
        number: 1,
      },
    });
    dispatch(startFechting(feedType));
    delete query.page;
    return Promise.all([LooksService.getLooks({ ...query, 'page[size]': 10, 'page[number]': 1 }), LooksService.getVideos({ ...query, 'page[size]': 1, 'page[number]': 1 })])
      .then((multiData) => {
      if (multiData && multiData[0] && multiData[1]) {

        let { looks, meta } = multiData[0];
        const videoLook = multiData[1].looks[0];

        if (videoLook) {

          // If the look has been retrieved in getLooks service, don't add the video retrieved
          const videoExistsOnLooks = looks.filter(function (obj) {
            return obj.id === videoLook.id;
          })[0];

          if (!videoExistsOnLooks) {
            looks.splice(2, 0, videoLook);
          }
        }

        const normalizedLooksData = normalize(looks, [lookSchema]);
        const unfiedLooks = unifyLooks(normalizedLooksData.entities.looks, getState().looks.flatLooksData);
        dispatch(setLooksData({ flatLooksData: { ...unfiedLooks }, query: newState }));
        dispatch(setFeedData({ flatLooksIdData: normalizedLooksData.result, meta, query: newState, feedType }));
        dispatch(finishFechting(feedType));
        dispatch(loadMore(feedType));
        Promise.resolve(multiData[0]);
      } else {
        Promise.reject();
      }
    }).catch((error) => {
      if (retryCount < 5) {
        dispatch(getFeed(query, feedType, retryCount + 1));
      }
      Promise.reject(error);
    });
  };
}

export function getFollowingFeed(query: object) {
  return getFeed(query, FEED_TYPE_FOLLOWING);
}

export function getBestMatchFeed(query: object) {
  return (dispatch, getState) => {
    const newQuery = Object.assign({}, query, {
      gender: getState().user.gender,
      body_type: getState().user.user_size ? getState().user.user_size.body_type : ''
    });
    return dispatch(getFeed(newQuery, FEED_TYPE_BEST_MATCH));
  };
}

export function getWhatsHotFeed(query: object) {
  return getFeed(query, FEED_TYPE_WHATS_HOT);
}

export function clearFeed() {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: CLEAR_FEED_DATA,
    });
    resolve();
  });
}

export function loadMore(feedType = FEED_TYPE_BEST_MATCH, retryCount = 0) {
  return (dispatch, getState) => {
    const state = getState().feed[feedType];
    const currPage = state.query.page.number;
    const nextPageNumber = currPage + 1;
    const newState = _.merge(state.query, { page: { number: nextPageNumber } });
    const params = parseQueryFromState(newState);
    return LooksService.getLooks(params).then((data) => {
      if (data) {
        const { looks, meta } = data;
        const normalizedLooksData = normalize(looks, [lookSchema]);
        const unfiedLooks = unifyLooks(normalizedLooksData.entities.looks, getState().looks.flatLooksData);
        dispatch(setLooksData({ flatLooksData: { ...unfiedLooks }, query: newState }));
        const flatLooksIdData = state.flatLooksIdData.concat(normalizedLooksData.result);
        dispatch(setFeedData({ flatLooksIdData, meta, query: newState, feedType }));
        Promise.resolve(data.looks);
      } else if (retryCount < 5) {
        dispatch(loadMore(params, retryCount + 1));
      } else {
        Promise.reject();
      }
    }).catch((error) => {
      Promise.reject(error);
    });
  };
}

export function toggleFiltersMenus(feedType) {
  return (dispatch, getState) => {
    const menuStatus = getState().feed[feedType].isFiltersMenuOpen;
    if (menuStatus) {
      dispatch(closeFilterFeedMenu(feedType));
    } else {
      dispatch(openFilterFeedMenu(feedType));
    }
  };
}

function openFilterFeedMenu(feedType: string) {
  return {
    type: OPEN_FEED_FILTER,
    feedType,
  };
}

function closeFilterFeedMenu(feedType: string) {
  return {
    type: CLOSE_FEED_FILTER,
    feedType,
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

export function startFechting(feedType: string) {
  return {
    type: START_FETCHING,
    feedType,
  };
}

export function finishFechting(feedType: string) {
  return {
    type: FINISH_FETCHING,
    feedType,
  };
}

export function changeFiltersGender(feedType: string, gender: string) {
  return {
    type: CHANGE_FILTERS_GENDER,
    payload: { feedType, gender },
  };
}

