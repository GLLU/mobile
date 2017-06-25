import { UPDATE_BALANCE } from '../actions/wallet';

const initialState = {
  balance: -1
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_BALANCE:
      const balance = action.payload.wallet.amount
      return {
        ...state,
        balance
      };
    default:
      return state;
  }
}
