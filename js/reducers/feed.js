import _ from 'lodash';
import { SET_FLAT_LOOKS_FEED_DATA, CLEAR_FEED_DATA } from '../actions/feed';
import { LOOK_LIKE, LOOK_UNLIKE } from '../actions/likes';
import { ADD_LOOK_COMMENT } from '../actions/comments';
import { REHYDRATE } from 'redux-persist/constants';

const initialState = {
  flatLooksData: [],
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
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FLAT_LOOKS_FEED_DATA: {
      const { query, meta, looksIdsArray } = action.payload
      return {
        ...state,
        flatLooksData: looksIdsArray,
        meta,
        query,
      };
    }
    case CLEAR_FEED_DATA: {
      return {
        ...initialState,
      };
    }
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload.user,
      };
    }
    case ADD_LOOK_COMMENT: {
      const { look_id } = action.payload;
      return {
        ...state,
        flatLooksData: _.map(state.flatLooksData || [], (look) => {
          if (look.id === look_id) {
            look.comments += 1;
          }
          return look;
        }),
      };
    }
    default:
      return state;
  }
}
