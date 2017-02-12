import type { Action } from './types';
import { createEntity, setAccessToken } from 'redux-json-api';
import navigateTo from './sideBarNav';
import rest from '../api/rest';
import { showLoader, hideLoader, reset, showError, showWarning, hideError, hideWarning } from './index';
import Util from '../Util';
import _ from 'lodash';

export const SET_USER = 'SET_USER';
export const UPDATE_STATS = 'UPDATE_STATS';

const setRestOptions = function(rest, key) {
  rest.use("options", function() {
    return {
      headers: {
        "Authorization": `Token token=${key}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    };
  });
}

const signInFromRest = function(dispatch, data) {
  console.log('api key', data.user.api_key)
  Util.saveApiKeyToKeychain(data.user.email, data.user.api_key).then(() => {
    console.log('saved to key chain');
    setRestOptions(rest, data.user.api_key);
    dispatch(setUser(data.user));
    dispatch(resetUserNavigation());
  })
  
};

export function resetUserNavigation() {
  console.log('resetUserNavigation');
  return (dispatch, getState) => {
    const navigation = getState().cardNavigation;
    dispatch(reset([
      {
        key: 'feedscreen',
        index: 0,
      },
    ], navigation.key, 0));
    dispatch(navigateTo('feedscreen'));
  }
}

export function setUser(user:string):Action {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function loginViaFacebook(data):Action {
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
      if (!err && data) {
        signInFromRest(dispatch, data);
      }
    }));
  };
}

export function emailSignUp(data):Action {
  return (dispatch) => {
    const body = {user: data };
    return dispatch(rest.actions.users.post(body, (err, data) => {
      if (!err && data) {
        signInFromRest(dispatch, data);
      } else {
        const pointers = [];
        let errorString = '';
        err.errors.map((error, index) => {
          pointers.push( _.capitalize(_.last(_.split(error.source.pointer, '/'))));
        });
        if(pointers.length === 1){
          dispatch(showError(pointers[0]+' has already taken'))
        } else {
          for(let i = 0; i<pointers.length-1; i++) {
            errorString += pointers[i]+' & ';
          }
          dispatch(showError(errorString+pointers[pointers.length-1]+' are already taken'))
        }
      }
    }));
  };
}

export function emailSignIn(data):Action {
  return (dispatch) => {
    const body = { auth: data };
    return dispatch(rest.actions.auth.post(body, (err, data) => {
      if (!err && data) {
        signInFromRest(dispatch, data);
      } else {
        dispatch(showError('Email/Password are incorrect'))
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
  return (dispatch) => {
    dispatch(showLoader());
    dispatch(rest.actions.stats({id}, (err, data) => {
      if (!err) {
        dispatch(statsUpdate(data));
        dispatch(hideLoader());
      }
    }));
  };
}

export function checkLogin() {
  return (dispatch, getState) => {
    const user = getState().user;
    if (user && user.id != -1) {
      Util.getKeychainData().then(credentials => {
        console.log('credentials', credentials);
        setRestOptions(rest, credentials.password);
        dispatch(resetUserNavigation());
      })
    } else {
      console.log('user does not exist');  
    }
  }
}
