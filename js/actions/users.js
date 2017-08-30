import { arrayOf } from 'normalizr';
import {unifyUsers} from '../utils/UsersUtils';

export const SET_USERS_DATA = 'SET_USERS_DATA';

export function setUsers(users) {
  return (dispatch, getState) => {
    const unfiedUsers = unifyUsers(users, getState().users.usersData);
    dispatch({
      type: SET_USERS_DATA,
      payload: unfiedUsers,
    });
  };
}

