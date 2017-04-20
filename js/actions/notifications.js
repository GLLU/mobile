import rest from '../api/rest';
import Config from 'react-native-config';
import Pusher from 'pusher-js/react-native';

// Actions
export const SET_USER_NOTIFICATIONS = 'SET_USER_NOTIFICATIONS';
export const ADD_USER_NOTIFICATION = 'ADD_USER_NOTIFICATION';

export function setUserNotifications(data) {
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

export function getNotifications() {
  return (dispatch, getState) => {
    return dispatch(rest.actions.notifications({}, {}, (err, notificationsData) => {
      if (!err && notificationsData) {
        dispatch(setUserNotifications(notificationsData));
        const userId = getState().user.id;
        getPusherClient(userId);
      }
    }));
  };
}

function getPusherClient(userId) {
  console.log('Config.PUSHER_KEY',Config.PUSHER_KEY)
  const pusher = new Pusher(Config.PUSHER_KEY, {
    encrypted: true
  });
  const channel = pusher.subscribe('notifications_'+userId);
  channel.bind('Like', function(data) {
    console.warn('got push notification',data.message);
  });
}

