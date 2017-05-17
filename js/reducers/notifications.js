import * as actions from '../actions/notifications';
import { notificationMapper } from '../mappers/notificationsMapper'

const initialState = {
  page: 0,
  newNotifications: false,
};

export default function (state = initialState, action) {

  switch (action.type) {
    case actions.SET_USER_NOTIFICATIONS: {
      let newNotifications = false;
      let allNotifications = []
      if(state.page === 0){
        allNotifications = action.payload.notificationsData.notifications.map(notificationMapper)
        newNotifications = action.payload.notificationsData.notifications.length > 0 ? !allNotifications[0].is_read : false
      } else {
        allNotifications = state.allNotifications
        allNotifications = allNotifications.concat(action.payload.notificationsData.notifications.map(notificationMapper))
      }
      return {
        ...state,
        allNotifications,
        page: action.payload.page,
        newNotifications
      };
    }
    case actions.ADD_USER_NOTIFICATION: {
      let existNotifications = state.allNotifications;
      let newNotification = notificationMapper(action.payload)
      existNotifications.unshift(newNotification)
      return {
        ...state,
        allNotifications: existNotifications,
      };
    }
    case actions.MARK_AS_READ_NOTIFICATION: {
      let existNotifications = state.allNotifications;
      let editedNotification = _.find(existNotifications, {id: action.payload})
      editedNotification.is_read = true
       let newNotificationArr = existNotifications.map((notification, index) => {
        if (notification.id === action.payload) {
          return editedNotification;
        }
        return notification
      })

      return {
        ...state,
        allNotifications: newNotificationArr,
      };
    }
    case actions.CLEAR_NEW_NOTIFICATIONS: {
      return {
        ...state,
        newNotifications: false,
      };
    }
    case actions.GOT_NEW_NOTIFICATIONS: {
      return {
        ...state,
        newNotifications: true,
      };
    }
    default:
      return state
  }
}