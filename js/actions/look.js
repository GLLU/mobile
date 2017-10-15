// @flow

import rest from '../api/rest';
import userService from '../services/usersService';
import looksService from '../services/looksService';
// Actions
export const SET_LOOK_LIKE_STATE = 'SET_LOOK_LIKE_STATE';
export const LOOK_UNLIKE = 'LOOK_UNLIKE';
export const LOOK_LIKE = 'LOOK_LIKE';
export const DELETE_LOOK = 'DELETE_LOOK';
export const ADD_TO_FAVORITES = 'look.ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'look.REMOVE_FROM_FAVORITES';

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
    dispatch(rest.actions.likes.post({ look_id: id }, {}));
  };
}

export function unlike(id) {
  return (dispatch) => {
    dispatch(rest.actions.likes.delete({ look_id: id }));
  };
}

export function deleteLook(id: number) {
  return (dispatch, getState) => {
    dispatch({type: DELETE_LOOK, lookId: id});
    looksService.deleteLook(id);
  }
}

export function updateFavorite(isFavorite, lookId) {
  return (dispatch, getState) => {

    const userId = getState().user.id;

    if (isFavorite) {
      dispatch({ type: ADD_TO_FAVORITES, lookId });
      userService.setFavoriteLook(userId, lookId);

    }
    else {
      dispatch({ type: REMOVE_FROM_FAVORITES, lookId });
      userService.removeFavoriteLook(userId, lookId);
    }
  }
}

