import { SET_LOOK_DATA } from '../actions/looks';
import { GET_LOOK_LIKES } from '../actions/likes';

const initialState = {
  screenLookData: {},
  likes: -1,
  is_liked: false
};

export default function (state:State = initialState, action): State {
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