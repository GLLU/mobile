import { UPDATE_BALANCE } from '../actions/wallet';

export const initialState = {
  balance: -1,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BALANCE:
      const balance = action.payload.wallet.amount;
      return {
        ...state,
        balance,
      };
    default:
      return state;
  }
};

export default wallet;
