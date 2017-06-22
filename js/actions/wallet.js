import rest from '../api/rest';

// Actions
export const UPDATE_BALANCE = 'UPDATE_BALANCE';

export function balanceUpdate(data) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_BALANCE,
      payload: data
    });
  };
}

export function getUserBalance(id) {
  return (dispatch) => {
    dispatch(rest.actions.wallet({id}, (err, data) => {
      if (!err) {
        dispatch(balanceUpdate(data));
      }
    }));
  };
}

