// @Flow

import { UPDATE_BALANCE } from '../../../actions/wallet';
import wallet, { initialState } from '../../wallet';

jest.mock('react-native-fetch-blob', () => ({
  DocumentDir: () => {
  },
  polyfill: () => {
  },
}));


describe('wallet reducer', () => {
  const updateBalance = { type: UPDATE_BALANCE, payload: { wallet: { amount: 50 } } };

  let state = null;

  beforeEach(() => {
    state = wallet(null, { type: null });
  });

  describe('when initialazing the wallet', () => {
    test(' balance should be -1', () => {
      const newState = wallet(initialState, { type: null });
      expect(newState.balance).toBe(-1);
    });
  });

  describe('when updating the wallet', () => {
    test(' balance should be the same as parameter sent', () => {
      const newState = wallet(initialState, updateBalance);
      expect(newState.balance).toBe(50);
    });
  });
});
