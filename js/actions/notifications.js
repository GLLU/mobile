import rest from '../api/rest';
import Config from 'react-native-config';
import Pusher from 'pusher-js/react-native';
import {normalize, arrayOf} from 'normalizr';

import * as feedLookMapper from '../mappers/feedLookMapper';
import NotificationsService from '../services/NotificationsService';
import { unifyLooks } from '../utils/FeedUtils';
import { setLooksData } from './feed';
import { lookSchema } from '../schemas/schemas';

// Actions
export const SET_USER_NOTIFICATIONS = 'SET_USER_NOTIFICATIONS';
export const START_FETCHING_NOTIFICATIONS = 'notifications.START_FETCHING_NOTIFICATIONS';
export const ADD_USER_NOTIFICATION = 'ADD_USER_NOTIFICATION';
export const MARK_AS_READ_NOTIFICATION = 'MARK_AS_READ_NOTIFICATION';
export const CLEAR_NEW_NOTIFICATIONS = 'CLEAR_NEW_NOTIFICATIONS';
export const GOT_NEW_NOTIFICATIONS = 'GOT_NEW_NOTIFICATIONS';

export function setUserNotifications(notificationsData, page) {
  const data = {
    notificationsData,
    page,
  };
  return {
    type: SET_USER_NOTIFICATIONS,
    payload: data,
  };
}

export function addUserNotification(data) {
  return {
    type: ADD_USER_NOTIFICATION,
    payload: data,
  };
}

export function markAsRead(notificationId) {
  return {
    type: MARK_AS_READ_NOTIFICATION,
    payload: notificationId,
  };
}

export function clearNewNotifications() {
  return {
    type: CLEAR_NEW_NOTIFICATIONS,
    payload: false,
  };
}

export function gotNewNotifications() {
  return {
    type: GOT_NEW_NOTIFICATIONS,
    payload: true,
  };
}

export function getNotifications(retryCount = 0) {
  return (dispatch, getState) => {
    let page = getState().notifications.page + 1;

    if (page === 1) {
      dispatch({ type: START_FETCHING_NOTIFICATIONS });
    }

    return NotificationsService.getNotifications({
      'page[size]': 20,
      'page[number]': page,
    }).then((notificationsData) => {
      const userId = getState().user.id;
      _.isEmpty(getState().notifications.allNotifications) ? getPusherClient(dispatch, userId) : null;
      dispatch(setUserNotifications(notificationsData, page++));
    }).catch((error) => {
      if (retryCount < 5) {
        dispatch(getNotifications(retryCount + 1));
      }
    });
  };
}

export function markAsReadNotifications(notificationId) {
  return (dispatch, getState) => dispatch(rest.actions.markAsReadNotification.put({ id: notificationId }, {}, (err, notificationsData) => {
    dispatch(markAsRead(notificationId));
    if (err) {
      console.log('err', err);
    }
  }));
}

export function goToNotificationSubjectScreen(lookId, notificationId) {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    dispatch(rest.actions.looks({ id: lookId }, {}, (err, lookData) => {
      if (!err && lookData) {
        lookData = feedLookMapper.map(lookData.look);
        lookData.singleItem = true;
        dispatch(markAsReadNotifications(notificationId));
        const normalizedLooksData = normalize([lookData], [lookSchema]);
        const unfiedLooks = unifyLooks(normalizedLooksData.entities.looks, getState().looks.flatLooksData);
        dispatch(setLooksData({ flatLooksData: { ...unfiedLooks } }));
        resolve(lookData);
      } else {
        reject(err);
      }
    }));
  });
}

function getPusherClient(dispatch, userId) {
  const pusher = new Pusher(Config.PUSHER_KEY, {
    encrypted: true,
  });
  const channel = pusher.subscribe(`notifications_${userId}`);
  channel.bind_global((event, data) => {
    if (event === 'Like' || event === 'Follow' || event === 'Comment') {
      dispatch(addUserNotification(data.message));
      dispatch(gotNewNotifications());
    }
  });
}

