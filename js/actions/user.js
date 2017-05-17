import type { Action } from './types';
import { createEntity, setAccessToken } from 'redux-json-api';
import navigateTo from './sideBarNav';
import { showLoader, hideLoader, reset, showError, hideError, showFatalError, hideFatalError } from './index';
import Utils from '../Utils';
import rest from '../api/rest';
import _ from 'lodash';

export const SET_USER = 'SET_USER';
export const HIDE_TUTORIAL = 'HIDE_TUTORIAL';
export const UPDATE_STATS = 'UPDATE_STATS';
export const RESET_STATE = 'RESET_STATE';
export const SET_INVITATION_TOKEN = 'SET_INVITATION_TOKEN';
export const SET_INVITATION_IS_USED = 'SET_INVITATION_IS_USED';
export const SET_INVITATION_SHARE_TOKEN = 'SET_INVITATION_SHARE_TOKEN';

let api_key = ''
const setRestOptions = function(dispatch, rest, user) {
  api_key = user.api_key;
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

const signInFromRest = function(dispatch, data, invitation_token, invitationTokenIsUsed) {
  if (!data || _.isEmpty(data)) {
    return;
  }
  Utils.saveApiKeyToKeychain(data.user.email, data.user.api_key).then(() => {
    setRestOptions(dispatch, rest, data.user);
    dispatch(setUser(data.user));
    if(invitationTokenIsUsed === false) {
      dispatch(useInvitationCode(invitation_token))
      dispatch(setInvitationTokenIsUsed())
    }
    dispatch(createInvitationCode());
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

export function setInvitationToken(token):Action {

  return {
    type: SET_INVITATION_TOKEN,
    payload: token,
  };
}

export function setInvitationTokenIsUsed():Action {

  return {
    type: SET_INVITATION_IS_USED,
    payload: true,
  };
}

export function setInvitationInvitationShareToken(shareToken):Action {
  return {
    type: SET_INVITATION_SHARE_TOKEN,
    payload: shareToken,
  };
}

export function loginViaFacebook(data):Action {
  return (dispatch, getState) => {
    const user = getState().user;
    const invitation_is_used = user.invitation_is_used;
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
        signInFromRest(dispatch, data, user.invitation_token, invitation_is_used);
      } else {
        alert('Unable to login via Facebook');
      }
    }));
  };
}

export function useInvitationCode(token):Action {
  return (dispatch) => {
    return dispatch(rest.actions.invitation.post({}, {body: JSON.stringify({"token": token})}, (err, data) => {
      if (!err && !_.isEmpty(data)) {
        console.log('invitation token passed and approved: ',data)
      } else {
        alert('Unable to use invitation code');
      }
    }));
  }
}

export function createInvitationCode():Action {
  return (dispatch) => {
    return dispatch(rest.actions.invitation_create.post({}, {body: JSON.stringify({"limit_by_days": 3})}, (err, data) => {
      if (!err && !_.isEmpty(data)) {
        dispatch(setInvitationInvitationShareToken(data.invitation.token))
      } else {
        console.log('Unable to create invitation code ',err)
      }
    }));
  }
}

export function invitationCheckExistance(token, continueTo):Action {
  return (dispatch) => {
    return dispatch(rest.actions.invitation_check_if_exists.get({"token": token}, (err, data) => {
      if (!err && !_.isEmpty(data)) {
        if(data.invitation.is_valid) {
          dispatch(hideError())
          dispatch(setInvitationToken(data.invitation.token));
          switch(continueTo) {
            case 'genderselect':
              dispatch(navigateTo('genderselect', 'splashscreen'));
              break;
            case 'facebook':

                Utils.loginWithFacebook()
                  .then((data) => dispatch(loginViaFacebook(data)))
                  .catch((err) => console.log('facebook login Error',err))
              break;
            default:
          }

        }
      } else {
        dispatch(showError('*Code is wrong or expired'))
      }
    }));
  }
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
          console.log('err',err)
          reject(err);
        } else {
          console.log('goodsinguo')
          resolve(data);
        }
      }));
    }
  });
}

export function emailSignUp(data):Action {
  return (dispatch, getState) => {
    dispatch(hideFatalError());
    if(!_.isEmpty(data)) {
      console.log('blabbb1',data)
      signUp(dispatch, data).then(data => {
        const user = getState().user;
        const invitation_is_used = user.invitation_is_used;
        const invitation_token = user.invitation_token;
        signInFromRest(dispatch, data, invitation_token, invitation_is_used);
      }).catch(err => {
        console.log('blabbb')

      });
    } else {
      console.log('data',data)
      if (err.errors && err.errors.length > 0) {
        const pointers = [];
        let errorString = '';
        err.errors.map((error) => {
          pointers.push( _.capitalize(_.last(_.split(error.source.pointer, '/'))));
        });
        if(pointers.length === 1){
          dispatch(showFatalError(pointers[0]+' has already taken'))
        } else {
          for(let i = 0; i<pointers.length-1; i++) {
            errorString += pointers[i]+' & ';
          }
          dispatch(showFatalError(errorString+pointers[pointers.length-1]+' are already taken'))
        }
      } else {
        dispatch(showFatalError(`Unknown error: ${err}`));
      }
    }
  };
}

export function emailSignIn(data):Action {
  return (dispatch, getState) => {
    const body = { auth: data };
    const user = getState().user;
    const access_token = data.access_token;
    const expiration_time = data.expiration_time;
    return dispatch(rest.actions.auth.post(body, (err, data) => {
      if (!err && !_.isEmpty(data)) {
        signInFromRest(dispatch, data, access_token, expiration_time);
        dispatch(hideFatalError())
      } else {
        dispatch(showFatalError('Email/Password are incorrect'))
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


export function clearTutorial() {
  console.log('clear action')
  return (dispatch, getState) => {
    dispatch(hideTutorial())
  };
}

export function hideTutorial() {
  return (dispatch) => {
    dispatch({
      type: HIDE_TUTORIAL,
    });
  };
}