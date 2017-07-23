// @flow

import rest from '../api/rest';

// Actions
export const SET_USER_FOLLOWS_DATA = 'SET_USER_FOLLOWS_DATA';
export const INIT_USER_FOLLOWS = 'INIT_USER_FOLLOWS';

export function followUpdate(id) {
  return (dispatch) => {
    dispatch(follow(id));
  };
}

export function unFollowUpdate(id) {
  return (dispatch) => {
    dispatch(unfollow(id));
  };
}

export function follow(id) {
  return (dispatch) => {
    dispatch(rest.actions.follows.post({ user_id: id }, {}));
  };
}

export function unfollow(id: number) {
  return (dispatch) => {
    dispatch(rest.actions.follows.delete({ user_id: id }));
  };
}

export function initUserFollows(data) {
  return {
    type: INIT_USER_FOLLOWS,
    payload: data
  };
}

export function setUserFollowsData(data) {
  return {
    type: SET_USER_FOLLOWS_DATA,
    payload: data
  };
}

export function getUserFollowsData(id, pageNumber = 1, pageSize = 25) {
  return (dispatch) => {
    return dispatch(rest.actions.follows({
      user_id: id,
      page: {
        size: pageSize,
        number: pageNumber
      }
    }, {}, (err, userFollowsData) => {
      if (!err && userFollowsData) {
        let followsData = {
          currId: id,
          follows: userFollowsData.follows
        };
        dispatch(setUserFollowsData(followsData));
      }
    }));
  };
}

