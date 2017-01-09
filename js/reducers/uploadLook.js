import { ADD_NEW_LOOK } from '../actions/uploadLook';

// Action Handlers
const ACTION_HANDLERS = {
  [ADD_NEW_LOOK]: (state, action) => {
    return {
      ...state,
      image: action.payload.image
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
  tags: []
}

export default function mybodyTypeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
