
import type { Action } from '../actions/types';
import { SET_USER } from '../actions/user';
import { COMPLETE_EDIT_BODY_MEASURE } from '../actions/myBodyMeasure';

export type State = {
    name: string
}

const initialState = {
  id: -1
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_USER) {
    return {
      ...state,
      ...action.payload
    };
  }
  if(action.type === COMPLETE_EDIT_BODY_MEASURE){
    return {
      ...state,
      user_size: action.payload.sizeInfo
      };
    }

  return state;
}
