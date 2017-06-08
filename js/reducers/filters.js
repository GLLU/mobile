import _ from 'lodash';
import { SET_BRANDS, SET_CATEGORIES, SET_OCCASION_TAGS } from '../actions/filters';

const initialState = {
  occasion_tags: [],
  categories: [],
  brands: [],
};

// Action Handlers
const ACTION_HANDLERS = {
  [SET_CATEGORIES]: (state, action) => {
    const categories = _.filter(action.payload.tags, (item) => item.parent_id === null);
    return {
      ...state,
      categories,
    }
  },
  [SET_OCCASION_TAGS]: (state, action) => {
    const occasion_tags = _.filter(action.payload.tags, (item) => item.parent_id === null);
    return {
      ...state,
      occasion_tags,
    }
  },
  [SET_BRANDS]: (state, action) => {
    const brands = _.map(action.payload.brands,brand => _.pick(brand,['id','name']));
    return {
      ...state,
      brands
    }
  }
}

export default function reducers (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
