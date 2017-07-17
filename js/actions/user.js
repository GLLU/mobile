import {showError, hideError, showFatalError, hideFatalError} from './index';
import Utils from '../utils';
import rest from '../api/rest';
import _ from 'lodash';
import i18n from 'react-native-i18n';
import LoginService from '../services/loginService';
import NetworkManager from '../network/NetworkManager';

export const SET_USER = 'SET_USER';
export const HIDE_TUTORIAL = 'HIDE_TUTORIAL';
export const HIDE_BODY_MODAL = 'HIDE_BODY_MODAL';
export const UPDATE_STATS = 'UPDATE_STATS';
export const RESET_STATE = 'RESET_STATE';
export const SET_INVITATION_TOKEN = 'SET_INVITATION_TOKEN';
export const SET_INVITATION_IS_USED = 'SET_INVITATION_IS_USED';
export const SET_INVITATION_SHARE_TOKEN = 'SET_INVITATION_SHARE_TOKEN';

let api_key = '';
const setRestOptions = function (dispatch, rest, user) {

  api_key = user.api_key;
  rest.use('options', () => ({
    headers: {
      Authorization: `Token token=${user.api_key}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })).use('responseHandler', (err, data) => {
    if (err) {
      console.log('ERROR', err, data);
      Utils.notifyRequestError(new Error(JSON.stringify(err)), data);
    } else {
      console.log('SUCCESS', data);
    }
  });
};

const signInFromRest = function (dispatch, data, invitation_token, invitationTokenIsUsed) {
  return new Promise((resolve, reject) => {
    if (!data || _.isEmpty(data)) {
      reject();
    }
    Utils.saveApiKeyToKeychain(data.user.email, data.user.api_key).then(() => {
      NetworkManager.setToken(data.user.api_key);
      setRestOptions(dispatch, rest, data.user);
      dispatch(setUser(data.user));
      if (invitationTokenIsUsed === false) {
        dispatch(useInvitationCode(invitation_token));
        dispatch(setInvitationTokenIsUsed());
      }
      dispatch(createInvitationCode());
      resolve(data.user);
    });
  });
};

export function setUser(user: string) {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function setInvitationToken(token) {
  return {
    type: SET_INVITATION_TOKEN,
    payload: token,
  };
}

export function setInvitationTokenIsUsed() {
  return {
    type: SET_INVITATION_IS_USED,
    payload: true,
  };
}

export function setInvitationInvitationShareToken(shareToken) {
  return {
    type: SET_INVITATION_SHARE_TOKEN,
    payload: shareToken,
  };
}

export function loginViaFacebook(data) {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    const user = getState().user;
    const invitation_is_used = user.invitation_is_used;
    const access_token = data.access_token;
    const expiration_time = data.expiration_time;
    const body = {
      fb_auth: {
        access_token,
        expiration_time,
      },
    };

    dispatch(rest.actions.facebook_auth.post(body, (err, data) => {
      if (!err && data) {
        signInFromRest(dispatch, data, user.invitation_token, invitation_is_used).then(resolve).catch(reject);
      } else {
        reject('Unable to login via Facebook');
      }
    }));
  });
}

export function useInvitationCode(token) {
  return dispatch => dispatch(rest.actions.invitation.post({}, {body: JSON.stringify({token})}, (err, data) => {
    if (!err && !_.isEmpty(data)) {
      console.log('invitation token passed and approved: ', data);
    } else {
      alert('Unable to use invitation code');
    }
  }));
}

export function requestInvitation(data) {
  return (dispatch) => {
    console.log('data', data);
    return dispatch(rest.actions.invitation_request.post({}, {
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    }, (err, data) => {
      if (!err && !_.isEmpty(data)) {
        console.log('invitation request has been created: ', data);
      } else {
        alert('Unable to create an invitation request');
      }
    }));
  };
}

export function createInvitationCode() {
  return dispatch => dispatch(rest.actions.invitation_create.post({}, {body: JSON.stringify({limit_by_days: 999})}, (err, data) => {
    if (!err && !_.isEmpty(data)) {
      dispatch(setInvitationInvitationShareToken(data.invitation.token));
    } else {
      console.log('Unable to create invitation code ', err);
    }
  }));
}

export function invitationCheckExistance(token) {
  return dispatch => new Promise((resolve, reject) => dispatch(rest.actions.invitation_check_if_exists.get({token}, (err, data) => {
    if (!err && !_.isEmpty(data)) {
      if (data.invitation.is_valid) {
        dispatch(hideError());
        dispatch(setInvitationToken(data.invitation.token));
        resolve();
      } else {
        const error = '*Code is wrong or expired';
        dispatch(showError(error));
        resolve();
      }
    } else {
      const error = '*Code is wrong or expired';
      dispatch(showError(error));
      reject(error);
    }
  })));
}

const signUp = function (dispatch, data) {
  return new Promise((resolve, reject) => {
    const avatar = data.avatar;
    if (avatar) {
      // do post with file upload
      delete data.avatar;
      const formData = [];
      Object.keys(data).forEach((key) => {
        formData.push({
          name: `user[${key}]`,
          data: data[key],
        });
      });
      Utils.postMultipartForm('', '/users', formData, 'user[avatar]', avatar).then(resolve, reject);
    } else {
      // normal rest
      const body = {user: data};
      dispatch(rest.actions.users.post({}, {body: JSON.stringify(body)}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }));
    }
  });
};

export function emailSignUp(data) {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    dispatch(hideFatalError());
    if (data) {
      signUp(dispatch, data).then((data) => {
        const user = getState().user;
        const invitation_is_used = user.invitation_is_used;
        const invitation_token = user.invitation_token;
        signInFromRest(dispatch, data, invitation_token, invitation_is_used).then(resolve).catch(reject);
      }).catch((err) => {
        if (err.errors && err.errors.length > 0) {
          const pointers = [];
          let errorString = '';
          err.errors.map((error) => {
            pointers.push(_.capitalize(_.last(_.split(error.source.pointer, '/'))));
          });
          if (pointers.length === 1) {
            dispatch(showFatalError(`${pointers[0]} has already taken`));
          } else {
            for (let i = 0; i < pointers.length - 1; i++) {
              errorString += `${pointers[i]} & `;
            }
            dispatch(showFatalError(`${errorString + pointers[pointers.length - 1]} are already taken`));
          }
        } else {
          dispatch(showFatalError(`Unknown error: ${err}`));
        }
        reject(err);
      });
    }
  });
}

export function emailSignIn(data) {
  return dispatch => new Promise((resolve, reject) => {
    const body = {auth: data};
    const access_token = data.access_token;
    const expiration_time = data.expiration_time;

    return LoginService.signIn(body).then((user) => {
      if (user) {
        signInFromRest(dispatch, user, access_token, expiration_time).then(resolve).catch(reject);
        dispatch(hideFatalError());
      }
    }).catch(() => {
      const error = i18n.t('INVALID_LOGIN');
      dispatch(showFatalError(error));
      reject(error);
    });

    /*
     return dispatch(rest.actions.auth.post(body, (err, data) => {
     if (!err && !_.isEmpty(data)) {
     signInFromRest(dispatch, data, access_token, expiration_time).then(resolve).catch(reject);
     dispatch(hideFatalError())
     } else {
     const error='Email/Password are incorrect';
     dispatch(showFatalError(error))
     reject(error);
     }
     }));
     */
  });
}

export function forgotPassword(email) {
  const data = {email};
  return dispatch => dispatch(rest.actions.password_recovery.post({}, {body: JSON.stringify(data)}, (err, data) => {
    if (!err && data) {
      console.log('PASSWORD RECOVERY:', data);
    } else {
      console.log('password recovery Failed', err);
    }
  }));
}

export function statsUpdate(data) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_STATS,
      payload: data,
    });
  };
}

export function getStats(id) {
  return (dispatch) => {
    dispatch(rest.actions.stats({id}, (err, data) => {
      if (!err) {
        dispatch(statsUpdate(data));
      }
    }));
  };
}

export function checkLogin(user) {
  return dispatch => new Promise((resolve, reject) => {
    if (user && user.id != -1) {
      Utils.getKeychainData().then((credentials) => {
        if (credentials) {
          NetworkManager.setToken(user.api_key);
          setRestOptions(dispatch, rest, _.merge(user, {api_key: credentials.password}));
          dispatch(rest.actions.auth.get({}, (err, data) => {
            if (!err) {
              dispatch(setUser(data.user));
            } else {
              console.log('unable to invalidate user data', err);
              reject(err);
            }
          }));
          resolve(user);
        }
      });
    } else {
      const error = 'user does not exist';
      console.log(error);
      reject(error);
    }
  });
}

export function changeUserAboutMe(data) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(rest.actions.changeUserAboutMe.put({id: data.id}, {body: JSON.stringify(data)}, (err, data) => {
      if (!err && data) {
        dispatch(setUser(data.user));
        resolve(data.user);
      } else {
        reject(err);
      }
    }));
  });
}

export function changeUserAvatar(data) {
  const image = data.image;
  const id = data.id;
  return (dispatch, getState) => new Promise((resolve, reject) => {
    const user = getState().user;
    if (user && user.id != -1) {
      Utils.postMultipartForm(api_key, `/users/${id}`, [], 'user[avatar]', image, 'PUT').then((data) => {
        resolve(dispatch(setUser(data.user)));
      }).catch(reject);
    } else {
      reject('Authorization error');
    }
  });
}

export function logout() {
  return dispatch => new Promise((resolve, reject) => {
    Utils.resetKeychainData()
      .then(() => {
        dispatch({
          type: RESET_STATE,
        });
        resolve();
      })
      .catch(reject);
  });
}

export function clearTutorial() {
  return (dispatch, getState) => {
    dispatch(hideTutorial());
  };
}

export function hideTutorial() {
  return (dispatch) => {
    dispatch({
      type: HIDE_TUTORIAL,
    });
  };
}

export function clearBodyModal() {
  console.log('clear action');
  return (dispatch, getState) => {
    dispatch(hideBodyModal());
  };
}

export function hideBodyModal() {
  return (dispatch) => {
    dispatch({
      type: HIDE_BODY_MODAL,
    });
  };
}
