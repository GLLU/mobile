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

// { id: '11',
//      type: 'look',
//      attributes: 
//       { 'user-id': 2,
//         'created-at': '2017-01-22T13:46:24.000Z',
//         description: '',
//         'is-liked': false,
//         'is-bagged': false,
//         likes: 0,
//         state: 'draft',
//         cover: 
//          { id: 11,
//            created_at: '2017-01-22T13:46:24.000Z',
//            updated_at: '2017-01-22T13:46:24.000Z',
//            user_id: 2,
//            look_id: 11,
//            image: 
//             { url: null,
//               large: { url: null },
//               medium: { url: null },
//               small: { url: null },
//               thumb: { url: null } },
//            file_size: null,
//            content_type: null,
//            width: null,
//            height: null },
//         'user-size': 
//          { id: 14,
//            created_at: '2017-01-03T07:35:14.000Z',
//            updated_at: '2017-01-11T13:17:43.000Z',
//            user_id: 2,
//            body_type: 'pear',
//            chest: 42,
//            waist: 40,
//            hips: 45,
//            height: 68,
//            measurements_scale: 'in' } },
//      relationships: 
//       { user: { data: { id: '2', type: 'user' } },
//         'user-size': { data: { id: '14', type: 'size' } },
//         'look-images': { data: [ { id: '11', type: 'look-image' } ] },
//         items: { data: [] } } },
//   included: 
//    [ { id: '11',
//        type: 'look-image',
//        attributes: 
//         { 'created-at': '2017-01-22T13:46:24.000Z',
//           'look-id': 11,
//           image: 
//            { url: null,
//              large: { url: null },
//              medium: { url: null },
//              small: { url: null },
//              thumb: { url: null } },
//           'file-size': null,
//           'content-type': null,
//           width: null,
//           height: null },
//        relationships: { look: { data: { id: '11', type: 'look' } } } } ] }



  [EDIT_NEW_LOOK]: (state, action) => {
    console.log('reducer edit new look', action);
    const look = action.payload.data;
    const lookId = parseInt(look.id);
    // const image = look.attributes.cover.image.url;
    const image = action.payload.image;
    // console.log('image', image);
    return {
      ...state,
      image,
      lookId,
    }
  },
  [CREATE_LOOK_ITEM_BY_POSITION]: (state, action) => {
    console.log('reducer CREATE_LOOK_ITEM_BY_POSITION', action.payload);
    const itemId = parseInt(action.payload.data.id);
    return {
      ...state,
      itemId,
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
  editingLookId: null,
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
