import { SET_FEED_DATA } from '../actions/feed';

const initialState = {
  looks: {}
};
// Action Handlers
const ACTION_HANDLERS = {
  [SET_FEED_DATA]: (state, action) => {
    console.log('action payload feed', action.payload);
    return {
      ...state,
      looks: action.payload
    }
  }
}

export default function reducers (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}