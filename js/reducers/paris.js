
import type { Action } from '../actions/types';
import { SHOW_PARIS_BOTTOM_MESSAGE, HIDE_PARIS_BOTTOM_MESSAGE } from '../actions/paris';

const initialState = {
  messageBottom: null,
};

export default function (state = initialState, action) {
  switch(action.type){
    case SHOW_PARIS_BOTTOM_MESSAGE:
      return {
        ...state,
        messageBottom: action.payload,
      };
    case HIDE_PARIS_BOTTOM_MESSAGE:
      return {
        ...state,
        messageBottom: null,
      };
    default:
      return state;
  }
}
