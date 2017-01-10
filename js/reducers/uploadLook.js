import { ADD_NEW_LOOK, EDIT_TAG, ADD_TAG } from '../actions/uploadLook';

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
    tags.push(action.payload.tag);
    return {
      ...state,
      tags,
      editingTagIndex: action.payload.editingTagIndex
    }
  },
  [EDIT_TAG]: (state, action) => {
    return {
      ...state,
      editingTagIndex: action.payload.editingTagIndex
    }
  },
}

// Reducer
const initialState = {
  image: null,
  selectedCategoryId: 3,
  brandName: '',
  itemSizeCountry: 'us',
  itemSizeNumber: '2',
  currency: 'USD',
  price: '40',
  sharing: false,
  tags: [],
  editingTagIndex: -1,
}

export default function mybodyTypeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
