
import type { Action } from '../actions/types';
import { SET_USER, RESET_STATE, SET_INVITATION_TOKEN } from '../actions/user';
import { COMPLETE_EDIT_BODY_MEASURE } from '../actions/myBodyMeasure';
import { REHYDRATE } from 'redux-persist/constants';

export type State = {
    name: string
}

const initialState = {
  id: -1,
  name: null,
  email: null,
  username: null,
  country: null,
  avatar: null,
  can_simple_login: null,
  api_key: null,
  invitation_token: -1
};

// Action Handlers
const ACTION_HANDLERS = {
  [SET_USER]: (state, action) => {
    const user = Object.assign({}, action.payload);
    delete user.api_key
    return {
      ...state,
      ...user
    };
  },
  [SET_INVITATION_TOKEN]: (state, action) => {
    return {
      ...state,
      invitation_token: action.payload
    };
  },
  [COMPLETE_EDIT_BODY_MEASURE]: (state, action) => {
    return {
      ...state,
      user_size: action.payload
    };
  },
  [REHYDRATE]: (state, action) => {
    return {
      ...state,
      ...action.payload.user
    }
  },
  [RESET_STATE]: (state, action) => {
    return {
      ...initialState,
      invitation_token: state.invitation_token
    };
  }
}

export default function reducers (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
