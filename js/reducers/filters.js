import _ from 'lodash';
import i18n from 'react-native-i18n';
import {SET_BRANDS, SET_CATEGORIES, SET_OCCASION_TAGS, OPEN_FEED_FILTER, CLOSE_FEED_FILTER} from '../actions/filters';
import {FEED_TYPE_BEST_MATCH, FEED_TYPE_FOLLOWING, FEED_TYPE_WHATS_HOT} from '../actions/feed';
export const CATEGORIES = 'CATEGORIES';
export const EVENTS = 'EVENTS';
export const BODY_SHAPES = 'BODY_SHAPES';
import Colors from '../styles/Colors.styles'
const initialState = {
  occasion_tags: [],
  categories: [],
  brands: [],
  filterMenuStatus: {
    [FEED_TYPE_BEST_MATCH]: false,
    [FEED_TYPE_FOLLOWING]: false,
    [FEED_TYPE_WHATS_HOT]: false,
  },
  colors: [
    {
      selected: false,
      name: 'Red',
      highlight: false,
      color: 'red'
    },
    {
      selected: false,
      name: 'Blue',
      highlight: false,
      color: 'blue'
    },
    {
      selected: false,
      name: 'Green',
      highlight: false,
      color: 'green'
    },
    {
      selected: false,
      name: 'Yellow',
      highlight: false,
      color: 'yellow'
    },
    {
      selected: false,
      name: 'Pink',
      highlight: false,
      color: 'pink'
    },
    {
      selected: false,
      name: 'Purple',
      highlight: false,
      color: 'purple'
    },
    {
      selected: false,
      name: 'Lightblue',
      highlight: false,
      color: 'lightblue'
    },
    {
      selected: false,
      name: 'Orange',
      highlight: false,
      color: 'orange'
    },
    {
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
