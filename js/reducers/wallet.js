import { UPDATE_BALANCE } from '../actions/wallet';

const initialState = {
  balance: -1
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_BALANCE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
