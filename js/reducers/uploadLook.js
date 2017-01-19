import _ from 'lodash';
import { ADD_NEW_LOOK, EDIT_TAG, ADD_TAG, SET_TAG_POSITION } from '../actions/uploadLook';

// Action Handlers
const ACTION_HANDLERS = {
  [ADD_NEW_LOOK]: (state, action) => {
    return {
      ...state,
      image: action.payload.image
    }
  },
  [ADD_TAG]: (state, action) => {
    const tags = state.tags;
    tag = Object.assign({id: tags.length}, action.payload.tag);
    tags.push(tag);
    return {
      ...state,
      tags,
    }
  },
  [EDIT_TAG]: (state, action) => {
    return {
      ...state,
      editingTag: action.payload.editingTag
    }
  },
  [SET_TAG_POSITION]: (state, action) => {
    console.log('reducers SET_TAG_POSITION', state, action);
    const tags = state.tags;
    let tag = _.find(tags, (tag) => tag.editing);
    console.log('tag', tag);
    if (!tag) {
      tag = {};
      tags.push(tag);
    }
    tag.editing = false;
    tag.locationX = action.payload.locationX;
    tag.locationY = action.payload.locationY;

    return {
      ...state,
      tags,
    }
  },
}

// Reducer
const initialState = {
  image: null,
  selectedCategoryId: 24,
  posInCategories: 3,
  brandName: '',
  itemSizeCountry: 'us',
  itemSizeNumber: '2',
  currency: 'USD',
  price: '40',
  sharing: false,
  tags: [],
}

export default function mybodyTypeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
