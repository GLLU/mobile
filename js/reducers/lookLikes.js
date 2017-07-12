import * as actions from '../actions/lookLikes';
import * as lookLikes from '../mappers/lookLikesMapper'
import * as _ from "lodash";

const initialState = {
  lookLikesData: [],
  currId: -1
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.SET_LOOK_LIKES: {
      let lookLikesData = action.payload.likes.map(lookLikes.map);
      if (action.payload.currId === state.currId) {
        lookLikesData = _.unionBy(state.lookLikesData, lookLikesData, like=>like.id);
      }
      return {
        ...state,
        lookLikesData,
        currId: action.payload.currId
      };
    }
    case actions.INIT_LOOK_LIKES:
      return {
        ...state,
        ...initialState
      };
    default:
      return state
  }
}