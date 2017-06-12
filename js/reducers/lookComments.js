import * as _ from 'lodash'
import * as actions from '../actions/comments';

const initialState = {
  lookCommentsData: [],
  currId: -1
};

function setLookComments(state, action) {
  let lookCommentsData = action.payload.comments;
  if (action.payload.currId === state.currId) {
    lookCommentsData = _.union(state.lookCommentsData, [action.payload.comments]);
  }
  return {
    ...state,
    lookCommentsData,
    currId: action.payload.currId
  };
}

function initLookComments(state) {
  return {
    ...state,
    ...initialState
  };
}

function addLookComment(state, action) {
  let comment = action.payload;
  let lookCommentsData = _.union(state.lookCommentsData, [comment]);
  return {
    ...state,
    lookCommentsData
  };
}

export default function (state = initialState, action) {
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