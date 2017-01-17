
import type { Action } from './types';

import { createEntity, readEndpoint, setAccessToken } from 'redux-json-api';
import navigateTo from './sideBarNav';

export const SET_USER = 'SET_USER';

export function setUser(user:string):Action {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function loginViaFacebook(data):Action {
  console.log('loginViaFacebook', data);

  return (dispatch) => {
    const entity = {
      "type": "facebook_auth",
      "attributes": {
        "access_token": data['access_token'],
        "expiration_time": data['expiration_time']
      }
    }
    return dispatch(createEntity(entity)).then((response) => {
      console.log('response', response, response.data.attributes['api-key']);
      dispatch(setAccessToken(response.data.attributes['api-key']));
      dispatch(navigateTo('feedscreen'));
    });
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
