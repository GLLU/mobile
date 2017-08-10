import rest from '../api/rest';
import {chain} from "lodash";

import ColorsService from '../services/ColorsService';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_BRANDS = 'SET_BRANDS';
export const SET_OCCASION_TAGS = 'SET_OCCASION_TAGS';
export const OPEN_FEED_FILTER = 'OPEN_FEED_FILTER';
export const CLOSE_FEED_FILTER = 'CLOSE_FEED_FILTER';
export const SET_COLORS = 'filters.SET_COLORS';

export function getColors() {
  return (dispatch, getState) => {
    ColorsService.getColors().then((colors) => {
      dispatch({ type: SET_COLORS, colors });
    });
  };
}
export function loadCategories(gender) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const query = {
        gender,
        page: {
          size: 200,
          number: 1
        }
      };
      if (getState().filters.categories.length === 0) {
        dispatch(rest.actions.category_tags(query, (err, data) => {
          if (!err && data) {

            resolve(dispatch({
              type: SET_CATEGORIES,
              payload: {
                tags: data.tags,
                meta: data.meta
              }
            }));
          } else {
            reject(err);
          }
        }));
      }
    });
  };
}

export function loadBrands(term) {
  return (dispatch) => {
    const params = {
      brand: {
        term: term
      }
    };

    return new Promise((resolve, reject) => {
      return dispatch(rest.actions.brands(params, (err, data) => {
        if (!err && data) {
          dispatch({
            type: SET_BRANDS,
            payload: data
          });
          resolve(data.brands);
        } else {
          reject(err);
        }
      }));
    });
  };
}

export function loadOccasionTags(gender) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const query = {
        gender,
        page: {
          size: 200,
          number: 1
        }
      };
      if (getState().filters.occasion_tags.length === 0) {
        dispatch(rest.actions.occasion_tags(query, (err, data) => {
          if (!err && data) {
            resolve(dispatch({
              type: SET_OCCASION_TAGS,
              payload: {
                tags: data.tags,
                meta: data.meta
              }
            }));
          } else {
            reject(err);
          }
        }));
      }
    });
  };
}

export function toggleFiltersMenus(feedType) {
  return (dispatch, getState) => {
    const menuStatus = getState().filters.filterMenuStatus[feedType]
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