import { SET_FLAT_LOOKS_FEED_DATA } from '../actions/feed';

const initialState = {
  flatLooksData: {}
};
// Action Handlers
const ACTION_HANDLERS = {
  [SET_FLAT_LOOKS_FEED_DATA]: (state, action) => {
    return {
      ...state,
      flatLooksData: action.payload
    }
  }
}

export default function reducers (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}