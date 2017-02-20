import _ from 'lodash';
import { ADD_NEW_LOOK,
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
      } from '../actions/uploadLook';
import { SET_ITEM_SIZES, SET_CATEGORIES } from '../actions/filters';

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
  [ADD_NEW_LOOK]: (state, action) => {
    return {
      ...state,
      image: action.payload.image,
      items: [],
      itemId: null,
    }
  },
  [EDIT_NEW_LOOK]: (state, action) => {
    const lookId = action.payload.look.id;
    const image = action.payload.image;
    return {
      ...state,
      image,
      lookId,
      items: [],
      itemId: null,
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
      selectedCategoryId: null,
      brand: null,
      itemSizeRegion: null,
      itemSizeValue: null,
      description: '',
      sharingType: true,
      sharingUrl: '',
      location: 'us',
      trustLevel: 0,
      photos: [],
      video: '',
      occasionTags: [],
      itemTags: [],
    });
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
    const tags = state.tags;
    let tag = _.find(tags, (tag) => tag.editing);
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
    const selectedCategoryId = action.payload;
    return {
      ...state,
      items: mutateItem(state, 'selectedCategoryId', selectedCategoryId)
    }
  },
  [ADD_BRAND_NAME]: (state, action) => {
    return {
      ...state,
      items: mutateItem(state, 'brand', action.payload)
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
  //   const selectedCategoryId = categories[parseInt(categories.length / 2)].id;
  //   return {
  //     ...state,
  //     items: mutateItem(state, 'selectedCategoryId', selectedCategoryId)
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
