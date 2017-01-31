import rest from '../api/rest';

// Actions
export const SET_LOOK_LIKE_STATE = 'SET_LOOK_LIKE_STATE';
export const GET_LOOK_LIKES = 'GET_LOOK_LIKES';

export function like(id) {
  return (dispatch) => {
    dispatch(rest.actions.like.post({look_id: id}, (err, data) => {
      console.log('done like, dispatching', data);
      if (!err) {
        dispatch({
          type: GET_LOOK_LIKES,
          payload: data
        });
      }
    }));
  };
}

export function unlike(id) {
  return (dispatch) => {
    dispatch(rest.actions.unlike.delete({look_id: id}, (err, data) => {
      if (!err) {
        dispatch({
          type: GET_LOOK_LIKES,
          payload: data
        });
      }
    }));
  };
}

export function getLikes(id) {
  return (dispatch) => {
    dispatch(rest.actions.getLikes.get({look_id: id}, (err, data) => {
      if (!err) {
        dispatch({
          type: GET_LOOK_LIKES,
          payload: data
        });
      }
    }));
  };
}
