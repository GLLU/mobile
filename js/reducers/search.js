import {ADD_SEARCH_TERM, SET_USERS} from '../actions/search';
import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
  looks: {
    history: [],
    data: [],
  },
  people: {
    history: [],
    data: {
      users: [],
      meta: {
        currentPage: 0,
        total: 0,
      },
    },
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_SEARCH_TERM: {
      const {currentSearchHistory, searchType} = action.searchData
      return {
        ...state,
        [searchType]: {
          ...state[searchType],
          history: currentSearchHistory,
        }
      };
    }
    case SET_USERS: {
      const {meta, users} = action.data
      return {
        ...state,
        people: {
          ...state.people,
          data: {
            users,
            meta,
          },
        },
      };
    }
    case REHYDRATE: {
      console.log('booooom!')
      return {
        ...state,
        ...action.searchData
      }
    }
    default:
      return state;
  }
}
