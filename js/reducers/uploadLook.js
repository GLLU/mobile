import _ from 'lodash';
import { ADD_NEW_LOOK,
        EDIT_NEW_LOOK,
        EDIT_TAG, CREATE_LOOK_ITEM_BY_POSITION,
        SET_TAG_POSITION,
        ADD_ITEM_TYPE,
        ADD_BRAND_NAME,
        ADD_ITEM_SIZE_COUNTRY,
        ADD_ITEM_SIZE,
        ADD_ITEM_CURRENCY,
        ADD_ITEM_PRICE,
        ADD_SHARING_INFO,
        ADD_DESCRIPTION,
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
  [EDIT_NEW_LOOK]: (state, action) => {
    console.log('reducer edit new look', action.payload);
    const lookId = action.payload.look.id;
    const image = action.payload.image;
    return {
      ...state,
      image,
      lookId,
    }
  },
  [CREATE_LOOK_ITEM_BY_POSITION]: (state, action) => {
    console.log('reducer CREATE_LOOK_ITEM_BY_POSITION', action.payload);
    const item = action.payload.item;
    const itemId = item.id
    const items = state.items;
    items.push({
      id: item.id,
      locationX: item.cover_x_pos,
      locationY: item.cover_y_pos,
      currency: item.currency,
      price: item.price,
      userId: item.user_id,
      lookId: item.look_id,
      editing: false,
    });
    console.log('reducer items', items);
    return {
      ...state,
      itemId,
      items,
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
    console.log('reducers ADD_ITEM_TYPE', action.payload);
    const selectedCategoryId = action.payload;
    return {
      ...state,
      selectedCategoryId,
    }
  },
  [ADD_BRAND_NAME]: (state, action) => {
    return {
      ...state,
      brand: action.payload
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
  [ADD_DESCRIPTION]: (state, action) => {
    return {
      ...state,
      description: action.payload
    }
  },
  [ADD_TRUST_LEVEL]: (state, action) => {
    return {
      ...state,
      trustLevel: action.payload
    }
  },
  [ADD_PHOTOS_VIDEO]: (state, action) => {
    console.log('ADD_PHOTOS_VIDEO');
    const photos = state.photos;
    photos.push({path: action.payload.path, data: action.payload.data});
    return {
      ...state,
      video: action.payload.video,
      photos,
    }
  },
}

// Reducer
const initialState = {
  editingLookId: null,
  image: null,
  posInCategories: 3,
  brand: null,
  itemSizeCountry: 'us',
  itemSizeNumber: 2,
  currency: 'USD',
  price: 40,
  description: '',
  sharingType: true,
  sharingUrl: '',
  items: [],
  location: 'us',
  trustLevel: 0,
  photos: [],
  video: '',
}

export default function mybodyTypeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
