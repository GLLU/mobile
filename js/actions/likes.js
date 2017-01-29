import rest from '../api/rest';

import { actions } from 'react-native-navigation-redux-helpers';

// Actions
export const SET_LOOK_LIKE_STATE = 'SET_LOOK_LIKE_STATE';

export function like(id) {
  console.log('action like', id);
  return (dispatch, getState) => {
    dispatch(rest.actions.likes.post({look_id: id}, {}, (err, data) => {
      console.log('done like, dispatching', data);
      if (!err) {
        dispatch({
          type: SET_LOOK_LIKE_STATE,
          payload: {
            look_id: id,
            liked: true
          }
        });
      }
    }));
  };
}

export function unlike(id) {
  return (dispatch, getState) => {
    dispatch(rest.actions.likes.delete({look_id: id}, {}, (err, data) => {
      if (!err) {
        dispatch({
          type: SET_LOOK_LIKE_STATE,
          payload: {
            look_id: id,
            liked: false
          }
        });
      }
    }));
  };
}
