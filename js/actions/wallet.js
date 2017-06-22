import rest from '../api/rest';

// Actions
export const UPDATE_BALANCE = 'UPDATE_BALANCE';

export function statsUpdate(data) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_BALANCE,
      payload: data
    });
  };
}

export function getUserBalance(id) {
  return (dispatch) => {
    // dispatch(rest.actions.wallet({id}, (err, data) => {
    dispatch(rest.actions.stats({id}, (err, data) => {
      if (!err) {
        dispatch(statsUpdate(data));
      }
    }));
  };
}

