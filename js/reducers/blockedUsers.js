import { SET_BLOCKED_USERS } from "../actions/user";

const initialState = {
  blockedUsers: [],
  meta: {
    currentPage:0,
    total: 0,
  },
};

export default function (state = initialState, action) {
  const {blockedUsers,meta} = action;
  switch(action.type){
    case SET_BLOCKED_USERS:
      return {
        ...state,
        blockedUsers,
        meta,
      };
    default:
      return state
  }
}