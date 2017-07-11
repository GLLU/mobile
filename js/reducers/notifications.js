import * as actions from '../actions/notifications';
import * as notificationsMapper from '../mappers/notificationsMapper'
import * as _ from "lodash";

const initialState = {
  page: 0,
  newNotifications: false,
};

export default function (state = initialState, action) {

  switch (action.type) {
    case actions.SET_USER_NOTIFICATIONS: {
      let newNotifications = false;
      let allNotifications = action.payload.notificationsData.notifications.map(notificationsMapper.map);
      if(state.page === 0){
        newNotifications = action.payload.notificationsData.notifications.length > 0 ? !allNotifications[0].is_read : false
      } else {
        allNotifications= _.unionBy(state.allNotifications, allNotifications, notification=>notification.id);
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
      let newNotification = notificationsMapper.map(action.payload)
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