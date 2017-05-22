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
  ADD_ITEM_URL,
  ADD_LOCATION,
  ADD_TRUST_LEVEL,
  ADD_PHOTOS_VIDEO,
  ADD_ITEM_OCCASION_TAG,
  REMOVE_ITEM_OCCASION_TAG,
  REMOVE_BRAND_NAME,
} from '../actions/uploadLook';
import { SET_ITEM_SIZES, SET_CATEGORIES } from '../actions/filters';
import { lookMapper, itemMapper } from '../mappers/';

const mutateItem = function(state, key, value, id) {
  return state.items.map(item => {
    if (item.id === id) {
      item[key] = value;
    }
    return item;
  })
}

const findItem = function(state, itemId) {
  return _.find(state.items, x => x.id === itemId);
}

// Action Handlers
const ACTION_HANDLERS = {
  [EDIT_NEW_LOOK]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      ...lookMapper(action.payload),
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
    const itemType = action.payload.item.look.cover.type;
    const itemId = item.id
    const items = state.items;
    items.push(itemMapper(item));
    return {
      ...state,
      itemId,
      itemType,
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
    state.items = mutateItem(state, 'locationX', action.payload.locationX, action.payload.id);
    state.items = mutateItem(state, 'locationY', action.payload.locationY, action.payload.id);
    return {
      ...state,
      items: state.items,
    }
  },
  [ADD_ITEM_TYPE]: (state, action) => {
    const category = action.payload.categoryItem;
    let items = mutateItem(state, 'category', category, action.payload.itemId);
    items = mutateItem(state, 'category_id', category.id, action.payload.itemId);
    return {
      ...state,
      items: items,
    }
  },
  [ADD_BRAND_NAME]: (state, action) => {
    return {
      ...state,
      items: mutateItem(state, 'brand', action.payload, action.payload.id)
    }
  },
  [REMOVE_BRAND_NAME]: (state, action) => {
    return {
      ...state,
      items: mutateItem(state, 'brand', null, action.payload.id)
    }
  },
  [ADD_ITEM_SIZE_COUNTRY]: (state, action) => {
    const { itemSizeRegion, itemSizeValue } = action.payload;
    state.items = mutateItem(state, 'itemSizeRegion', itemSizeRegion, action.payload.id)
    state.items = mutateItem(state, 'itemSizeValue', itemSizeValue, action.payload.id)
    return {
      ...state,
      items: state.items,
    }
  },
  [ADD_ITEM_SIZE]: (state, action) => {
    return {
      ...state,
      items: mutateItem(state, 'itemSizeValue', action.payload, action.payload.id)
    }
  },
  [ADD_ITEM_TAG]: (state, action) => {
    const item = findItem(state, action.payload.itemId);
    let tags = item.tags;
    tags.push(action.payload.data);
    tags = _.uniqBy(tags, 'id');
    return {
      ...state,
      items: mutateItem(state, 'tags', tags, action.payload.itemId)
    }
  },
  [REMOVE_ITEM_TAG]: (state, action) => {
    const item = findItem(state, action.payload.itemId);
    let tags = _.filter(item.tags, t => t.name.toLowerCase() != action.payload.data.toLowerCase());
    return {
      ...state,
      items: mutateItem(state, 'tags', tags, action.payload.itemId)
    }
  },
  [ADD_ITEM_CURRENCY]: (state, action) => {
    return {
      ...state,
      items: mutateItem(state, 'currency', action.payload, action.payload.id)
    }
  },
  [ADD_ITEM_PRICE]: (state, action) => {
    return {
      ...state,
      items: mutateItem(state, 'price', action.payload, action.payload.id)
    }
  },
  [ADD_ITEM_URL]: (state, action) => {
    return {
      ...state,
      items: mutateItem(state, 'url', action.payload, action.payload.id)
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
  //   const category = categories[parseInt(categories.length / 2)].id;
  //   return {
  //     ...state,
  //     items: mutateItem(state, 'category', category)
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
    let occasions = _.filter(item.occasions, t => t.id !== action.payload.id);
    return {
      ...state,
      items: mutateItem(state, 'occasions', occasions)
    }
  },
  [ADD_ITEM_OCCASION_TAG]: (state, action) => {
    const item = findItem(state);
    let occasions = item.occasions;
    occasions.push(action.payload);
    occasions = _.uniqBy(occasions, 'id');
    return {
      ...state,
      items: mutateItem(state, 'occasions', occasions)
    }
  },
}

// Reducer
const initialState = {
  lookId: null,
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
