import { SET_LOOK_DATA } from '../actions/looks';

const initialState = {
  screenLookData: {},
  likes: -1,
  is_liked: false
};

export default function (state = initialState, action) {
  switch(action.type){
    case SET_LOOK_DATA:
      return {
        ...state,
        screenLookData: action.payload
      };
    default:
      return state
  }
}