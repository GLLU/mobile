import _ from 'lodash';
import { SET_FLAT_LOOKS_FEED_DATA, SET_FLAT_LOOKS_FEED_DATA_QUEUE, CLEAR_FEED_DATA } from '../actions/feed';
import { LOOK_LIKE, LOOK_UNLIKE } from '../actions/likes';
import { ADD_LOOK_COMMENT } from '../actions/comments';
import * as feedLookMapper from '../mappers/feedLookMapper';
import { REHYDRATE } from 'redux-persist/constants';

const initialState = {
  flatLooksData: [],
  meta: {
    total: 0,
  },
  flatLooksDataQueue: [],
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
      const currentLooksData = state.flatLooksData;
      const newData = looksIdsArray || [];
      const flatLooksData = currentLooksData.concat(newData)
      return {
        ...state,
        flatLooksData,
        meta,
        query,
      };
    }
    case SET_FLAT_LOOKS_FEED_DATA_QUEUE: {
      const { query, meta, looksIdsArray } = action.payload
      const newData = looksIdsArray || [];
      return {
        ...state,
        flatLooksDataQueue: newData,
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
    case LOOK_LIKE: {
      const { lookId } = action;
      return {
        ...state,
        flatLooksData: _.map(state.flatLooksData || [], (look) => {
          if (look.id !== lookId) {
            return look;
          } else {
            const copy = _.cloneDeep(look);
            copy.liked = true;
            copy.likes++;
            return copy;
          }
        }),
      };
    }
    case LOOK_UNLIKE: {
      const { lookId } = action;
      return {
        ...state,
        flatLooksData: _.map(state.flatLooksData || [], (look) => {
          if (look.id !== lookId) {
            return look;
          } else {
            const copy = _.cloneDeep(look);
            copy.liked = false;
            copy.likes--;
            return copy;
          }
        }),
      };
    }
    default:
      return state;
      break;
  }
}
