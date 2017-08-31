// @flow

import {showError, hideError, showFatalError, hideFatalError} from './index';
import Utils from '../utils';
import rest from '../api/rest';
import _ from 'lodash';
import i18n from 'react-native-i18n';
import LoginService from '../services/loginService';
import NetworkManager from '../network/NetworkManager';
import UsersService from '../services/usersService';
import * as userMapper from '../mappers/userMapper';
import { normalize } from 'normalizr';
import { blockedSchema } from '../schemas/schemas';
import { setUsers } from './users';

export const SET_USER = 'SET_USER';
export const HIDE_TUTORIAL = 'HIDE_TUTORIAL';
export const HIDE_BODY_MODAL = 'HIDE_BODY_MODAL';
export const BODY_SHAPE_CHOOSEN = 'user.BODY_SHAPE_CHOOSEN';
export const HIDE_WALLET_BADGE = 'user.HIDE_WALLET_BADGE';
export const HIDE_CLOSET_WIZARD = 'user.HIDE_CLOSET_WIZARD';
export const UPDATE_STATS = 'UPDATE_STATS';
export const RESET_STATE = 'RESET_STATE';
export const HIDE_SWIPE_WIZARD = 'user.HIDE_SWIPE_WIZARD';
export const USER_BLOCKED = 'USER_BLOCKED';
export const USER_UNBLOCKED = 'USER_UNBLOCKED';
export const SET_BLOCKED_USERS = 'SET_BLOCKED_USERS';
export const SET_FAVORITE_LOOKS = 'user.SET_FAVORITE_LOOKS';
export const LOADING_FAVORITES_START = 'user.LOADING_FAVORITES_START';
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
export function hideWalletBadge() {
  return ({ type: HIDE_BODY_MODAL });
}
const signInFromRest = function (dispatch, data) {
  return new Promise((resolve, reject) => {
    if (!data || _.isEmpty(data)) {
      reject();
    }
    Utils.saveApiKeyToKeychain(data.user.email, data.user.api_key).then(() => {
      NetworkManager.setToken(data.user.api_key);
      setRestOptions(dispatch, rest, data.user);
      dispatch(setUser(data.user));
      resolve(data.user);
    });
  });
};

export function setUser(user: string) {
  return (dispatch) => {
    const mappedUser = userMapper.map(user)
    dispatch(setUsers({[mappedUser.id]: mappedUser}))
    dispatch({
      type: SET_USER,
      payload: mappedUser,
    });
  }
}

export function hideSwipeWizard() {
  return ({ type: HIDE_SWIPE_WIZARD });
}

export function hideClosetWizard() {
  return ({ type: HIDE_CLOSET_WIZARD });
}

export function loginViaFacebook(data) {
  return (dispatch, getState) => new Promise((resolve, reject) => {
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
        signInFromRest(dispatch, data).then(resolve).catch(reject);
      } else {
        reject('Unable to login via Facebook');
      }
    }));
  });
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
      Utils.postMultipartForm('', '/users', formData, 'user[avatar]', avatar, 'POST').then(resolve, reject);
    } else {
      // normal rest
      const body = { user: data };
      dispatch(rest.actions.users.post({}, { body: JSON.stringify(body) }, (err, data) => {
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
        signInFromRest(dispatch, data).then(resolve).catch(reject);
      }).catch((err) => {
        if (err.errors && err.errors.length > 0) {
          const pointers = [];
          err.errors.map((error) => {
            pointers.push(_.capitalize(_.last(_.split(error.source.pointer, '/'))));
          });
          if (pointers.length > 0) {
            dispatch(showFatalError(`${pointers[0]} ${err.errors[0].detail}`));
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
    const body = { auth: data };
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
  });
}

export function forgotPassword(email) {
  const data = { email };
  return dispatch => dispatch(rest.actions.password_recovery.post({}, { body: JSON.stringify(data) }, (err, data) => {
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
    dispatch(rest.actions.stats({ id }, (err, data) => {
      if (!err) {
        dispatch(statsUpdate(data));
      }
    }));
  };
}

export function checkLogin() {
  return dispatch => new Promise((resolve, reject) => {
    Utils.getKeychainData().then((credentials) => {
      if (credentials) {
        NetworkManager.setToken(credentials.password);
        setRestOptions(dispatch, rest, { api_key: credentials.password });
        dispatch(rest.actions.auth.get({}, (err, data) => {
          if (!err && data && data.user && data.user.id !== null && data.user.id !== -1) {
            dispatch(setUser(data.user));
          } else {
            console.log('unable to invalidate user data', err);
            reject(err);
          }
        }));
        resolve(true);
      }
      else {
        reject();
      }
    });
  });
}

export function changeUserAboutMe(data) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(rest.actions.changeUserAboutMe.put({ id: data.id }, { body: JSON.stringify(data) }, (err, data) => {
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

export function getBlockedUsers() {
  return (dispatch, getState) => {
    const state = getState();
    const userId = state.user.id;
    const nextPage = 1;
    UsersService.getBlockedUsers(userId, nextPage).then((data) => {
      const { blockedUsers } = getState().blockedUsers;
      const normalizedBlockedUsersData = normalize(data.blockedUsers, [blockedSchema]);
      dispatch(setUsers(normalizedBlockedUsersData.entities.blockedUsers))
      const blockedUsersUnion = _.unionBy(blockedUsers, normalizedBlockedUsersData.result);
      dispatch({
        type: SET_BLOCKED_USERS,
        blockedUsers: blockedUsersUnion,
        meta: {
          currentPage: nextPage,
          total: data.meta.total
        }
      });
    })
  };
}

export function getMoreBlockedUsers() {
  return (dispatch, getState) => {
    const state = getState();
    const userId = state.user.id;
    const { meta } = state.blockedUsers;
    const nextPage = meta.currentPage + 1;
    UsersService.getBlockedUsers(userId, nextPage).then((data) => {
      const { blockedUsers } = getState().blockedUsers;
      const normalizedBlockedUsersData = normalize(data.blockedUsers, [blockedSchema]);
      dispatch(setUsers(normalizedBlockedUsersData.entities.blockedUsers))
      const blockedUsersUnion = _.unionBy(blockedUsers, normalizedBlockedUsersData.result);
      dispatch({
        type: SET_BLOCKED_USERS,
        blockedUsers: blockedUsersUnion,
        meta: {
          currentPage: nextPage,
          total: data.meta.total
        }
      });
    })
  }
}

export function blockUser(blockedUserId) {
  return (dispatch, getState) => {
    const userId = getState().user.id;
    UsersService.block(userId, blockedUserId).then(() => {
      dispatch({
        type: USER_BLOCKED,
        userId,
        blockedUserId,
      });
    })
  };
}

export function unblockUser(blockedUserId) {
  return (dispatch, getState) => {
    const userId = getState().user.id;
    UsersService.unblock(userId, blockedUserId)
      .catch(err => ({}));//mute error
    const { blockedUsers, meta } = getState().blockedUsers;
    const blockedUsersWithoutUnblocked = _.filter(blockedUsers, userId => userId !== blockedUserId);
    dispatch({
      type: SET_BLOCKED_USERS,
      blockedUsers: blockedUsersWithoutUnblocked,
      meta: {
        currentPage: meta.currentPage,
        total: meta.total - 1
      }
    });
  };
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

export function setFavoriteLooks(data) {
  return ({type: SET_FAVORITE_LOOKS, looksIds: data.flatLooksIdData });
}

export function onBodyShapeChoosen() {
  return (dispatch, getState) => {
    dispatch({
      type: BODY_SHAPE_CHOOSEN,
    });
  };
}
