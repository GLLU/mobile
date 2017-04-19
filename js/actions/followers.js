import rest from '../api/rest';

// Actions
export const SET_USER_FOLLOWERS_DATA = 'SET_USER_FOLLOWERS_DATA';
export const INIT_USER_FOLLOWERS = 'INIT_USER_FOLLOWERS';

export function setUserFollowersData(data): Action {
  return {
    type: SET_USER_FOLLOWERS_DATA,
    payload: data
  };
}

export function getUserFollowersData(id, pageNumber = 1, pageSize = 25) {
  return (dispatch) => {
    return dispatch(rest.actions.followers({
      user_id: id,
      page:{
        size:pageSize,
        number:pageNumber
      }
    }, {}, (err, userFollowersData) => {
      if (!err && userFollowersData) {
        let followersData = {
          currId: id,
          followers: userFollowersData.follows
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

