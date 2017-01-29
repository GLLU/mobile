import rest from '../api/rest';
//  Constants
export const COMPLETE_EDIT_BODY_MEASURE = 'COMPLETE_EDIT_BODY_MEASURE'
export const SAVE_USER_SIZE = 'SAVE_USER_SIZE'

import { actions } from 'react-native-navigation-redux-helpers';
const { popRoute } = actions;
import { hideBodyTypeModal } from './myBodyType';

// Actions
export function completeEdit(sizeInfo) {
  return {
    type: COMPLETE_EDIT_BODY_MEASURE,
    payload: {
      sizeInfo: sizeInfo
    }
  }
}
export function saveUserSize(data) {
  return (dispatch, getState) => {
    const navigation = getState().cardNavigation;
    const user_id = getState().api.users.data[0].id;
    dispatch(rest.actions.size.post({user_id}, { body: JSON.stringify(data) }))
    dispatch([
      hideBodyTypeModal(),
      popRoute(navigation.key)
    ]);
  };
}
//
// export function like(id) {
//   return (dispatch, getState) => {
//     const Authorization = getState().api.endpoint.headers.Authorization;
//     dispatch(rest.actions.like.post({id}, { Authorization }))
//   };
// }
//
// export function unlike(id) {
//   return (dispatch, getState) => {
//     const Authorization = getState().api.endpoint.headers.Authorization;
//     dispatch(rest.actions.unlike.post({id}, { Authorization }))
//   };
// }
