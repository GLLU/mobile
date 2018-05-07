import {
  EDIT_NEW_LOOK,
  EDIT_TAG,
  CREATE_CUSTOM_LOOK_ITEM,
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
  REMOVE_LOOK_ITEM,
  REMOVE_ITEM_COLOR,
  ADD_ITEM_COLOR,
  DONE_UPLOADING_FILE,
  CLEAR_UPLOAD_LOOK,
  SELECT_PRODUCT_ITEM,
  UPDATE_ITEM_OFFERS,
  START_UPLOADING_FILE,
} from '../actions/uploadLook';
import _ from 'lodash';
import { lookMapper, itemMapper } from '../mappers/';

export const newItem = {
  brand: null,
  id: 0,
  category: null,
  cover_x_pos: 0.5,
  cover_y_pos: 0.5,
  occasions: [],
  color_ids: [],
  tags: [],
  isNew: true,
  isCustom: true,
};

const mutateItem = function (state, key, value, id) {
  return state.items.map((item) => {
    if (item.id === id) {
      item[key] = value;
    }
    return item;
  });
};

const findItem = function (state, itemId) {
  return _.find(state.items, x => x.id === itemId);
};

// Reducer
const initialState = {
  lookId: -2,
  image: null,
  description: '',
  items: [],
  video: '',
  isUploading: false,
};

export default function (state = initialState, action) {
  let items;
  let item;
  let tags;
  let color_ids;
  let occasions;
  let itemArray;
  switch (action.type) {
    case EDIT_NEW_LOOK:
      return {
        ...action.payload,
        ...lookMapper(action.payload),
      };
    case UPDATE_ITEM_OFFERS:
      itemArray = state.items.filter(element => element.id !== action.itemWithOffers.id);
      return {
        ...state,
        items: [...itemArray, action.itemWithOffers],
      };
    case SELECT_LOOK_ITEM:
      return {
        ...state,
        itemId: action.payload,
      };
    case START_UPLOADING_FILE:
      return {
        ...state,
        isUploading: true,
      };
    case DONE_UPLOADING_FILE:
      return {
        ...state,
        isUploading: false,
      };
    case CREATE_CUSTOM_LOOK_ITEM:
      items = state.items;
      item = newItem;
      item.cover_x_pos = 0.5 + (Math.random() * (0.2 - (-0.2)) - 0.2);
      item.cover_y_pos = 0.5 + (Math.random() * (0.2 - (-0.2)) - 0.2);
      item.id = action.itemId;
      item.isCustom = true;
      items.push(itemMapper(item));
      return {
        ...state,
        items,
      };
    case EDIT_TAG:
      return {
        ...state,
        editingTag: action.payload.editingTag,
      };
    case REMOVE_LOOK_ITEM:
      return {
        ...state,
        items: action.newItemsArr,
      };
    case SELECT_PRODUCT_ITEM:
      items = state.items;
      const itemIndex = action.payload.itemIndex;
      const offerIndex = action.payload.offerIndex;
      items[itemIndex].offers[offerIndex].selected = !items[itemIndex].offers[offerIndex].selected;
      return {
        ...state,
        items,
      }
    case SET_TAG_POSITION:
      state.items = mutateItem(state, 'locationX', action.payload.locationX, action.payload.id);
      state.items = mutateItem(state, 'locationY', action.payload.locationY, action.payload.id);
      return {
        ...state,
        items: state.items,
      };
    case ADD_ITEM_TYPE:
      const category = action.payload.categoryItem;
      items = mutateItem(state, 'category', category.id, action.payload.itemId);
      items = mutateItem(state, 'category_id', category.id, action.payload.itemId);
      return {
        ...state,
        items,
      };
    case ADD_BRAND_NAME:
      return {
        ...state,
        items: mutateItem(state, 'brand', action.payload.brand, action.payload.itemId),
      };
    case REMOVE_BRAND_NAME:
      return {
        ...state,
        items: mutateItem(state, 'brand', null, action.payload),
      };
    case ADD_ITEM_SIZE:
      return {
        ...state,
        items: mutateItem(state, 'itemSizeValue', action.payload, action.payload.id),
      };
    case ADD_ITEM_TAG:
      item = findItem(state, action.payload.itemId);
      tags = item.tags;
      tags.push(action.payload.data);
      return {
        ...state,
        items: mutateItem(state, 'tags', tags, action.payload.itemId),
      };
    case REMOVE_ITEM_TAG:
      item = findItem(state, action.payload.itemId);
      tags = _.filter(item.tags, t => t.name.toLowerCase() !== action.payload.data.name.toLowerCase());
      return {
        ...state,
        items: mutateItem(state, 'tags', tags, action.payload.itemId),
      };
    case ADD_ITEM_URL:
      return {
        ...state,
        items: mutateItem(state, 'url', action.payload.url, action.payload.itemId),
      };
    case ADD_SHARING_INFO:
      state.items = mutateItem(state, 'sharingType', action.payload.sharingType);
      state.items = mutateItem(state, 'sharingUrl', action.payload.sharingUrl);
      return {
        ...state,
        items: state.items,
      };
    case ADD_LOCATION:
      return {
        ...state,
        items: mutateItem(state, 'location', action.payload),
      };
    case ADD_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };
    case ADD_PHOTOS_VIDEO:
      const photos = state.photos;
      photos.push({ path: action.payload.path, data: action.payload.data });
      return {
        ...state,
        items: mutateItem(state, 'photos', photos),
      };
    case REMOVE_ITEM_OCCASION_TAG:
      item = findItem(state, action.payload.itemId);
      occasions = _.filter(item.occasions, t => t !== action.payload.tagId);
      return {
        ...state,
        items: mutateItem(state, 'occasions', occasions, action.payload.itemId),
      };
    case ADD_ITEM_OCCASION_TAG:
      item = findItem(state, action.payload.itemId);
      occasions = _.cloneDeep(item.occasions);
      occasions.push(action.payload.tagId);
      return {
        ...state,
        items: mutateItem(state, 'occasions', occasions, action.payload.itemId),
      };
    case REMOVE_ITEM_COLOR:
      item = findItem(state, action.payload.itemId);
      color_ids = _.filter(item.color_ids, t => t !== action.payload.colorId);
      return {
        ...state,
        items: mutateItem(state, 'color_ids', color_ids, action.payload.itemId),
      };
    case CLEAR_UPLOAD_LOOK:
      return {
        ...initialState,
      };
    case ADD_ITEM_COLOR:
      item = findItem(state, action.payload.itemId);
      color_ids = _.cloneDeep(item.color_ids);
      color_ids.push(action.payload.colorId);
      return {
        ...state,
        items: mutateItem(state, 'color_ids', color_ids, action.payload.itemId),
      };
    default:
      return state;
  }
}
