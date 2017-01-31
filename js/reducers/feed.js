import _ from 'lodash';
import { SET_FLAT_LOOKS_FEED_DATA } from '../actions/feed';
import { SET_LOOK_LIKE_STATE } from '../actions/likes';

const initialState = {
  flatLooksData: []
};
// Action Handlers
const ACTION_HANDLERS = {
  [SET_FLAT_LOOKS_FEED_DATA]: (state, action) => {
    console.log('reducers SET_FLAT_LOOKS_FEED_DATA', action.payload)
    const flatLooksData = action.payload.looks.map(look => {
      let coverImg = _.find(look.cover, image => image.version == 'large')
      return Object.assign({}, {
        liked: look.is_liked,
        type: look.user_size.body_type,
        id: look.id,
        likes: look.likes,
        user_id: look.user_id,
        uri: coverImg.url,
        width: coverImg.width,
        height: coverImg.height,
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