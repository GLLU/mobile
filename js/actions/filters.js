import rest from '../api/rest';
import { chain } from "lodash";

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_BRANDS = 'SET_BRANDS';
export const SET_OCCASION_TAGS = 'SET_OCCASION_TAGS';

export function loadCategories(gender) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const query= {
        gender,
        page: {
          size: 200,
          number: 1
        }
      };
      dispatch(rest.actions.category_tags(query, (err, data) => {
        if (!err && data) {

          resolve(dispatch({
            type: SET_CATEGORIES,
            payload: {
              tags:data.tags,
              meta:data.meta
            }
          }));
        } else {
          reject(err);
        }
      }));
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

export function loadOccasionTags() {
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