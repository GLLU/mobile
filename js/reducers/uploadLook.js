import _ from 'lodash';
import { 
  EDIT_NEW_LOOK,
  EDIT_TAG,
  CREATE_LOOK_ITEM_BY_POSITION,
  SELECT_LOOK_ITEM,
  SET_TAG_POSITION,
  ADD_ITEM_TYPE,
  ADD_BRAND_NAME,
  ADD_ITEM_SIZE_COUNTRY,
  ADD_ITEM_SIZE,
  ADD_ITEM_TAG,
  REMOVE_ITEM_TAG,
  ADD_ITEM_CURRENCY,
  ADD_ITEM_PRICE,
  ADD_SHARING_INFO,
  ADD_DESCRIPTION,
  ADD_LOCATION,
  ADD_TRUST_LEVEL,
  ADD_PHOTOS_VIDEO,
  ADD_ITEM_OCCASION_TAG,
  REMOVE_ITEM_OCCASION_TAG,
  REMOVE_BRAND_NAME,
} from '../actions/uploadLook';
import { SET_ITEM_SIZES, SET_CATEGORIES } from '../actions/filters';
import itemMapper from '../mappers/itemMapper';

const mutateItem = function(state, key, value) {
  return state.items.map(item => {
    if (item.id == state.itemId) {
      item[key] = value;
    }
    return item;
  })
}

const findItem = function(state) {
  return _.find(state.items, x => x.id == state.itemId);
}

// Action Handlers
const ACTION_HANDLERS = {
  [EDIT_NEW_LOOK]: (state, action) => {
    const lookId = action.payload.id;
    return {
      ...state,
      ...action.payload,
      lookId,
    }
  },
  [SELECT_LOOK_ITEM] :(state, action) => {
    return {
      ...state,
      itemId: action.payload
    }
  },
  [CREATE_LOOK_ITEM_BY_POSITION]: (state, action) => {
    const item = action.payload.item;
    console.log('CREATE_LOOK_ITEM_BY_POSITION', item);
    const itemId = item.id
    const items = state.items;
    items.push(itemMapper(item));
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
    console.log('SET_TAG_POSITION', action.payload);
    state.items = mutateItem(state, 'locationX', action.payload.locationX);
    state.items = mutateItem(state, 'locationY', action.payload.locationY);
    return {
      ...state,
      items: state.items,
    }
  },
  [ADD_ITEM_TYPE]: (state, action) => {
    const selectedCategory = action.payload;
    return {
      ...state,
      items: mutateItem(state, 'selectedCategory', selectedCategory)
    }
  },
  [ADD_BRAND_NAME]: (state, action) => {
    return {
      ...state,
      items: mutateItem(state, 'brand', action.payload)
    }
  },
  [REMOVE_BRAND_NAME]: (state, action) => {
    return {
      ...state,
      items: mutateItem(state, 'brand', null)
    }
  },
  [ADD_ITEM_SIZE_COUNTRY]: (state, action) => {
    const { itemSizeRegion, itemSizeValue } = action.payload;
    state.items = mutateItem(state, 'itemSizeRegion', itemSizeRegion)
    state.items = mutateItem(state, 'itemSizeValue', itemSizeValue)
    return {
      ...state,
      items: state.items,
    }
  },
  [ADD_ITEM_SIZE]: (state, action) => {
    return {
      ...state,
      items: mutateItem(state, 'itemSizeValue', action.payload)
    }
  },
  [ADD_ITEM_TAG]: (state, action) => {
    const item = findItem(state);
    let itemTags = item.itemTags;
    itemTags.push(action.payload);
    itemTags = _.uniqBy(itemTags, 'id');
    return {
      ...state,
      items: mutateItem(state, 'itemTags', itemTags)
    }
  },
  [REMOVE_ITEM_TAG]: (state, action) => {
    const item = findItem(state);
    let itemTags = _.filter(item.itemTags, t => t.name.toLowerCase() != action.payload.toLowerCase());
    return {
      ...state,
      items: mutateItem(state, 'itemTags', itemTags)
    }
  },
  [ADD_ITEM_CURRENCY]: (state, action) => {
    return {
      ...state,
      items: mutateItem(state, 'currency', action.payload)
    }
  },
  [ADD_ITEM_PRICE]: (state, action) => {
    return {
      ...state,
      items: mutateItem(state, 'price', action.payload)
    }
  },
  [ADD_SHARING_INFO]: (state, action) => {
    state.items = mutateItem(state, 'sharingType', action.payload.sharingType)
    state.items = mutateItem(state, 'sharingUrl', action.payload.sharingUrl)
    return {
      ...state,
      items: state.items
    }
  },
  [ADD_LOCATION]: (state, action) => {
    return {
      ...state,
      items: mutateItem(state, 'location', action.payload)
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
      items: mutateItem(state, 'trustLevel', action.payload)
    }
  },
  [ADD_PHOTOS_VIDEO]: (state, action) => {
    const photos = state.photos;
    photos.push({path: action.payload.path, data: action.payload.data});
    return {
      ...state,
      items: mutateItem(state, 'photos', photos),
    }
  },
  // [SET_CATEGORIES]: (state, action) => {
  //   const categories = _.filter(action.payload.tags, (item) => item.parent_id == null);
  //   const selectedCategory = categories[parseInt(categories.length / 2)].id;
  //   return {
  //     ...state,
  //     items: mutateItem(state, 'selectedCategory', selectedCategory)
  //   }
  // },
  [SET_ITEM_SIZES]: (state, action) => {
    const sizes = action.payload.sizes;
    if (sizes.length > 0 && !state.itemSizeRegion && !state.itemSizeValue) {
      const item = _.first(sizes);
      const itemSizeRegion = item.region;
      const itemSizeValue = item.value;
      state.items = mutateItem(state, 'itemSizeRegion', itemSizeRegion)
      state.items = mutateItem(state, 'itemSizeValue', itemSizeValue)
      return {
        ...state,
        items: state.items
      }
    }
    return {
      ...state,
    }
  },
  [REMOVE_ITEM_OCCASION_TAG]: (state, action) => {
    const item = findItem(state);
    let occasionTags = _.filter(item.occasionTags, t => t.id !== action.payload.id);
    return {
      ...state,
      items: mutateItem(state, 'occasionTags', occasionTags)
    }
  },
  [ADD_ITEM_OCCASION_TAG]: (state, action) => {
    const item = findItem(state);
    let occasionTags = item.occasionTags;
    occasionTags.push(action.payload);
    occasionTags = _.uniqBy(occasionTags, 'id');
    return {
      ...state,
      items: mutateItem(state, 'occasionTags', occasionTags)
    }
  },
}

// Reducer
const initialState = {
  editingLookId: null,
  itemId: null,
  image: null,
  description: '',
  items: [],
  video: '',
}

export default function mybodyTypeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
