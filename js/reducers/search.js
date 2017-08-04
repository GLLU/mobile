import {
  ADD_SEARCH_TERM,
  SET_USERS,
  CLEAR_SEARCH_HISTORY,
  CLEAR_PEOPLE_SEARCH_RESULTS,
  SET_SUGGESTIONS_USERS,
  START_FETCHING_USERS,
  FINISH_FETCHING_USERS
} from '../actions/search';
import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
  looks: {
    history: [],
    data: [],
    isLoading: false,
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
    isLoading: false,
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
    case CLEAR_PEOPLE_SEARCH_RESULTS: {
      return {
        ...state,
        people: {
          ...state.people,
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
    case START_FETCHING_USERS: {
      return {
        ...state,
        people: {
          ...state.people,
          isLoading: true,
        },
      };
    }
    case FINISH_FETCHING_USERS: {
      return {
        ...state,
        people: {
          ...state.people,
          isLoading: false,
        },
      };
    }
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload.search,
      };
    }
    default:
      return state;
  }
}
