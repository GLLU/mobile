
import type { Action } from '../actions/types';
import { SHOW_LOADER, HIDE_LOADER } from '../actions/loader';

const initialState = {
  loading: false,
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SHOW_LOADER) {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === HIDE_LOADER) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
}
