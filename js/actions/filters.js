import type { Action } from '../actions/types';
import rest from '../api/rest';

import { readEndpoint, setHeaders } from 'redux-json-api';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';

export function loadCategories(data):Action {
  return (dispatch) => {
    return dispatch(readEndpoint('tags?kind=category')).then((data) => {
      console.log('tags category', data);
    });
  };
}

export function setCategories(data):Action {
  return {
    type: SET_CATEGORIES,
    payload: data
  };
}
