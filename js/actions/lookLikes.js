import rest from '../api/rest';
import * as lookLikes from '../mappers/lookLikesMapper'
import { normalize } from 'normalizr';
import { userLikeSchema } from '../schemas/schemas';
import { setUsers } from './users';
// Actions
export const SET_LOOK_LIKES = 'SET_LOOK_LIKES';
export const INIT_LOOK_LIKES = 'INIT_LOOK_LIKES';

export function setLookLikes(data) {
  return (dispatch) => {
    dispatch({
      type: SET_LOOK_LIKES,
      payload: data
    });
  };
}

export function initLookLikes(data) {
  return (dispatch) => {
    dispatch({
      type: INIT_LOOK_LIKES,
      payload: data
    });
  };
}

export function getLookLikes(id, pageNumber = 1, pageSize = 25) {
  return (dispatch) => {
    return dispatch(rest.actions.likes.get({
      look_id: id,
      page:{
        size:pageSize,
        number:pageNumber
      }
    }, {}, (err, lookLikesData) => {
      if (!err && lookLikesData) {
        const mappedLookLikesData = lookLikesData.likes.map(lookLikes.map);
        const normalizedUserLikesData = normalize(mappedLookLikesData, [userLikeSchema]);
        dispatch(setUsers(normalizedUserLikesData.entities.users))
        const serializedLikesArray = _.map(normalizedUserLikesData.result, (followId) => normalizedUserLikesData.entities.likes[followId])
        const likesData = {
          currId: id,
          likes: serializedLikesArray
        };
        dispatch(setLookLikes(likesData));
      }
    }));
  };
}
