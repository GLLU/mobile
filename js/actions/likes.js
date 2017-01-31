import rest from '../api/rest';

// Actions
export const SET_LOOK_LIKE_STATE = 'SET_LOOK_LIKE_STATE';
export const GET_LOOK_LIKES = 'GET_LOOK_LIKES';

export function likeUpdate(data) {
  return (dispatch) => {
    dispatch({
      type: SET_LOOK_LIKE_STATE,
      payload: data
    });
    dispatch(like(data.id));
  };
}

export function unLikeUpdate(data) {
  return (dispatch) => {
    dispatch({
      type: SET_LOOK_LIKE_STATE,
      payload: data
    });
    dispatch(unlike(data.id));
  };
}

export function like(id) {
  return (dispatch) => {
    dispatch(rest.actions.like.post({look_id: id}, (err, data) => {
      if (!err) {
      }
    }));
  };
}

export function unlike(id) {
  return (dispatch, getState) => {
    dispatch(rest.actions.unlike.delete({look_id: id}, (err, data) => {
      if (!err) {
      }
    }));
  };
}

