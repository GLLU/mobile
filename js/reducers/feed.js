import _ from 'lodash';
import { Image } from 'react-native';
import { SET_FLAT_LOOKS_FEED_DATA, RESET_FEED_DATA, SET_FLAT_LOOKS_FEED_DATA_QUEUE, CLEAR_FEED_DATA } from '../actions/feed';
import { SET_LOOK_LIKE_STATE } from '../actions/likes';
import { ADD_LOOK_COMMENT } from '../actions/comments';

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
      number: 1
    }
  },
};

const parseLook = function (look, index, flatLooksDataLength) {
  let cover;
  if (look.cover.type === 'video') {
    cover = _.find(look.cover.list, x => x.version === 'large_720');
  } else {
    cover = _.find(look.cover.list, x => x.version === 'medium');
    Image.prefetch(cover.url)
  }

  return Object.assign({}, {
    liked: look.is_liked,
    type: look.user_size.body_type,
    description: look.description,
    id: look.id,
    likes: look.likes,
    comments: look.comments,
    user_id: look.user_id,
    uri: cover.url ? cover.url : null,
    width: cover.width ? cover.width : 405,
    height: cover.height ? cover.height : 720,
    coverType: look.cover.type,
    avatar: look.user.avatar,
    name: look.user.name,
    username: look.user.username,
    about_me: look.user.about_me,
    is_following: look.user.is_following,
    is_follower: look.user.is_follower,
    items: look.items,
    originalIndex: flatLooksDataLength + index
  });
}

// Action Handlers
const ACTION_HANDLERS = {
  [SET_LOOK_LIKE_STATE]: (state, action) => {
    const {id, likes, liked} = action.payload;
    return {
      ...state,
      flatLooksData: _.map(state.flatLooksData||[],look => {

        if (look.id !== id) {
          return look;
        }
        else {
          const copy = _.cloneDeep(look);
          copy.liked = liked;
          copy.likes = likes;
          return copy
        }
      })
    }
  },
  [ADD_LOOK_COMMENT]: (state, action) => {
    const {look_id} = action.payload;
    return {
      ...state,
      flatLooksData: _.map(state.flatLooksData||[],look => {
        if (look.id === look_id) {
          look.comments += 1;
        }
        return look;
      })
    }
  },
  [SET_FLAT_LOOKS_FEED_DATA]: (state, action) => {

    const meta = _.merge(state.meta, action.payload.data.meta);
    const query = action.payload.query;
    const currentLooksData = state.flatLooksData;
    const flatLooksDataLength = action.payload.loadMore ? state.flatLooksData.length : 0;
    const newData = action.payload.loadMore ?
      action.payload.data.looks :
      _.map(action.payload.data.looks || [], (look, index) => parseLook(look, index, flatLooksDataLength));
    const flatLooksData = action.payload.loadMore ? currentLooksData.concat(newData) : newData;
    return {
      ...state,
      flatLooksData,
      meta,
      query,
    }
  },
  [SET_FLAT_LOOKS_FEED_DATA_QUEUE]: (state, action) => {

    const meta = _.merge(state.meta, action.payload.data.meta);
    const query = action.payload.query;
    const flatLooksDataLength = action.payload.loadMore ? state.flatLooksData.length : 0;
    const newData = _.map(action.payload.data.looks||[],(look, index) => parseLook(look, index, flatLooksDataLength));
    return {
      ...state,
      flatLooksDataQueue: newData,
      meta,
      query,
    }
  },
  [RESET_FEED_DATA]: (state, {payload}) => {
    const flatLooksData = _.map(payload.data.looks||[],look => parseLook(look));
    return {
      ...state,
      flatLooksData,
      meta: payload.data.meta,
      query: payload.query
    }
  },
  [CLEAR_FEED_DATA]: (state, {payload}) => {
    return {
      ...initialState,
    }
  }
}

export default function reducers(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}