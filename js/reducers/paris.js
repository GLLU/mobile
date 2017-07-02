import { SHOW_PARIS_BOTTOM_MESSAGE, HIDE_PARIS_BOTTOM_MESSAGE, SHOW_PARIS_ADJUSTABLE_MESSAGE, HIDE_PARIS_ADJUSTABLE_MESSAGE } from '../actions/paris';

const initialState = {
  messageBottom: null,
  messageBottomTime: null,
  messageAdjustable: null
};

export default function (state = initialState, action) {
  switch(action.type){
    case SHOW_PARIS_BOTTOM_MESSAGE:
    return {
      ...state,
      messageBottom: action.payload.message,
      messageBottomTime: action.payload.time,
    };
    case HIDE_PARIS_BOTTOM_MESSAGE:
      return {
        ...initialState
      };
    // case SHOW_PARIS_ADJUSTABLE_MESSAGE:
    //   return {
    //     ...state,
    //     messageAdjustable: action.payload,
    //   };
    // case HIDE_PARIS_ADJUSTABLE_MESSAGE:
    //   return {
    //     ...state,
    //     messageAdjustable: null,
    //   };
    default:
      return state;
  }
}
