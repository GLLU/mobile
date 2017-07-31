import {SET_USER, RESET_STATE, HIDE_TUTORIAL, BODY_SHAPE_CHOOSEN} from '../actions/user';
import {COMPLETE_EDIT_BODY_MEASURE} from '../actions/myBodyMeasure';
import {REHYDRATE} from 'redux-persist/constants';

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
  showTutorial: false,
  showBodyModal: true,
  hasChoosenBodyShape: false,
};

// Action Handlers
const ACTION_HANDLERS = {
  [HIDE_TUTORIAL]: (state, action) => ({
    ...state,
    showTutorial: false,
  }),
  [BODY_SHAPE_CHOOSEN]: (state, action) => ({
    ...state,
    hasChoosenBodyShape: true,
  }),
  [SET_USER]: (state, action) => {
    const user = Object.assign({}, action.payload);
    return {
      ...state,
      ...user,
    };
  },
  [COMPLETE_EDIT_BODY_MEASURE]: (state, action) => ({
    ...state,
    user_size: action.payload,
  }),
  [REHYDRATE]: (state, action) => ({
    ...state,
    ...action.payload.user,
    ...action.payload.search,
  }),
  [RESET_STATE]: (state, action) => ({
    ...initialState,
    showTutorial: state.showTutorial,
    showBodyModal: state.showBodyModal,
  }),
};

export default function reducers(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
