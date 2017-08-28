import _ from 'lodash';
import { SET_USERS_DATA } from '../actions/users';

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
    default:
      return state;
  }
}
