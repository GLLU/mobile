import rest from '../api/rest';
import Config from 'react-native-config';
import Pusher from 'pusher-js/react-native';
import { showLoader, hideLoader, navigateTo } from './index';

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
    return dispatch(rest.actions.getNotifications({"page[size]" : 20, "page[number]" : page,}, {}, (err, notificationsData) => {
      if (!err && notificationsData) {
        const userId = getState().user.id;
        _.isEmpty(getState().notifications.allNotifications) ? getPusherClient(dispatch, userId) : null
        dispatch(setUserNotifications(notificationsData, page++));
      }
    }));
  };
}

export function markAsReadNotifications(notificationId) {
  console.log('before call')
  return (dispatch, getState) => {
    console.log('before2 call')
    return dispatch(rest.actions.markAsReadNotification.put({"id": notificationId}, {}, (err, notificationsData) => {
      console.log('after call', err)
      if (err) {
        console.log('err',err)
      }
    }));
  };
}

export function goToNotificationSubjectScreen(lookId, notificationId) {
  return (dispatch, getState) => {
    dispatch(showLoader())
    return dispatch(rest.actions.looks({"id": lookId}, {}, (err, lookData) => {
      if (!err && lookData) {
        console.log(' before looksData',lookData)
        lookData = mapNotificationLookObj(lookData.look)
        lookData.singleItem = true
        console.log(' after looksData',lookData)
        dispatch(markAsReadNotifications(notificationId))
        dispatch(navigateTo('looksScreen', 'feedscreen', lookData));
        dispatch(hideLoader())
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

function mapNotificationLookObj(look) {
  let cover;
  if(look.cover.type === 'video') {
    cover = _.find(look.cover.list, x => x.version === 'large_720');
  } else {
    cover = _.find(look.cover.list, x => x.version === 'medium');
  }

  return Object.assign({}, {
    liked: look.is_liked,
    type: look.user_size.body_type,
    id: look.id,
    likes: look.likes,
    user_id: look.user_id,
    uri: cover.url ? cover.url : null,
    width: cover ? cover.width : null,
    height: cover ? cover.height : null,
    coverType: look.cover.type,
    avatar: look.user.avatar,
    name: look.user.name,
    username: look.user.username,
    about_me: look.user.about_me,
    items: look.items,
    state: look.state,
  });
}

