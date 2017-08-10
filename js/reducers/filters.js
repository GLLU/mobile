import _ from 'lodash';
import i18n from 'react-native-i18n';
import {SET_BRANDS, SET_CATEGORIES, SET_OCCASION_TAGS, OPEN_FEED_FILTER, CLOSE_FEED_FILTER, SET_FEATURED_BRANDS} from '../actions/filters';
import {FEED_TYPE_BEST_MATCH, FEED_TYPE_FOLLOWING, FEED_TYPE_WHATS_HOT} from '../actions/feed';
export const CATEGORIES = 'CATEGORIES';
export const EVENTS = 'EVENTS';
export const BODY_SHAPES = 'BODY_SHAPES';
import Colors from '../styles/Colors.styles'
const initialState = {
  occasion_tags: [],
  categories: [],
  brands: [],
  featuredBrands: [],
  filterMenuStatus: {
    [FEED_TYPE_BEST_MATCH]: false,
    [FEED_TYPE_FOLLOWING]: false,
    [FEED_TYPE_WHATS_HOT]: false,
  },
  colors: [
    {
      id: 1,
      selected: false,
      name: 'Red',
      highlight: false,
      color: 'red'
    },
    {
      id: 2,
      selected: false,
      name: 'Blue',
      highlight: false,
      color: 'blue'
    },
    {
      id: 3,
      selected: false,
      name: 'Green',
      highlight: false,
      color: 'green'
    },
    {
      id: 4,
      selected: false,
      name: 'Yellow',
      highlight: false,
      color: 'yellow'
    },
    {
      id: 5,
      selected: false,
      name: 'Pink',
      highlight: false,
      color: 'pink'
    },
    {
      id: 6,
      selected: false,
      name: 'Purple',
      highlight: false,
      color: 'purple'
    },
    {
      id: 7,
      selected: false,
      name: 'Lightblue',
      highlight: false,
      color: 'lightblue'
    },
    {
      id: 8,
      selected: false,
      name: 'Orange',
      highlight: false,
      color: 'orange'
    },
    {
      id: 9,
      selected: false,
      name: 'Black',
      highlight: false,
      color: 'black'
    },

  ],
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
  [OPEN_FEED_FILTER]: (state, action) => {
    return {
      ...state,
      filterMenuStatus: {
        ...state.filterMenuStatus,
        [action.feedType]: true,
      },
    };
  },
  [CLOSE_FEED_FILTER]: (state, action) => {
    return {
      ...state,
      filterMenuStatus: {
        ...state.filterMenuStatus,
        [action.feedType]: false,
      },
    };
  },
}

export default function reducers(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
