import _ from 'lodash';
import type { Action } from '../actions/types';

export type State = {
    countries: array,
    itemSizes: array,
    currencies: array,
    trustLevels: array,
}

const initialState = {
  countries: [
    {name: 'us', text: 'US', icon: require('../../images/flags/us.png')},
    {name: 'uk', text: 'UK', icon: require('../../images/flags/uk.png')}
  ],
  itemSizes: [
    {name: 1, value: 1},
    {name: 2, value: 2},
    {name: 3, value: 3},
    {name: 4, value: 4},
    {name: 5, value: 5},
    {name: 6, value: 6}
  ],
  currencies: [
    {name: '£ GBP', value: 'LGP'},
    {name: '$ USD', value: 'USD'},
  ],
  trustLevels: [
    {name: '0/5', value: 0},
    {name: '1/5', value: 1},
    {name: '2/5', value: 2},
    {name: '3/5', value: 3},
    {name: '4/5', value: 4},
    {name: '5/5', value: 5},
  ],
};

// Action Handlers
const ACTION_HANDLERS = {
}

export default function reducers (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
