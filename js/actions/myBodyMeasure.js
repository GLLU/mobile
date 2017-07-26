import rest from '../api/rest';
//  Constants
export const COMPLETE_EDIT_BODY_MEASURE = 'COMPLETE_EDIT_BODY_MEASURE';

import {hideBodyTypeModal} from './myBodyType';
import {onBodyShapeChoosen} from './user';

// Actions
export function completeEdit(sizeInfo) {
  delete sizeInfo.user;
  return {
    type: COMPLETE_EDIT_BODY_MEASURE,
    payload: sizeInfo,
  };
}
export function saveUserSize(data) {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    const user_id = getState().user.id;
    dispatch(rest.actions.size.post({ user_id }, { body: JSON.stringify(data) }, (err, data) => {
      if (!err && data) {
        dispatch(completeEdit(data.user_size));
        dispatch(hideBodyTypeModal());
        resolve();
      } else {
        reject(err);
      }
    }));
  });
}

export function saveUserBodyShape() {
  return (dispatch, getState) => new Promise((resolve, reject) => {

    const bodyShape = getState().myBodyType.currentBodyType.body_type;
    const user_id = getState().user.id;

    const measurement = {
      body_type: bodyShape,
      chest: 1,
      waist: 1,
      hips: 1,
      height: 1,
      measurements_scale: 'cm',
    };

    dispatch(rest.actions.size.post({user_id}, { body: JSON.stringify(measurement) }, (err, data) => {
      if (!err && data) {
        dispatch(onBodyShapeChoosen());
        resolve();
      } else {
        reject(err);
      }
    }));
  });
  ;
}
