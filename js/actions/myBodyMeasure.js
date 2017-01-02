import rest from '../api/rest';
//  Constants
export const TOGGLE_CM_INCH = 'TOGGLE_CM_INCH'
export const TOGGLE_SIZE = 'TOGGLE_SIZE'
export const TOGGLE_EDIT_SIZE = 'TOGGLE_EDIT_SIZE'
export const INITIAL_MYBODY_MEASURE = 'INITIAL_MYBODY_MEASURE'
export const SAVE_USER_SIZE = 'SAVE_USER_SIZE'

import { actions } from 'react-native-navigation-redux-helpers';
const { popRoute } = actions;
import { hideBodyTypeModal } from './myBodyType';

// Actions
export function toggleCMInch(checked) {
  return {
    type: TOGGLE_CM_INCH,
    payload: {
      checked: checked
    }
  }
}

export function toggleSize(sizeType) {
  return {
    type: TOGGLE_SIZE,
    payload: {
      sizeType: sizeType
    }
  }
}

export function toggleEditSize(isEdit, sizeType, sizeInitValue) {
  return {
    type: TOGGLE_EDIT_SIZE,
    payload: {
      isEdit: isEdit,
      typeEdit: sizeType,
      sizeInitValue: sizeInitValue
    }
  }
}

export function initalBodyMeasure(gender, bodyType) {
  return {
    type: INITIAL_MYBODY_MEASURE,
    payload: {
      gender: gender,
      bodyType: bodyType
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
