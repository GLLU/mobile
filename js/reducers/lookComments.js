import * as _ from 'lodash'
import * as actions from '../actions/comments';

const initialState = {
  lookCommentsData: [],
  currId: -1
};

function setLookComments(state: State, action): State {
  let lookCommentsData = action.payload.comments;
  if (action.payload.currId === state.currId) {
    lookCommentsData.unshift(...state.lookCommentsData)
  }
  return {
    ...state,
    lookCommentsData,
    currId: action.payload.currId
  };
}

function initLookComments(state: State): State {
  return {
    ...state,
    ...initialState
  };
}

function addLookComment(state: State, action): State {
  let comment = action.payload;
  let lookCommentsData = _.union(state.lookCommentsData, [comment]);
  return {
    ...state,
    lookCommentsData
  };
}

export default function (state: State = initialState, action): State {
  switch (action.type) {
    case actions.SET_LOOK_COMMENTS_DATA:
      return setLookComments(state, action);
    case actions.INIT_LOOK_COMMENTS:
      return initLookComments(state);
    case actions.ADD_LOOK_COMMENT:
      return addLookComment(state, action);
    default:
      return state
  }
}