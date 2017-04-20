import rest from '../api/rest';
import Config from 'react-native-config';
import Pusher from 'pusher-js/react-native';

// Actions
export const SET_USER_NOTIFICATIONS = 'SET_USER_NOTIFICATIONS';
export const ADD_USER_NOTIFICATION = 'ADD_USER_NOTIFICATION';

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

export function getNotifications() {

  return (dispatch, getState) => {
    let page = getState().notifications.page+1
    return dispatch(rest.actions.notifications({"page[size]" : 2, "page[number]" : page,}, {}, (err, notificationsData) => {
      if (!err && notificationsData) {
        const userId = getState().user.id;
        _.isEmpty(getState().notifications.allNotifications) ? getPusherClient(dispatch, userId) : null
        dispatch(setUserNotifications(notificationsData, page++));
      }
    }));
  };
}

function getPusherClient(dispatch, userId) {
  const pusher = new Pusher(Config.PUSHER_KEY, {
    encrypted: true
  });
  const channel = pusher.subscribe('notifications_'+userId);
  channel.bind('Like', function(data) {
      dispatch(addUserNotification(data.message))
  });
}

