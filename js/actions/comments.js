import rest from '../api/rest';

// Actions
export const SET_LOOK_COMMENTS_DATA = 'SET_LOOK_COMMENTS_DATA';
export const INIT_LOOK_COMMENTS = 'INIT_LOOK_COMMENTS';
export const ADD_LOOK_COMMENT = 'ADD_LOOK_COMMENT';

export function setLookCommentsData(data): Action {
  return {
    type: SET_LOOK_COMMENTS_DATA,
    payload: data
  };
}

export function getLookCommentsData(id, pageNumber = 1, pageSize = 25): Action {
  return (dispatch) => {
    return dispatch(rest.actions.comments({
      look_id: id,
      page: {
        size: pageSize,
        number: pageNumber
      }
    }, {}, (err, lookCommentsData) => {
      if (!err && lookCommentsData) {
        let commentsData = {
          currId: id,
          comments: lookCommentsData.comments
        };
        dispatch(setLookCommentsData(commentsData));
      }
    }));
  };
}

export function initLookComments(data): Action {
  return {
    type: INIT_LOOK_COMMENTS,
    payload: data
  };
}

export function comment(id, body) {
  return (dispatch, getState) => {
    dispatch(rest.actions.comments.post({look_id: id},
      {body: JSON.stringify({body})},
      (err, data) => {
        if (!err) {
        }
      }));
  };
}

export function addLookComment(data) {
  return (dispatch) => {
    dispatch({
      type: ADD_LOOK_COMMENT,
      payload: data
    });
    dispatch(comment(data.look_id, data.body));
  };
}
