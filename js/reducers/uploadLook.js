import _ from 'lodash';
import { 
  EDIT_NEW_LOOK,
  EDIT_TAG,
  CREATE_LOOK_ITEM_BY_POSITION,
  SELECT_LOOK_ITEM,
  SET_TAG_POSITION,
  ADD_ITEM_TYPE,
  ADD_BRAND_NAME,
  ADD_ITEM_SIZE,
  ADD_ITEM_TAG,
  REMOVE_ITEM_TAG,
  ADD_SHARING_INFO,
  ADD_DESCRIPTION,
  ADD_ITEM_URL,
  ADD_LOCATION,
  ADD_PHOTOS_VIDEO,
  ADD_ITEM_OCCASION_TAG,
  REMOVE_ITEM_OCCASION_TAG,
  REMOVE_BRAND_NAME,
} from '../actions/uploadLook';
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
      items: mutateItem(state, 'brand', action.payload, action.payload.itemId)
    }
  },
  [REMOVE_BRAND_NAME]: (state, action) => {
    return {
      ...state,
      items: mutateItem(state, 'brand', null, action.payload)
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
  [ADD_ITEM_URL]: (state, action) => {
    return {
      ...state,
      items: mutateItem(state, 'url', action.payload.url, action.payload.itemId)
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
  [ADD_PHOTOS_VIDEO]: (state, action) => {
    const photos = state.photos;
    photos.push({path: action.payload.path, data: action.payload.data});
    return {
      ...state,
      items: mutateItem(state, 'photos', photos),
    }
  },
  [REMOVE_ITEM_OCCASION_TAG]: (state, action) => {
    const item = findItem(state, action.payload.itemId);
    let occasions = _.filter(item.occasions, t => t.id !== action.payload.tag.id);
    return {
      ...state,
      items: mutateItem(state, 'occasions', occasions, action.payload.itemId)
    }
  },
  [ADD_ITEM_OCCASION_TAG]: (state, action) => {
    const item = findItem(state, action.payload.itemId);
    let occasions = item.occasions;
    occasions.push(action.payload.tag);
    occasions = _.uniqBy(occasions, 'id');
    return {
      ...state,
      items: mutateItem(state, 'occasions', occasions, action.payload.itemId)
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
