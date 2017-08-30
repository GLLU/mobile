import rest from '../api/rest';
import { isEmpty } from "lodash";
import * as commentMapper from '../mappers/commentMapper';
import { normalize } from 'normalizr';
import { commentSchema } from '../schemas/schemas';
import { setUsers } from './users';
// Actions
export const SET_LOOK_COMMENTS_DATA = 'SET_LOOK_COMMENTS_DATA';
export const INIT_LOOK_COMMENTS = 'INIT_LOOK_COMMENTS';
export const ADD_LOOK_COMMENT = 'ADD_LOOK_COMMENT';

export function setLookCommentsData(data) {
  return {
    type: SET_LOOK_COMMENTS_DATA,
    payload: data
  };
}

export function getLookCommentsData(id, pageNumber = 1, pageSize = 25) {
  return (dispatch, getState) => {
    return dispatch(rest.actions.comments({
      look_id: id,
      page: {
        size: pageSize,
        number: pageNumber
      }
    }, {}, (err, lookCommentsData) => {
      if (!err && lookCommentsData && !isEmpty(lookCommentsData)) {
        const state = getState();
        const currStateId = state.lookComments.currId;
        const stateLookCommentsData = state.lookComments.lookCommentsData;
        const commentsDataMapped = lookCommentsData.comments.map(commentMapper.mapComment);
        const normalizedCommentsData = normalize(commentsDataMapped, [commentSchema]);
        dispatch(setUsers(normalizedCommentsData.entities.users))
        let serializedCommentsArray = _.map(normalizedCommentsData.result, (commentId) => normalizedCommentsData.entities.comments[commentId])
        if (id === currStateId) {
          serializedCommentsArray = _.unionBy(stateLookCommentsData, serializedCommentsArray, comment => comment.id);
        }
        const commentsData = {
          currId: id,
          comments: serializedCommentsArray
        };

        dispatch(setLookCommentsData(commentsData));
      }
    }));
  };
}

export function initLookComments(data) {
  return {
    type: INIT_LOOK_COMMENTS,
    payload: data
  };
}

export function comment(id, body) {
  return (dispatch) => {
    dispatch(rest.actions.comments.post({look_id: id},
      {body: JSON.stringify({body})}));
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

