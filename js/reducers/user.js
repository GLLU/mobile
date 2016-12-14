
import type { Action } from '../actions/types';
import { SET_USER, LOGIN_VIA_FACEBOOK } from '../actions/user';

export type State = {
    name: string
}

const initialState = {
  name: '',
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_USER) {
    return {
      ...state,
      name: action.payload,
    };
  }
  return state;
}
