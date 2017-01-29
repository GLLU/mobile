import _ from 'lodash';
import { SET_FLAT_LOOKS_FEED_DATA } from '../actions/feed';
import { SET_LOOK_LIKE_STATE } from '../actions/likes';

const initialState = {
  flatLooksData: []
};
// Action Handlers
const ACTION_HANDLERS = {
  [SET_LOOK_LIKE_STATE]: (state, action) => {
    const { look_id, liked } = action.payload;
    return {
      ...state,
      flatLooksData: state.flatLooksData.map((look, index) => {
        if (look.id == look_id) {
          look.liked = liked;
        }
        return look;
      })
    }
  },
  [SET_FLAT_LOOKS_FEED_DATA]: (state, action) => {
    console.log('reducers SET_FLAT_LOOKS_FEED_DATA', action.payload)
    const flatLooksData = action.payload.looks.map(look => {
      let coverImg = _.find(look.cover, 'medium')
      return Object.assign({}, {
        liked: look.is_liked,
        type: look.user_size.body_type,
        id: look.id,
        likes: look.likes,
        user_id: look.user_id,
        uri: coverImg.medium.url,
        width: coverImg.medium.width,
        height: coverImg.medium.height,
      });
    });
    console.log('flat',flatLooksData);
    return {
      ...state,
      flatLooksData,
    }
  }
}

export default function reducers (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}