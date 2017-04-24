import * as actions from '../actions/notifications';
import { notificationMapper } from '../mappers/notificationsMapper'

const initialState = {
  page: 0
};

export default function (state = initialState, action) {

  switch (action.type) {
    case actions.SET_USER_NOTIFICATIONS: {
      let allNotifications = []
      if(state.page === 0){
        allNotifications = action.payload.notificationsData.notifications.map(notificationMapper)
      } else {
        allNotifications = state.allNotifications
        allNotifications = allNotifications.concat(action.payload.notificationsData.notifications.map(notificationMapper))
      }
      return {
        ...state,
        allNotifications,
        page: action.payload.page
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
    default:
      return state
  }
}