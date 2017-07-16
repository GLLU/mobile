import { SET_USER, RESET_STATE, SET_INVITATION_TOKEN, SET_INVITATION_IS_USED, SET_INVITATION_SHARE_TOKEN, HIDE_TUTORIAL, HIDE_BODY_MODAL } from '../actions/user';
import { COMPLETE_EDIT_BODY_MEASURE } from '../actions/myBodyMeasure';
import { REHYDRATE } from 'redux-persist/constants';

import NetworkManager from '../network/NetworkManager';

const initialState = {
  id: -1,
  name: null,
  email: null,
  username: null,
  country: null,
  avatar: null,
  can_simple_login: null,
  api_key: null,
  invitation_token: -1,
  invitation_is_used: false,
  invitation_share_token: -1,
  showTutorial: false,
  showBodyModal: true,
};

// Action Handlers
const ACTION_HANDLERS = {
  [HIDE_TUTORIAL]: (state, action) => ({
    ...state,
    showTutorial: false,
  }),
  [HIDE_BODY_MODAL]: (state, action) => ({
    ...state,
    showBodyModal: false,
  }),
  [SET_USER]: (state, action) => {
    const user = Object.assign({}, action.payload);
    NetworkManager.setToken(user.api_key);
    console.log('happenned')
    return {
      ...state,
      ...user,
    };
  },
  [SET_INVITATION_TOKEN]: (state, action) => ({
    ...state,
    invitation_token: action.payload,
  }),
  [SET_INVITATION_IS_USED]: (state, action) => ({
    ...state,
    invitation_is_used: true,
  }),
  [SET_INVITATION_SHARE_TOKEN]: (state, action) => ({
    ...state,
    invitation_share_token: action.payload,
  }),
  [COMPLETE_EDIT_BODY_MEASURE]: (state, action) => ({
    ...state,
    user_size: action.payload,
  }),
  [REHYDRATE]: (state, action) => ({
    ...state,
    ...action.payload.user,
  }),
  [RESET_STATE]: (state, action) => ({
    ...initialState,
    invitation_token: state.invitation_token,
    invitation_is_used: state.invitation_is_used,
    showTutorial: state.showTutorial,
    showBodyModal: state.showBodyModal,
  }),
};

export default function reducers(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
