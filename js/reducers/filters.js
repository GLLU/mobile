import type { Action } from '../actions/types';

export type State = {
    minPrice: number,
    maxPrice: number,
    categories: array,
    images: array
}

const dress = require('../../images/categories/dress.png');
const coat = require('../../images/categories/coat.png');
const boot = require('../../images/categories/boot.png');
const coatSelected = require('../../images/categories/coat-selected.png');

const initialState = {
  minPrice: 1,
  maxPrice: 1000,
  categories: [
    { id: 0, name: 'Dresses', img: dress, imageSelected: coatSelected },
    { id: 1, name: 'Boots', img: boot, imageSelected: coatSelected },
    { id: 2, name: 'Coats', img: coat, imageSelected: coatSelected },
    { id: 3, name: 'Dresses 2', img: dress, imageSelected: coatSelected },
    { id: 4, name: 'Boots 2', img: boot, imageSelected: coatSelected },
    { id: 5, name: 'Coats 2', img: coat, imageSelected: coatSelected },
    { id: 6, name: 'Dresses 3', img: dress, imageSelected: coatSelected }
  ],
  images: [
    { uri: 'https://s-media-cache-ak0.pinimg.com/474x/00/3f/cf/003fcf4f6439be98fadc6567c93e46c8.jpg', width: 137, height: 245 },
    { uri: 'https://s-media-cache-ak0.pinimg.com/474x/de/21/15/de2115e2b274f01a5759aad017065693.jpg', width: 149, height: 244 },
    { uri: 'https://s-media-cache-ak0.pinimg.com/564x/e1/d1/2a/e1d12aa5b7ad7b206ab0599994452b85.jpg', width: 163, height: 244 },
    { uri: 'https://s-media-cache-ak0.pinimg.com/564x/c9/cc/d9/c9ccd926889c5bfb7decbff5b7de3eb9.jpg', width: 215, height: 245 },
    { uri: 'https://s-media-cache-ak0.pinimg.com/564x/b3/f7/14/b3f714b7265ee84348f3682385baa211.jpg', width: 187, height: 245 },
    { uri: 'https://s-media-cache-ak0.pinimg.com/564x/2b/d3/97/2bd397583ea6392660f19a7fdb116029.jpg', width: 163, height: 244 },
    { uri: 'https://s-media-cache-ak0.pinimg.com/564x/cd/df/e1/cddfe12f3e7474e1333c733295f7b897.jpg', width: 158, height: 245 },
    { uri: 'https://s-media-cache-ak0.pinimg.com/564x/96/8e/5e/968e5eeb3ceb6e07b718ed60654ff308.jpg', width: 163, height: 245 },
    { uri: 'https://s-media-cache-ak0.pinimg.com/564x/d5/a5/a5/d5a5a5c60c6a1befbf3ee6d346ce5c59.jpg', width: 385, height: 244 },
    { uri: 'https://s-media-cache-ak0.pinimg.com/564x/c9/cc/d9/c9ccd926889c5bfb7decbff5b7de3eb9.jpg', width: 215, height: 245 }
  ]
};

export default function (state:State = initialState, action:Action): State {
  return state;
}
