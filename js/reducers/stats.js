import type { Action } from '../actions/types';
import { UPDATE_STATS } from '../actions/user';

export type State = {
  name: string
}

const initialState = {
  following: -1
};

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case UPDATE_STATS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
