import _ from 'lodash';
import { SET_FLAT_LOOKS_FEED_DATA } from '../actions/feed';
import { SET_LOOK_LIKE_STATE } from '../actions/likes';

const initialState = {
  flatLooksData: [],
  meta: {
    total: 0,
  },
  query: {
    type: 'relevant',
    category: '',
    term: '',
    page: {
      size: 10,
      number: 1
    }
  },
};
// Action Handlers
const ACTION_HANDLERS = {
  [SET_LOOK_LIKE_STATE]: (state, action) => {
    const { id, likes, liked } = action.payload;
    return {
      ...state,
      flatLooksData: state.flatLooksData.map((look, index) => {
        if (look.id == id) {
          look.liked = liked;
          look.likes = likes;
        }
        return look;
      })
    }
  },
  [SET_FLAT_LOOKS_FEED_DATA]: (state, action) => {
    console.log('reducers', action.payload)
    const meta = _.merge(state.meta, action.payload.data.meta);
    const query = action.payload.query;
    const currentLooksData = state.flatLooksData;
    const flatLooksData = _.union(currentLooksData, action.payload.data.looks.map(look => {
        const cover = _.find(look.cover, x => x.version == 'medium');
        return Object.assign({}, {
          liked: look.is_liked,
          type: look.user_size.body_type,
          id: look.id,
          likes: look.likes,
          user_id: look.user_id,
          uri: cover ? cover.url : null,
          width: cover ? cover.width : null,
          height: cover ? cover.height : null,
        });
      })
    );
    return {
      ...state,
      flatLooksData,
      meta,
      query,
    }
  }
}

export default function reducers (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}