import type { Action } from '../actions/types';
import rest from '../api/rest';
import Utils from '../Utils';
import { readEndpoint, setHeaders } from 'redux-json-api';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const LOAD_BRANDS = 'LOAD_BRANDS';
export const SET_BRANDS = 'SET_BRANDS';
export const SET_ITEM_SIZES = 'SET_ITEM_SIZES';
export const SET_OCCASION_TAGS = 'SET_OCCASION_TAGS';

export function loadCategories(data):Action {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(rest.actions.category_tags({}, (err, data) => {
        if (!err && data) {
          // load in another thread
          setTimeout(() => {
            Utils.preloadImages(data.tags.map(x => x.icon.url)).catch()
            Utils.preloadImages(data.tags.map(x => x.icon.url_hover)).catch();
          }, 1);

          resolve(dispatch({
            type: SET_CATEGORIES,
            payload: data
          }));
        } else {
          reject(err);
        }
      }));
    });
  };
}

export function loadBrands(term):Action {
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

export function loadItemSizes(categoryId):Action {
  return (dispatch) => {
    const params = {
      tag_id: categoryId
    };

    return new Promise((resolve, reject) => {
      return dispatch(rest.actions.sizes(params, (err, data) => {
        if (!err && data) {
          resolve(dispatch({
            type: SET_ITEM_SIZES,
            payload: data
          }));
        } else {
          reject(err);
        }
      }));
    });
  };
}

export function loadOccasionTags(data):Action {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(rest.actions.occasion_tags({}, (err, data) => {
        if (!err && data) {
          resolve(dispatch({
            type: SET_OCCASION_TAGS,
            payload: data
          }));
        } else {
          reject(err);
        }
      }));
    });
  };
}