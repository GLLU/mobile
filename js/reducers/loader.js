
import type { Action } from '../actions/types';
import { LOADER } from '../actions/loader';

export type State = {
    name: string
}

const initialState = {
  isLoading: false
};

export default function (state:State = initialState, action:Action): State {
    console.log('hegia', action, 'loader', LOADER);

  if (action.type === LOADER) {
      console.log('hegia', action.payload);
    return {
      ...state,
      isLoading: action.payload,
    };
  }

  return state;
}
