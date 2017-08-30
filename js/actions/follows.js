// @flow

import rest from '../api/rest';
import { normalize } from 'normalizr';
import { followeeSchema } from '../schemas/schemas';
import { setUsers } from './users';
import * as followMapper from '../mappers/followMapper';

// Actions
export const SET_USER_FOLLOWS_DATA = 'SET_USER_FOLLOWS_DATA';
export const START_FETCHING_FOLLOWING = 'following.START_FETCHING_FOLLOWING';
export const INIT_USER_FOLLOWS = 'INIT_USER_FOLLOWS';
export const UPDATE_USER_FOLLOW_STATUS = 'UPDATE_USER_FOLLOW_STATUS';
import FollowsService from '../services/followsService';
import { getFollowingFeed } from './feed';

export function followUpdate(id) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_USER_FOLLOW_STATUS,
      userId: id,
    });
    FollowsService.follow(id).then((data) => {
      const query = getState().feed.following.query;
      dispatch(getFollowingFeed(query));
    });
  };
}

export function unFollowUpdate(id) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_USER_FOLLOW_STATUS,
      userId: id,
    });
    FollowsService.unFollow(id).then((data) => {
      const query = getState().feed.following.query;
      dispatch(getFollowingFeed(query));
    });
  };
}

export function initUserFollows(data) {
  return {
    type: INIT_USER_FOLLOWS,
    payload: data,
  };
}

export function setUserFollowsData(data) {
  return {
    type: SET_USER_FOLLOWS_DATA,
    payload: data,
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
        number: pageNumber,
      },
    }, {}, (err, userFollowsData) => {
      if (!err && userFollowsData) {
        const userFollowsDataMapped = userFollowsData.follows.map(followMapper.mapFollow);
        const normalizedUserFollowsData = normalize(userFollowsDataMapped, [followeeSchema]);
        dispatch(setUsers(normalizedUserFollowsData.entities.users));
        const serializedFollowsArray = _.map(normalizedUserFollowsData.result, followId => normalizedUserFollowsData.entities.follows[followId]);
        const followsData = {
          currId: id,
          follows: serializedFollowsArray,
        };
        dispatch(setUserFollowsData(followsData));
      }
    }));
  };
}

