
import type { Action } from '../actions/types';
import { SHOW_ERROR, HIDE_ERROR, SHOW_WARNING, HIDE_WARNING } from '../actions/errorHandler';

const initialState = {
  error: null,
  warning: null,
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SHOW_ERROR) {
    return {
      ...state,
      error: action.payload,
    };
  }

  if (action.type === HIDE_ERROR) {
    return {
      ...state,
      error: null,
    };
  }

  if (action.type === SHOW_WARNING) {
    return {
      ...state,
      warning: action.payload,
    };
  }

  if (action.type === HIDE_WARNING) {
    return {
      ...state,
      warning: '',
    };
  }

  return state;
}
