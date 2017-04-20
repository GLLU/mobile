import type { Action } from './types';
import { createEntity, setAccessToken } from 'redux-json-api';
import navigateTo from './sideBarNav';
import { showLoader, hideLoader, reset, showError, hideError } from './index';
import Utils from '../Utils';
import rest from '../api/rest';
import _ from 'lodash';

export const SET_USER = 'SET_USER';
export const UPDATE_STATS = 'UPDATE_STATS';
export const RESET_STATE = 'RESET_STATE';

let api_key = ''
const setRestOptions = function(dispatch, rest, user) {
  api_key = user.api_key;
  console.log('apikey',api_key)
  rest.use("options", function() {
    return {
      headers: {
        "Authorization": `Token token=${user.api_key}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    };
  }).use("responseHandler", (err, data) => {
    if (err) {
      if (err.errors && err.errors.length > 0) {
        const error = _.first(err.errors);
        if (error == "Bad Credentials") {
          dispatch(navigateTo('splashscreen'));
        }
      }
      Utils.notifyRequestError(new Error(JSON.stringify(err)), data);
    } else {
      console.log("SUCCESS", data)
    }
  });
}

const signInFromRest = function(dispatch, data) {
  if (!data || _.isEmpty(data)) {
    return;
  }
  Utils.saveApiKeyToKeychain(data.user.email, data.user.api_key).then(() => {
    setRestOptions(dispatch, rest, data.user);
    dispatch(setUser(data.user));
    dispatch(resetUserNavigation());
  })
};

export function resetUserNavigation() {
  return (dispatch, getState) => {
    const navigation = getState().cardNavigation;
    dispatch(reset([
      {
        key: 'feedscreen',
        index: 0,
      },
    ], navigation.key));
    dispatch(navigateTo('feedscreen', 'feedscreen'));
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
      } else {
        alert('Unable to login via Facebook');
      }
    }));
  };
}

const signUp = function(dispatch, data) {
  return new Promise((resolve, reject) => {
    const avatar = data['avatar']
    if (avatar) {
      // do post with file upload
      delete data['avatar'];
      const formData = [];
      Object.keys(data).forEach(function (key) {
        formData.push({
          name: `user[${key}]`,
          data: data[key], 
        });
      });
      Utils.postMultipartForm('', '/users', formData, 'user[avatar]', avatar).then(resolve, reject);
    } else {
      // normal rest
      const body = {user: data};
      dispatch(rest.actions.users.post({}, { body: JSON.stringify(body) }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }));
    }
  });
}

export function emailSignUp(data):Action {
  return (dispatch) => {
    dispatch(hideError());
    if(data) {
      signUp(dispatch, data).then(data => {
        signInFromRest(dispatch, data);
      }).catch(err => {
        if (err.errors && err.errors.length > 0) {
          const pointers = [];
          let errorString = '';
          err.errors.map((error) => {
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
        } else {
          dispatch(showError(`Unknown error: ${err}`));
        }
      });
    }
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
  const data = { email }
  return (dispatch) => {
    return dispatch(rest.actions.password_recovery.post({} ,{ body: JSON.stringify(data) } , (err, data) => {
      if (!err && data) {
        console.log('PASSWORD RECOVERY:', data)
      } else {
        console.log('password recovery Failed', err)
      }
    }));
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
      Utils.getKeychainData().then(credentials => {
        if (credentials) {
          setRestOptions(dispatch, rest, _.merge(user, {api_key: credentials.password}));
          dispatch(rest.actions.auth.get({}, (err, data) => {
            if (!err) {
              dispatch(setUser(data.user));
            } else {
              console.log('unable to invalidate user data', err);
            }
          }));
          dispatch(resetUserNavigation());
        }
      })
    } else {
      console.log('user does not exist');
    }
  }
}

export function changeUserAboutMe(data) {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch(rest.actions.changeUserAboutMe.put({ id: data.id }, { body: JSON.stringify(data) }, (err, data) => {
      if (!err) {
        dispatch(setUser(data.user));
        dispatch(hideLoader());
      }
    }))
  }
}

export function changeUserAvatar(data) {
  const image = data.image;
  const id = data.id;
  return (dispatch, getState) => {
    dispatch(showLoader());
    return new Promise((resolve, reject) => {
      const user = getState().user;
      if (user && user.id != -1) {
        Utils.postMultipartForm(api_key, `/users/${id}`, [], 'user[avatar]', image, 'PUT').then(data => {
          resolve(dispatch(setUser(data.user)));
          dispatch(hideLoader());
        }).catch(reject);
      } else {
        reject('Authorization error')
      }
    });

  }
}

export function logout() {
  return (dispatch, getState) => {
    const navigation = getState().cardNavigation;
    dispatch(reset([
      {
        key: 'splashscreen',
        index: 0,
      },
    ], navigation.key));
    Utils.resetKeychainData().then(() => {
      dispatch({
        type: RESET_STATE
      });
    });
  };
}