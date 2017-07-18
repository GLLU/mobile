import rest from '../api/rest';
export const SET_USER_LOOKS_DATA = 'SET_USER_LOOKS_DATA';
export const SET_USER_LOOKS = 'SET_USER_LOOKS';
export const SET_USER_LOOKS_FEED_DATA_QUEUE = 'SET_USER_LOOKS_FEED_DATA_QUEUE';
import _ from 'lodash';

export function getUserLooks(looksCall, query, retryCount = 0) {
  return (dispatch) => {
    const query = Object.assign({}, query, {
      page: {
        size: 10,
        number: 1,
      },
      id: looksCall.id,
    });
    return new Promise((resolve, reject) => {
      return dispatch(rest.actions.user_looks(query, {}, (err, data) => {
        if (!err && !_.isEmpty(data)) {
          data.currId = looksCall.id;
          dispatch(setUserLooks({data, query: query}));
          dispatch(loadMoreUserLooks(looksCall))
          resolve(data.looks);
        } else {
          if(retryCount < 5) {
            dispatch(getUserLooks(looksCall,query, retryCount+1))
          } else {
            reject();
          }
        }
      }));
    });
  };
}

export function loadMoreUserLooks(looksCall, retryCount = 0) {
  return (dispatch, getState) => {
    const state = getState().userLooks;
    const currPage = state.query.page.number
    const nextPageNumber = currPage + 1;
    const newState = _.merge(state.query, {page: { number: nextPageNumber }});
    const query = {
      page: {
        size: 10,
        number: nextPageNumber,
      },
      id: looksCall.id,
    };
    return new Promise((resolve, reject) => {
      if(state.userLooksDataQueue.length > 0 && currPage > 1) {
        const data = {looks: state.userLooksDataQueue, meta: state.meta}
        console.log('user looks', data);
        dispatch(setUserLooks({data, query: newState, loadMore: true}));
      }
      return dispatch(rest.actions.user_looks(newState, (err, data) => {
        if (!err && !_.isEmpty(data)) {
          data.currId = looksCall.id;
          console.log('user looks data  queue', data);
          dispatch(setUserLooksDataQueue({data, query, loadMore: true}));
          resolve(data.looks);
        } else {
          if(retryCount < 5) {
            dispatch(loadMoreUserLooks(looksCall, query, retryCount+1))
          } else {
            reject();
          }

        }
      }));
    });
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
  const data = { look_id };
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

export function setUserLooksDataQueue(data) {
  return {
    type: SET_USER_LOOKS_FEED_DATA_QUEUE,
    payload: data
  };
}
