import * as actions from '../actions/follows';
import * as _ from 'lodash';

const initialState = {
  userFollowsData: [],
  currId: -1,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.SET_USER_FOLLOWS_DATA: {
      let userFollowsData = action.payload.follows
      if (action.payload.currId === state.currId) {
        userFollowsData = _.unionBy(state.userFollowsData, userFollowsData, follow => follow.id);
      }
      return {
        ...state,
        userFollowsData,
        currId: action.payload.currId,
        isLoading: false,
      };
    }
    case actions.START_FETCHING_FOLLOWING: {
      return { ...state, isLoading: true };
    }
    case actions.INIT_USER_FOLLOWS:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
