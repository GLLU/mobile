import {
  ADD_SEARCH_TERM,
  SET_USERS,
  CLEAR_SEARCH_HISTORY,
  CLEAR_SEARCH_RESULTS,
  SET_SUGGESTIONS_USERS
} from '../actions/search';
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
  suggestions: {
    users: []
  }
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
        },
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
    case CLEAR_SEARCH_HISTORY: {
      const {searchType} = action
      return {
        ...state,
        [searchType]: {
          ...state[searchType],
          history: [],
        },
      };
    }
    case CLEAR_SEARCH_RESULTS: {
      const {searchType} = action
      return {
        ...state,
        [searchType]: {
          ...state[searchType],
          data: {
            users: [],
            meta: {
              currentPage: 0,
              total: 0,
            },
          },
        },
      };
    }
    case SET_SUGGESTIONS_USERS: {
      const {users} = action
      return {
        ...state,
        suggestions: {
          users
        },
      };
    }
    case REHYDRATE: {
      return {
        ...state,
        people: {
          ...state.people,
          history: action.payload.search.people.history,
        },
        looks: {
          ...state.looks,
          history: action.payload.search.looks.history,
        },
      };
    }
    default:
      return state;
  }
}
