
import type { Action } from './types';

import rest from '../api/rest';

export const SET_USER = 'SET_USER';
export const LOGIN_VIA_FACEBOOK = 'LOGIN_VIA_FACEBOOK';

export function setUser(user:string):Action {
  return {
    type: SET_USER,
    payload: user,
  };
};

export function loginViaFacebook(data:string):Action {
  return (dispatch, getState) => {
    dispatch(rest.actions.facebook_sign_in(data));
  };
};
