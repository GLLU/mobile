import rest from '../api/rest';
import { normalize } from 'normalizr';
import { followeeSchema } from '../schemas/schemas';
import { setUsers } from './users';
import * as followMapper from '../mappers/followMapper';
// Actions
export const SET_USER_FOLLOWERS_DATA = 'SET_USER_FOLLOWERS_DATA';
export const START_FETCH_FOLLOWERS = 'followers.START_FETCH_FOLLOWERS';
export const INIT_USER_FOLLOWERS = 'INIT_USER_FOLLOWERS';

export function setUserFollowersData(data) {
  return {
    type: SET_USER_FOLLOWERS_DATA,
    payload: data
  };
}

export function getUserFollowersData(id, pageNumber = 1, pageSize = 25) {
  return (dispatch) => {

    if (pageNumber === 1) {
      dispatch({ type: START_FETCH_FOLLOWERS });
    }

    return dispatch(rest.actions.followers({
      user_id: id,
      page: {
        size: pageSize,
        number: pageNumber
      }
    }, {}, (err, userFollowersData) => {
      if (!err && userFollowersData) {
        const userFollowsDataMapped = userFollowersData.follows.map(followMapper.mapFollower);
        const normalizedUserFollowsData = normalize(userFollowsDataMapped, [followeeSchema]);
        dispatch(setUsers(normalizedUserFollowsData.entities.users))
        const serializedFollowsArray = _.map(normalizedUserFollowsData.result, (followId) => normalizedUserFollowsData.entities.follows[followId])
        let followersData = {
          currId: id,
          followers: serializedFollowsArray
        };
        dispatch(setUserFollowersData(followersData));
      }
    }));
  };
}

export function initUserFollowers(data) {
  return {
    type: INIT_USER_FOLLOWERS,
    payload: data
  };
}

