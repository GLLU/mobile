import type { Action } from '../actions/types';
import rest from '../api/rest';

import { readEndpoint, setHeaders } from 'redux-json-api';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const LOAD_BRANDS = 'LOAD_BRANDS';
export const SET_BRANDS = 'SET_BRANDS';
export const SET_ITEM_SIZES = 'SET_ITEM_SIZES';

export function loadCategories(data):Action {
  return (dispatch) => {
    const params = {kind: 'category'};
    return new Promise((resolve, reject) => {
      dispatch(rest.actions.tags(params, (err, data) => {
        if (!err && data) {
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

export function loadBrands(data):Action {
  return (dispatch) => {
    const params = {
      brand: {
        term: ''
      }
    };

    return new Promise((resolve, reject) => {
      return dispatch(rest.actions.brands(params, (err, data) => {
        if (!err && data) {
          resolve(dispatch({
            type: SET_BRANDS,
            payload: data
          }));
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
