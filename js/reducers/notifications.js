import * as actions from '../actions/notifications';

const initialState = {
};

export default function (state = initialState, action) {

  switch (action.type) {
    case actions.SET_USER_NOTIFICATIONS: {
      return {
        ...state,
        ...action.payload.notifications,
      };
    }
    default:
      return state
  }
}