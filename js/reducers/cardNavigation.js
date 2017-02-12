import { cardStackReducer } from 'react-native-navigation-redux-helpers';
import { REHYDRATE } from 'redux-persist/constants'

const initialState = {
  key: 'global',
  index: 0,
  routes: [
    {
      key: 'splashscreen',
      index: 0,
    },
  ],
};

export default function manageStackReducer(state = initialState, action) {
  console.log('manageStackReducer', action.type);
  switch (action.type) {
    case REHYDRATE:
      // do nothing
      return initialState;
    default:
      return cardStackReducer(initialState)(state, action);
  }
}
