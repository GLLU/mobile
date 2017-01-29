
import type { Action } from './types';

import { createEntity, setAccessToken } from 'redux-json-api';
import navigateTo from './sideBarNav';
import rest from '../api/rest';

export const SET_USER = 'SET_USER';

const signInFromResponse = function(dispatch, response) {
  console.log('response', response, response.data.attributes['api-key']);
  dispatch(setAccessToken(response.data.attributes['api-key']));
  dispatch(navigateTo('feedscreen'));
};

const signInFromRest = function(dispatch, apiKey) {
  rest.use("options", function() {
    return { headers: {
      "Authorization": `Token token=${apiKey}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
    }};
  });
  dispatch(navigateTo('feedscreen'));
};

export function setUser(user:string):Action {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function loginViaFacebook(data):Action {
  console.log('action loginViaFacebook', data);


  return (dispatch) => {
    const access_token = data.access_token;
    const expiration_time = data.expiration_time;
    const body = {
      fb_auth: {
        access_token,
        expiration_time
      }
    };

    console.log('body', body);

    return dispatch(rest.actions.facebook_auth.post(body, (err, data) => {
      console.log('response', err, data);
      if (!err && data) {
        signInFromRest(dispatch, data.user.api_key);
      }
    }));

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
    const body = {user: data };

    console.log('action emailSignUp', body);

    return dispatch(rest.actions.users.post(body, (err, data) => {
      console.log('response', err, data);
      if (!err && data) {
        signInFromRest(dispatch, data.user.api_key);
      }
    }));
  };
}

export function emailSignIn(data):Action {
  return (dispatch) => {
    const body = { auth: data };
    console.log('action emailSignIn', body);

    return dispatch(rest.actions.auth.post(body, (err, data) => {
      console.log('response', err, data);
      if (!err && data) {
        signInFromRest(dispatch, data.user.api_key);
      }
    }));
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
