import { SET_LOOK_DATA } from '../actions/looks';

const initialState = {
  screenLookData: {}
};
// Action Handlers
const ACTION_HANDLERS = {
  [SET_LOOK_DATA]: (state, action) => {
    return {
      ...state,
      screenLookData: action.payload
    }
  }
}

export default function reducers (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}