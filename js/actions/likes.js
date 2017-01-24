import rest from '../api/rest';

import { actions } from 'react-native-navigation-redux-helpers';

// Actions

export function like(id) {
  return (dispatch, getState) => {
    dispatch(rest.actions.like.post({id}))
  };
}

export function unlike(id) {
  return (dispatch, getState) => {
    dispatch(rest.actions.unlike.delete({id}))
  };
}
