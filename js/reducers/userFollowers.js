import * as actions from '../actions/followers';
import * as followMapper from '../mappers/followMapper'

const initialState = {
  userFollowersData: [],
  currId: -1
};

export default function (state: State = initialState, action): State {
  switch (action.type) {
    case actions.SET_USER_FOLLOWERS_DATA:
      let userFollowersData = action.payload.followers.map(followMapper.mapFollower);
      if (action.payload.currId === state.currId) {
        userFollowersData.push(...state.userFollowersData)
      }
      return {
        ...state,
        userFollowersData,
        currId: action.payload.currId
      };
    case actions.INIT_USER_FOLLOWERS:
      return {
        ...state,
        ...initialState
      };
    default:
      return state
  }
}