import _ from 'lodash';
import { SET_USERS_DATA } from '../actions/users';
import { UPDATE_USER_FOLLOW_STATUS } from '../actions/follows';

const initialState = {
  usersData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USERS_DATA: {
      return {
        ...state,
        usersData: action.payload,
      };
    }
    case UPDATE_USER_FOLLOW_STATUS:
      return {
        ...state,
        usersData: {
          ...state.usersData,
          [action.userId]: {...state.usersData[action.userId], isFollowing: !state.usersData[action.userId].isFollowing}
        },
      };
    default:
      return state;
  }
}
