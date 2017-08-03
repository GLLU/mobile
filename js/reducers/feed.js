import {SET_FLAT_LOOKS_FEED_DATA, CLEAR_FEED_DATA, FINISH_FETCHING, START_FETCHING} from '../actions/feed';
import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
  bestMatch: {
    flatLooksIdData: [],
    meta: {
      total: 0,
    },
    query: {
      gender: null,
      body_type: null,
      category: null,
      term: '',
      page: {
        size: 10,
        number: 1,
      },
    },
    isLoading: true,
  },
  following: {
    flatLooksIdData: [],
    meta: {
      total: 0,
    },
    query: {
      gender: null,
      body_type: null,
      category: null,
      term: '',
      page: {
        size: 10,
        number: 1,
      },
    },
    isLoading: true,
  },
  whatsHot: {
    flatLooksIdData: [],
    meta: {
      total: 0,
    },
    query: {
      gender: null,
      body_type: null,
      category: null,
      term: '',
      page: {
        size: 10,
        number: 1,
      },
    },
    isLoading: true,
  },


};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FLAT_LOOKS_FEED_DATA: {
      const {query, meta, flatLooksIdData, feedType} = action.payload
      return {
        ...state,
        [feedType]: {
          ...state[feedType],
          flatLooksIdData,
          meta,
          query,
        },
      };
    }
    case CLEAR_FEED_DATA: {
      return {
        ...initialState,
      };
    }
    case START_FETCHING: {
      const feedType = action.feedType
      return {
        ...state,
        [feedType]: {
          ...state[feedType],
          isLoading: true,
        },
      };
    }
    case FINISH_FETCHING: {
      const feedType = action.feedType
      return {
        ...state,
        [feedType]: {
          ...state[feedType],
          isLoading: false,
        },
      };
    }
    default:
      return state;
  }
}
