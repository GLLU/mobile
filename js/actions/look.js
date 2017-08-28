// @flow

import rest from '../api/rest';

// Actions
export const SET_LOOK_LIKE_STATE = 'SET_LOOK_LIKE_STATE';
export const LOOK_UNLIKE = 'LOOK_UNLIKE';
export const LOOK_LIKE = 'LOOK_LIKE';

export function likeUpdate(id) {
  return (dispatch) => {
    dispatch({
      type: LOOK_LIKE,
      lookId: id,
    });
    dispatch(like(id));
  };
}

export function unlikeUpdate(id: number) {
  return (dispatch) => {
    dispatch({
      type: LOOK_UNLIKE,
      lookId: id,
    });
    dispatch(unlike(id));
  };
}

export function like(id) {
  return (dispatch) => {
    dispatch(rest.actions.likes.post({look_id: id}, {}));
  };
}

export function unlike(id) {
  return (dispatch) => {
    dispatch(rest.actions.likes.delete({look_id: id}));
  };
}

export function updateFavorite(isFavorite, lookId) {

}

