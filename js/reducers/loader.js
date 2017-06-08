
import type { Action } from '../actions/types';
import { SHOW_PROCESSING, HIDE_PROCESSING } from '../actions/loader';

const initialState = {
  processing: false,
};

export default function (state = initialState, action:Action) {
  if (action.type === SHOW_PROCESSING) {
    return {
      ...state,
      processing: true,
    };
  }

  if (action.type === HIDE_PROCESSING) {
    return {
      ...state,
      processing: false,
    };
  }

  return state;
}
