import rest from '../api/rest';
import Utils from '../utils';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_BRANDS = 'SET_BRANDS';
export const SET_OCCASION_TAGS = 'SET_OCCASION_TAGS';

export function loadCategories() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(rest.actions.category_tags({}, (err, data) => {
        if (!err && data) {
          // load in another thread
          setTimeout(() => {
            const tags = data.tags || [];
            Promise.all([
              Utils.preloadImages(tags.map(x => x.icon.url)),
              Utils.preloadImages(tags.map(x => x.icon.url_hover))
            ]).finally();
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

export function loadOccasionTags(data) {
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