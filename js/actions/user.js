
import type { Action } from './types';

import { createEntity, setAccessToken } from 'redux-json-api';
import navigateTo from './sideBarNav';

export const SET_USER = 'SET_USER';

const signInFromResponse = function(dispatch, response) {
  console.log('response', response, response.data.attributes['api-key']);
  dispatch(setAccessToken(response.data.attributes['api-key']));
  dispatch(navigateTo('feedscreen'));
};

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

    return dispatch(createEntity(entity)).then((response) => signInFromResponse(dispatch, response));
  };
}

export function emailSignUp(data):Action {
  return (dispatch) => {
    const entity = {
      "type": "users",
      "attributes": data
    }

    return dispatch(createEntity(entity)).then((response) => signInFromResponse(dispatch, response));
  };
}

export function emailSignIn(data):Action {
  return (dispatch) => {
    const entity = {
      "type": "auth",
      "attributes": data
    }

    return dispatch(createEntity(entity)).then((response) => signInFromResponse(dispatch, response));
  };
}

export function forgotPassword(email):Action {
  return (dispatch) => {
    const entity = {
      "type": "password_recovery",
      "attributes": { email }
    }
    return dispatch(createEntity(entity));
  };
}
