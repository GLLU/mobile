import * as _ from 'lodash'
import * as actions from '../actions/comments';

const initialState = {
  lookCommentsData: [],
  currId: -1
};

function setLookComments(state, action) {
  return {
    ...state,
    lookCommentsData: action.payload.comments,
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
  console.log('comment55',comment)
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