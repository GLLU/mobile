import { UPDATE_STATS } from '../actions/user';

const initialState = {
  following: -1
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_STATS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
