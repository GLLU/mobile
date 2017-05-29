import rest from '../api/rest';
//  Constants
export const COMPLETE_EDIT_BODY_MEASURE = 'COMPLETE_EDIT_BODY_MEASURE'
export const SAVE_USER_SIZE = 'SAVE_USER_SIZE'

import { hideBodyTypeModal } from './myBodyType';

// Actions
export function completeEdit(sizeInfo) {
  delete sizeInfo.user;
  return {
    type: COMPLETE_EDIT_BODY_MEASURE,
    payload: sizeInfo
  }
}
export function saveUserSize(data) {
  return (dispatch, getState) => {
    return new Promise((resolve,reject)=>{
    const user_id = getState().user.id;
    dispatch(rest.actions.size.post({user_id}, { body: JSON.stringify(data)}, (err, data) => {
      if (!err && data) {
        dispatch(completeEdit(data.user_size));
        dispatch(hideBodyTypeModal());
        resolve();
      }
      else{
        reject(err)
      }
    }));

    })
  };
}
