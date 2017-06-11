import rest from '../api/rest';
export const SET_USER_LOOKS_DATA = 'SET_USER_LOOKS_DATA';
export const SET_USER_LOOKS = 'SET_USER_LOOKS';

export function getUserLooks(data) {
  return (dispatch) => {
    return dispatch(rest.actions.user_looks({id: data.id, "page[size]" : 8, "page[number]" : data.page, 'all': data.all}, {}, (err, userLooksData) => {
      if (!err && userLooksData) {
        let looksData = {
          looks: userLooksData.looks,
          currId: data.id,
        }
        dispatch(setUserLooks(looksData));
      }
    }));
  };
}

export function getUserLooksData(data) {
  return (dispatch) => {
    let looksData = {
      currId: data.id,
      name: data.name,
      looksCount: data.looksCount,
      isMyProfile: data.isMyProfile
    }
    dispatch(setUserLooksData(looksData));
  };
}

export function reportAbuse(look_id) {
  const data = { look_id }
  return (dispatch) => {
    return dispatch(rest.actions.report_abuse.post({} ,{ body: JSON.stringify(data) } , (err, data) => {
      if (!err && data) {
        console.log('abuse Reported:', data)
      } else {
        console.log('abuse Reported Failed', err)
      }
    }));
  };
}

export function setUserLooksData(data) {
  return {
    type: SET_USER_LOOKS_DATA,
    payload: data
  };
}

export function setUserLooks(data) {
  return {
    type: SET_USER_LOOKS,
    payload: data
  };
}
