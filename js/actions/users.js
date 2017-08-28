import { arrayOf } from 'normalizr';
import {unifyUsers} from '../utils/UsersUtils';

export const SET_USERS_DATA = 'SET_USERS_DATA';

export function setUsers(users) {
  return (dispatch, getState) => {
    const unfiedLooks = unifyUsers(users, getState().users.usersData);
    dispatch(setUsersData(unfiedLooks));
  };
}

export function setUsersData(usersData) {
  return {
    type: SET_USERS_DATA,
    payload: usersData,
  };
}
