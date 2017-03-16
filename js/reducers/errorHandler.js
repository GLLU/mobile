
import type { Action } from '../actions/types';
import { SHOW_ERROR, HIDE_ERROR, SHOW_WARNING, HIDE_WARNING, SHOW_INFO, HIDE_INFO } from '../actions/errorHandler';

const initialState = {
  error: null,
  warning: null,
  info:null
};

export default function (state:State = initialState, action:Action): State {
  switch(action.type){
    case SHOW_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case HIDE_ERROR:
      return {
        ...state,
        error: null,
      };
    case SHOW_WARNING:
      return {
        ...state,
        warning: action.payload,
      };
    case HIDE_WARNING:
      return {
        ...state,
        warning: null,
      };
    case SHOW_INFO:
      return {
        ...state,
        info: action.payload,
      };
    case HIDE_INFO:
      return {
        ...state,
        info: null,
      };
    default:
      return state;
  }
}
