import * as actions from '../actions/followers';
import * as _ from 'lodash';

const initialState = {
  userFollowersData: [],
  currId: -1,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.SET_USER_FOLLOWERS_DATA: {
      let userFollowersData = action.payload.followers
      if (action.payload.currId === state.currId) {
        userFollowersData = _.unionBy(state.userFollowersData, userFollowersData, follow => follow.id);
      }
      return {
        ...state,
        userFollowersData,
        currId: action.payload.currId,
        isLoading: false,
      };
    }

    case actions.START_FETCH_FOLLOWERS: {
      return { ...state, isLoading: true };
    }

    case actions.INIT_USER_FOLLOWERS:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
