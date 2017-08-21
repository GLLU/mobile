import _ from 'lodash';
import i18n from 'react-native-i18n';
import {SET_BRANDS, SET_CATEGORIES, SET_OCCASION_TAGS, OPEN_FEED_FILTER, CLOSE_FEED_FILTER, SET_COLORS, SET_FEATURED_BRANDS} from '../actions/filters';
import {FEED_TYPE_BEST_MATCH, FEED_TYPE_FOLLOWING, FEED_TYPE_WHATS_HOT} from '../actions/feed';
export const CATEGORIES = 'CATEGORIES';
export const EVENTS = 'EVENTS';
export const BODY_SHAPES = 'BODY_SHAPES';
const initialState = {
  occasion_tags: [],
  categories: [],
  brands: [],
  filterColors: [],
  featuredBrands: [],
  colors: [],
};

// Action Handlers
const ACTION_HANDLERS = {
  [SET_CATEGORIES]: (state, action) => {
    const categories = _.filter(action.payload.tags, item => item.icon);
    return {
      ...state,
      categories,
    }
  },
  [SET_FEATURED_BRANDS]: (state, action) => {
    return {
      ...state,
      featuredBrands: action.brands,
    };
  },
  [SET_OCCASION_TAGS]: (state, action) => {
    const occasion_tags = _.filter(action.payload.tags, (item) => item.parent_id === null);
    return {
      ...state,
      occasion_tags,
    }
  },
  [SET_BRANDS]: (state, action) => {
    const brands = _.map(action.payload.brands, brand => _.pick(brand, ['id', 'name']));
    return {
      ...state,
      brands
    }
  },
  [SET_COLORS]: (state, action) => {
    return {...state, filterColors: action.colors};
  },
}

export default function reducers(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
