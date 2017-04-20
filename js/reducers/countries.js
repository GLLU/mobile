import _ from 'lodash';
import type { Action } from '../actions/types';

const initialState = {
  list: [
    {name: 'us', text: 'US', icon: require('../../images/flags/us.png')},
    {name: 'uk', text: 'UK', icon: require('../../images/flags/uk.png')}
  ]
};

// Action Handlers
const ACTION_HANDLERS = {
}

export default function reducers (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
