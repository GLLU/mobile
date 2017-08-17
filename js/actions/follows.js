// @flow

import rest from '../api/rest';

// Actions
export const SET_USER_FOLLOWS_DATA = 'SET_USER_FOLLOWS_DATA';
export const START_FETCHING_FOLLOWING = 'following.START_FETCHING_FOLLOWING';
export const INIT_USER_FOLLOWS = 'INIT_USER_FOLLOWS';
import FollowsService from '../services/followsService';
import {getFollowingFeed} from './feed';

export function followUpdate(id) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      FollowsService.follow(id).then(() => {
        const query = getState().feed.following.query;
        dispatch(getFollowingFeed(query));
        resolve();
      });
    })
  };
}

export function unFollowUpdate(id) {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      FollowsService.unFollow(id).then(() => {
        const query = getState().feed.following.query;
        dispatch(getFollowingFeed(query));
        resolve();
      });
    })
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

    if (pageNumber === 1) {
      dispatch({ type: START_FETCHING_FOLLOWING });
    }

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

