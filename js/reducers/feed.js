import { SET_FLAT_LOOKS_FEED_DATA, CLEAR_FEED_DATA, FINISH_FETCHING, START_FETCHING, CLOSE_FEED_FILTER, OPEN_FEED_FILTER, CHANGE_FILTERS_GENDER } from '../actions/feed';

const initialState = {
  bestMatch: {
    flatLooksIdData: [],
    meta: {
      total: 0,
      lastRefreshPage: 1,
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
    isFiltersMenuOpen: false,
    filtersGender: '',
    isLoading: true,
  },
  following: {
    flatLooksIdData: [],
    meta: {
      total: 0,
      lastRefreshPage: 1,
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
    isFiltersMenuOpen: false,
    filtersGender: '',
    isLoading: true,
  },
  whatsHot: {
    flatLooksIdData: [],
    meta: {
      total: 0,
      lastRefreshPage: 1,
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
    isFiltersMenuOpen: false,
    filtersGender: '',
    isLoading: true,
  },


};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FLAT_LOOKS_FEED_DATA: {
      const { query, meta, flatLooksIdData, feedType } = action.payload;
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
      const feedType = action.feedType;
      return {
        ...state,
        [feedType]: {
          ...state[feedType],
          isLoading: true,
        },
      };
    }
    case OPEN_FEED_FILTER: {
      const feedType = action.feedType;
      return {
        ...state,
        [feedType]: {
          ...state[feedType],
          isFiltersMenuOpen: true,
        },
      };
    }
    case CLOSE_FEED_FILTER: {
      const feedType = action.feedType;
      return {
        ...state,
        [feedType]: {
          ...state[feedType],
          isFiltersMenuOpen: false,
        },
      };
    }
    case FINISH_FETCHING: {
      const feedType = action.feedType;
      return {
        ...state,
        [feedType]: {
          ...state[feedType],
          isLoading: false,
        },
      };
    }
    case CHANGE_FILTERS_GENDER: {
      const { feedType, gender } = action.payload;
      return {
        ...state,
        [feedType]: {
          ...state[feedType],
          filtersGender: gender,
        },
      };
    }
    default:
      return state;
  }
}
