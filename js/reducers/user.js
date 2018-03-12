import {
  SET_USER,
  RESET_STATE,
  HIDE_TUTORIAL,
  BODY_SHAPE_CHOOSEN,
  HIDE_BODY_MODAL,
  HIDE_SWIPE_WIZARD,
  HIDE_CLOSET_WIZARD,
  LOADING_FAVORITES_START,
  SET_FAVORITE_LOOKS,
} from '../actions/user';
import {ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES} from '../actions/look';
import {COMPLETE_EDIT_BODY_MEASURE} from '../actions/myBodyMeasure';
import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
  id: -1,
  name: null,
  username: null,
  avatar: null,
  api_key: null,
  favoriteLooks: { isLoading: false, ids: [] },
  showTutorial: false,
  hasChoosenBodyShape: false,
  showSwipeWizard: true,
  showWalletBadge: true,
  showClosetWizard: true,
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
  [HIDE_BODY_MODAL]: (state, action) => ({
    ...state,
    showWalletBadge: false,
  }),
  [HIDE_SWIPE_WIZARD]: (state, action) => ({
    ...state,
    showSwipeWizard: false,
  }),
  [HIDE_CLOSET_WIZARD]: (state, action) => ({
    ...state,
    showClosetWizard: false,
  }),
  [ADD_TO_FAVORITES]: (state, action) => {
    return {
      ...state,
      favoriteLooks: { ...state.favoriteLooks, ids: [...state.favoriteLooks, action.lookId] }
    };
  },
  [REMOVE_FROM_FAVORITES]: (state, action) => {
    const lookIdIndex = state.favoriteLooks.ids.indexOf(action.lookId);

    return {
      ...state,
      favoriteLooks: {
        ...state.favoriteLooks,
        ids: [...state.favoriteLooks.ids.slice(0, lookIdIndex), ...state.favoriteLooks.ids.slice(lookIdIndex + 1)]
      },
    };
  },
  [SET_FAVORITE_LOOKS]: (state, action) => {
    return {
      ...state,
      favoriteLooks: {
        ...state.favoriteLooks,
        ids: action.looksIds,
        isLoading: false,
      },
    };
  },
  [LOADING_FAVORITES_START]: (state, action) => {
    return {
      ...state,
      favoriteLooks: {
        ...state.favoriteLooks,
        isLoading: true,
      },
    };
  },
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
  [REHYDRATE]: (state, action) => {

    const userData = { ...action.payload.user, favoriteLooks: { isLoading: false, ids: [] } };

    return {
      ...state,
      ...userData
    }
  },
  [RESET_STATE]: (state, action) => ({
    ...initialState,
    showTutorial: state.showTutorial,
    showWalletBadge: state.showWalletBadge,
    hasChoosenBodyShape: state.hasChoosenBodyShape,
    showSwipeWizard: state.showSwipeWizard,
    showClosetWizard: state.showClosetWizard,
  }),
};

export default function reducers(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}