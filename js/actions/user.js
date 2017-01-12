
import type { Action } from './types';

import rest from '../api/rest';

export const SET_USER = 'SET_USER';

export function setUser(user:string):Action {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function loginViaFacebook(data):Action {
  return (dispatch) => {
    return dispatch(rest.actions.facebook_sign_in({}, { body: JSON.stringify(data) }));
  };
}

export function emailSignUp(data):Action {
  return (dispatch) => {
    return dispatch(rest.actions.email_sign_up({ user: data }))
  };
}

export function emailSignIn(data):Action {
  return (dispatch) => {
    return dispatch(rest.actions.email_sign_in({ data }))
  };
}

export function forgotPassword(email):Action {
  return (dispatch) => {
    return dispatch(rest.actions.forgot_password({ email }))
  };
}
