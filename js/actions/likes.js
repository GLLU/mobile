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
    dispatch(rest.actions.likes.post({look_id: id}, {}));
  };
}

export function unlike(id) {
  return (dispatch) => {
    dispatch(rest.actions.likes.delete({look_id: id}));
  };
}

