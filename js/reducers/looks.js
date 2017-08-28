import _ from 'lodash';
import { CLEAR_FEED_DATA, SET_FLAT_LOOKS_DATA } from '../actions/feed';
import { LOOK_LIKE, LOOK_UNLIKE } from '../actions/look';
import { ADD_LOOK_COMMENT } from '../actions/comments';

const initialState = {
  flatLooksData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FLAT_LOOKS_DATA: {
      return {
        ...state,
        flatLooksData: action.payload.flatLooksData,
      };
    }
    case CLEAR_FEED_DATA: {
      return {
        ...initialState,
      };
    }
    case ADD_LOOK_COMMENT: {
      const { look_id } = action.payload;
      const lookToUpdate = state.flatLooksData[look_id];
      return {
        ...state,
        flatLooksData: {
          ...state.flatLooksData,
          [look_id]: { ...lookToUpdate, comments: lookToUpdate.comments + 1 },
        },
      };
    }
    case LOOK_LIKE: {
      const { lookId } = action;
      const lookToUpdate = state.flatLooksData[lookId];
      return {
        ...state,
        flatLooksData: {
          ...state.flatLooksData,
          [lookId]: { ...lookToUpdate, likes: lookToUpdate.likes + 1, liked: true },
        },
      };
    }
    case LOOK_UNLIKE: {
      const { lookId } = action;
      const lookToUpdate = state.flatLooksData[lookId];
      return {
        ...state,
        flatLooksData: {
          ...state.flatLooksData,
          [lookId]: { ...lookToUpdate, likes: lookToUpdate.likes - 1, liked: false },
        },
      };
    }
    default:
      return state;
  }
}
