
import type { Action } from './types';

import { createEntity, setAccessToken } from 'redux-json-api';
import navigateTo from './sideBarNav';
import rest from '../api/rest';

export const SET_USER = 'SET_USER';
export const UPDATE_STATS = 'UPDATE_STATS';

const signInFromResponse = function(dispatch, response) {
  console.log('response', response, response.data.attributes['api-key']);
  dispatch(setAccessToken(response.data.attributes['api-key']));
  dispatch(navigateTo('feedscreen'));
};

const signInFromRest = function(dispatch, data) {
  console.log('api key', data.user.api_key)
  rest.use("options", function() {
    return { headers: {
      "Authorization": `Token token=${data.user.api_key}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
    }};
  });
  dispatch(navigateTo('feedscreen'));
  dispatch(setUser(data.user));
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

    return dispatch(rest.actions.facebook_auth.post(body, (err, data) => {
      console.log('response', err, data);
      if (!err && data) {
        signInFromRest(dispatch, data);
      }
    }));
  };
}

export function emailSignUp(data):Action {
  return (dispatch) => {
    const body = {user: data };

    console.log('action emailSignUp', body);

    return dispatch(rest.actions.users.post(body, (err, data) => {
      console.log('response', err, data);
      if (!err && data) {
        signInFromRest(dispatch, data);
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
        signInFromRest(dispatch, data);
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

export function statsUpdate(data) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_STATS,
      payload: data
    });
  };
}

export function getStats(id) {
  console.log('id action', id);
  return (dispatch) => {
    dispatch(rest.actions.stats({id}, (err, data) => {
      if (!err) {
        console.log('data',data)
        dispatch(statsUpdate(data));
      }
    }));
  };
}

