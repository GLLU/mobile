import rest from '../api/rest';
//  Constants
export const COMPLETE_EDIT_BODY_MEASURE = 'COMPLETE_EDIT_BODY_MEASURE'
export const SET_MIN_MAX_BODY_MEASURE = 'SET_MIN_MAX_BODY_MEASURE'
export const SAVE_USER_SIZE = 'SAVE_USER_SIZE'

import { actions } from 'react-native-navigation-redux-helpers';
const { popRoute } = actions;
import { hideBodyTypeModal } from './myBodyType';

// Actions
export function setMinMax(min,max) {
  return {
    type: SET_MIN_MAX_BODY_MEASURE,
    payload: {
      min: min,
      max: max
    }
  }
}
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
    console.log('action saveUserSize', data);
    const navigation = getState().cardNavigation;
    dispatch(rest.actions.size.post({user_id: 2}, { body: JSON.stringify(data) }))
    dispatch([
      hideBodyTypeModal(),
      popRoute(navigation.key)
    ]);
  };
}
