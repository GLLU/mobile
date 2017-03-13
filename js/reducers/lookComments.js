import * as actions from '../actions/comments';

const initialState = {
  lookCommentsData: [],
  currId: -1
};

export default function (state: State = initialState, action): State {
  switch (action.type) {
    case actions.SET_LOOK_COMMENTS_DATA:
      let lookCommentsData = action.payload.comments;
      if (action.payload.currId === state.currId) {
        lookCommentsData.unshift(...state.lookCommentsData)
      }
      return {
        ...state,
        lookCommentsData,
        currId: action.payload.currId
      };
    case actions.INIT_LOOK_COMMENTS:
      return {
        ...state,
        ...initialState
      };
    default:
      return state
  }
}