import _ from 'lodash';
import { ADD_NEW_LOOK,
        EDIT_TAG, ADD_TAG,
        SET_TAG_POSITION,
        ADD_ITEM_TYPE,
        ADD_BRAND_NAME,
        ADD_ITEM_SIZE_COUNTRY,
        ADD_ITEM_SIZE,
        ADD_ITEM_CURRENCY,
        ADD_ITEM_PRICE,
        ADD_SHARING_INFO,
        ADD_LOCATION,
        ADD_TRUST_LEVEL,
        ADD_PHOTOS_VIDEO,
        } from '../actions/uploadLook';

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
  [ADD_ITEM_TYPE]: (state, action) => {
    console.log('reducers ADD_ITEM_TYPE', state, action);
    return {
      ...state,
      selectedCategory: action.payload
    }
  },
  [ADD_BRAND_NAME]: (state, action) => {
    return {
      ...state,
      brandName: action.payload
    }
  },
  [ADD_ITEM_SIZE_COUNTRY]: (state, action) => {
    return {
      ...state,
      itemSizeCountry: action.payload
    }
  },
  [ADD_ITEM_SIZE]: (state, action) => {
    return {
      ...state,
      itemSizeNumber: action.payload
    }
  },
  [ADD_ITEM_CURRENCY]: (state, action) => {
    return {
      ...state,
      currency: action.payload
    }
  },
  [ADD_ITEM_PRICE]: (state, action) => {
    return {
      ...state,
      price: action.payload
    }
  },
  [ADD_SHARING_INFO]: (state, action) => {
    return {
      ...state,
      sharingType: action.payload.sharingType,
      sharingUrl: action.payload.sharingUrl
    }
  },
  [ADD_LOCATION]: (state, action) => {
    return {
      ...state,
      location: action.payload
    }
  },
  [ADD_TRUST_LEVEL]: (state, action) => {
    return {
      ...state,
      trustLevel: action.payload
    }
  },
  [ADD_PHOTOS_VIDEO]: (state, action) => {
    return {
      ...state,
      video: action.payload.video,
      photos: action.payload.photos
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
  itemSizeNumber: 2,
  currency: 'USD',
  price: 40,
  sharingType: true,
  sharingUrl: '',
  tags: [],
  location: 'us',
  trustLevel: 0,
  photos: [],
  video: '',
}

export default function mybodyTypeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
