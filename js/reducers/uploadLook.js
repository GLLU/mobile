import { ADD_NEW_LOOK } from '../actions/uploadLook';

// Action Handlers
const ACTION_HANDLERS = {
  [ADD_NEW_LOOK]: (state, action) => {
    return {
      ...state,
      imagePath: action.payload.imagePath
    }
  },
}

// Reducer
const initialState = {
  imagePath: null,
  selectedCategoryId: 3,
  brandName: '',
  itemSizeCountry: 'us',
  itemSizeNumber: '2',
  currency: 'USD',
  price: '40',
  sharing: false,
  tags: []
}

export default function mybodyTypeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
