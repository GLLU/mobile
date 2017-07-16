import _ from 'lodash';
import { SET_FLAT_LOOKS_FEED_DATA, SET_FLAT_LOOKS_FEED_DATA_QUEUE, CLEAR_FEED_DATA, SET_FLAT_LOOKS_DATA } from '../actions/feed';
import { LOOK_LIKE, LOOK_UNLIKE } from '../actions/likes';
import { ADD_LOOK_COMMENT } from '../actions/comments';
import * as feedLookMapper from '../mappers/feedLookMapper';
import { normalize, schema } from 'normalizr';

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
    case SET_FLAT_LOOKS_DATA: {
      const newData = {}
      const currentLooksData = state.flatLooksData;
      newData.looks = _.map(action.payload.data.looks || [], (look, index) => feedLookMapper.map(look));
      const LooksData = new schema.Entity('looks');
      const mySchema = { looks: [LooksData] };
      const normalizedData = normalize(newData, mySchema);
      const flatLooksData = state.flatLooksData.length > 0 ? currentLooksData.concat(normalizedData.entities.looks) : normalizedData.entities.looks
      return {
        ...state,
        flatLooksData,
      };
    }
    case CLEAR_FEED_DATA: {
      return {
        ...initialState,
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
  }
}
