import { SET_LOOK_DATA } from '../actions/looks';
import { GET_LOOK_LIKES } from '../actions/likes';

const initialState = {
  screenLookData: {},
  likes: 999,
  liked: false
};

export default function (state:State = initialState, action:Action): State {
  switch(action.type){
    case SET_LOOK_DATA:
      return {
        ...state,
        screenLookData: action.payload
      };
    case GET_LOOK_LIKES:
      return {
        ...state,
        ...action.payload

      };
    default:
      return state
  }
}