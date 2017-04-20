import * as actions from '../actions/notifications';

const initialState = {
  page: 0
};

export default function (state = initialState, action) {

  switch (action.type) {
    case actions.SET_USER_NOTIFICATIONS: {
      let allNotifications = []
      if(state.page === 0){
        allNotifications = action.payload.notificationsData.notifications
      } else {
        allNotifications = state.allNotifications
        allNotifications = allNotifications.concat(action.payload.notificationsData.notifications)
      }
      return {
        ...state,
        allNotifications,
        page: action.payload.page
      };
    }
    case actions.ADD_USER_NOTIFICATION: {
      let existNotifications = state.allNotifications;
      existNotifications.unshift(action.payload)
      return {
        ...state,
        allNotifications: existNotifications,
      };
    }
    default:
      return state
  }
}