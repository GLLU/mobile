import rest from '../api/rest';
import { normalizeLooksData } from './feed';
import { unifyLooks } from '../utils/FeedUtils';

// Actions
export const SET_LOOK_LIKE_STATE = 'SET_LOOK_LIKE_STATE';
export const LOOK_UNLIKE = 'LOOK_UNLIKE';
export const LOOK_LIKE = 'LOOK_LIKE';

export function likeUpdate(id) {
  return (dispatch, getState) => {
    const looksData = getState().looks.flatLooksData
    const lookToUpdate = looksData[id];
    lookToUpdate.liked = true;
    lookToUpdate.likes++;
    console.log('lookToUpdate',lookToUpdate)
    const unifiedLooks = unifyLooks(lookToUpdate, looksData)
    console.log('unifiedLooks', unifiedLooks)
    dispatch({
      type: LOOK_LIKE,
      flatLooksData: unifiedLooks,
    });
    dispatch(like(id));
  };
}

export function unlikeUpdate(id) {
  return (dispatch, getState) => {
    const looksData = getState().looks.flatLooksData
    const lookToUpdate = looksData[id];
    lookToUpdate.liked = false;
    lookToUpdate.likes--;
    const unifiedLooks = unifyLooks(lookToUpdate, looksData)
    dispatch({
      type: LOOK_UNLIKE,
      flatLooksData: unifiedLooks,
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

