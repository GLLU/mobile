import _ from 'lodash';
import type { Action } from '../actions/types';
import { SET_BRANDS, SET_CATEGORIES, SET_ITEM_SIZES } from '../actions/filters';

export type State = {
    minPrice: number,
    maxPrice: number,
    categories: array,
    images: array,
    brands: array
}

const initialState = {
  minPrice: 1,
  maxPrice: 1000,
  images: [
    { uri: 'https://s-media-cache-ak0.pinimg.com/474x/00/3f/cf/003fcf4f6439be98fadc6567c93e46c8.jpg', width: 137, height: 245, likes: 13, liked: true, type: '1', tags: [ { price: 88, x: 10, y: 80 }, { price: 115, x: 40, y: 140 }, { price: 99, x: 10, y: 250 } ] },
    { uri: 'https://s-media-cache-ak0.pinimg.com/474x/de/21/15/de2115e2b274f01a5759aad017065693.jpg', width: 149, height: 244, likes: 23, liked: false, type: '2', tags: [ { price: 88, x: 30, y: 70 } ] },
    { uri: 'https://s-media-cache-ak0.pinimg.com/564x/e1/d1/2a/e1d12aa5b7ad7b206ab0599994452b85.jpg', width: 163, height: 244, likes: 99, liked: true, type: '3', tags: [ { price: 215, x: 28, y: 80 } ] },
    { uri: 'https://s-media-cache-ak0.pinimg.com/564x/c9/cc/d9/c9ccd926889c5bfb7decbff5b7de3eb9.jpg', width: 215, height: 245, likes: 136, liked: false, type: '4', tags: [ { price: 56, x: 10, y: 140 } ] },
    { uri: 'https://s-media-cache-ak0.pinimg.com/564x/b3/f7/14/b3f714b7265ee84348f3682385baa211.jpg', width: 187, height: 245, likes: 123, liked: false, type: '5', tags: [ { price: 199, x: 18, y: 100 } ] },
    { uri: 'https://s-media-cache-ak0.pinimg.com/564x/2b/d3/97/2bd397583ea6392660f19a7fdb116029.jpg', width: 163, height: 244, likes: 123, liked: true, type: '6', tags: [ { price: 55, x: 10, y: 170 } ] },
    { uri: 'https://s-media-cache-ak0.pinimg.com/564x/cd/df/e1/cddfe12f3e7474e1333c733295f7b897.jpg', width: 158, height: 245, likes: 134, liked: true, type: '7', tags: [ { price: 88, x: 10, y: 150 } ] },
    { uri: 'https://s-media-cache-ak0.pinimg.com/564x/96/8e/5e/968e5eeb3ceb6e07b718ed60654ff308.jpg', width: 163, height: 245, likes: 130, liked: false, type: '1', tags: [ { price: 88, x: 78, y: 100 } ] },
    { uri: 'https://s-media-cache-ak0.pinimg.com/564x/d5/a5/a5/d5a5a5c60c6a1befbf3ee6d346ce5c59.jpg', width: 385, height: 244, likes: 44, liked: false, type: '2', tags: [ { price: 88, x: 30, y: 50 } ] },
    { uri: 'https://s-media-cache-ak0.pinimg.com/564x/c9/cc/d9/c9ccd926889c5bfb7decbff5b7de3eb9.jpg', width: 215, height: 245, likes: 123, liked: false, type: '3', tags: [ { price: 88, x: 10, y: 140 } ] }
  ],
  categories: [],
  brands: [],
  countries: [
    {name: 'us', text: 'US', icon: require('../../images/flags/us.png')},
    {name: 'uk', text: 'UK', icon: require('../../images/flags/uk.png')},
    {name: 'eu', text: 'EU', icon: require('../../images/flags/eu.png')},
  ],
  itemSizes: [],
  currencies: [
    {name: '£ GBP', value: 'LGP'},
    {name: '$ USD', value: 'USD'},
  ],
  trustLevels: [
    {name: '0/5', value: 0},
    {name: '1/5', value: 1},
    {name: '2/5', value: 2},
    {name: '3/5', value: 3},
    {name: '4/5', value: 4},
    {name: '5/5', value: 5},
  ],
};

// Action Handlers
const ACTION_HANDLERS = {
  [SET_CATEGORIES]: (state, action) => {
    const categories = _.filter(action.payload.tags, (item) => item.parent_id == null);
    return {
      ...state,
      categories,
    }
  },
  [SET_BRANDS]: (state, action) => {
    const brands = action.payload.brands.map(brand => {
      return {
        id: brand.id,
        name: brand.name
      };
    });
    return {
      ...state,
      brands
    }
  },
  [SET_ITEM_SIZES]: (state, action) => {
    const sizes = action.payload.sizes;
    return {
      ...state,
      itemSizes: sizes,
    }
  },
}

export default function reducers (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
