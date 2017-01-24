import rest from '../api/rest';

import { actions } from 'react-native-navigation-redux-helpers';

// Actions

export function like(id) {
  return (dispatch, getState) => {
    const Authorization = getState().api.endpoint.headers.Authorization;
    dispatch(rest.actions.like.post({id}, { Authorization }))
  };
}

export function unlike(id) {
  console.log('blab',id)
  return (dispatch, getState) => {
    const Authorization = getState().api.endpoint.headers.Authorization;
    dispatch(rest.actions.unlike.delete({id}))
  };
}
