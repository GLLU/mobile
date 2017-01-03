import type { Action } from '../actions/types';
import rest from '../api/rest';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';

export function loadCategories(data):Action {
  return (dispatch) => {
    return dispatch(rest.actions.categories());
  };
}

export function setCategories(data):Action {
  return {
    type: SET_CATEGORIES,
    payload: data
  };
}
