
import type { Action } from '../actions/types';
import { SHOW_ERROR, HIDE_ERROR, SHOW_WARNING, HIDE_WARNING, SHOW_INFO, HIDE_INFO, SHOW_FATAL_ERROR, HIDE_FATAL_ERROR } from '../actions/errorHandler';

const initialState = {
  error: null,
  fatal_error: null,
  warning: null,
  info:null
};

export default function (state = initialState, action) {
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
    case SHOW_FATAL_ERROR:
      return {
        ...state,
        fatal_error: action.payload,
      };
    case HIDE_FATAL_ERROR:
      return {
        ...state,
        fatal_error: null,
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
