import rest from '../api/rest';
import Config from 'react-native-config';
import Pusher from 'pusher-js/react-native';
import * as feedLookMapper from "../mappers/feedLookMapper";

// Actions
export const SET_USER_NOTIFICATIONS = 'SET_USER_NOTIFICATIONS';
export const ADD_USER_NOTIFICATION = 'ADD_USER_NOTIFICATION';
export const MARK_AS_READ_NOTIFICATION = 'MARK_AS_READ_NOTIFICATION';
export const CLEAR_NEW_NOTIFICATIONS = 'CLEAR_NEW_NOTIFICATIONS';
export const GOT_NEW_NOTIFICATIONS = 'GOT_NEW_NOTIFICATIONS';

export function setUserNotifications(notificationsData, page) {
  const data = {
    notificationsData,
    page
  }
  return {
    type: SET_USER_NOTIFICATIONS,
    payload: data
  };
}

export function addUserNotification(data) {
  return {
    type: ADD_USER_NOTIFICATION,
    payload: data
  };
}

export function markAsRead(notificationId) {
  return {
    type: MARK_AS_READ_NOTIFICATION,
    payload: notificationId
  };
}

export function clearNewNotifications() {
  return {
    type: CLEAR_NEW_NOTIFICATIONS,
    payload: false
  };
}

export function gotNewNotifications() {
  return {
    type: GOT_NEW_NOTIFICATIONS,
    payload: true
  };
}

export function getNotifications(retryCount = 0) {
  return (dispatch, getState) => {
    let page = getState().notifications.page+1
    return dispatch(rest.actions.getNotifications({"page[size]" : 20, "page[number]" : page,}, {}, (err, notificationsData) => {

      if (!err && !_.isEmpty(notificationsData)) {
        const userId = getState().user.id;
        _.isEmpty(getState().notifications.allNotifications) ? getPusherClient(dispatch, userId) : null
        dispatch(setUserNotifications(notificationsData, page++));
      } else {
        if(retryCount < 5) {
          dispatch(getNotifications(retryCount+1))
        }

      }
    }));
  };
}

export function markAsReadNotifications(notificationId) {
  return (dispatch, getState) => {
    return dispatch(rest.actions.markAsReadNotification.put({"id": notificationId}, {}, (err, notificationsData) => {
      dispatch(markAsRead(notificationId))
      if (err) {
        console.log('err',err)
      }
    }));
  };
}

export function goToNotificationSubjectScreen(lookId, notificationId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(rest.actions.looks({"id": lookId}, {}, (err, lookData) => {
        if (!err && lookData) {
          lookData = feedLookMapper.map(lookData.look);
          lookData.singleItem = true;
          console.log('notificationId', notificationId)
          dispatch(markAsReadNotifications(notificationId))
          resolve(lookData);
        }
        else{
          reject(err)
        }
      }));
    })
  };
}

function getPusherClient(dispatch, userId) {
  const pusher = new Pusher(Config.PUSHER_KEY, {
    encrypted: true
  });
  const channel = pusher.subscribe('notifications_'+userId);
  channel.bind_global(function(event, data) {
    if(event === 'Like' || event === 'Follow' || event === 'Comment') {
      dispatch(addUserNotification(data.message))
      dispatch(gotNewNotifications())

    }
  });
}

