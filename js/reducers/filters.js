
import type { Action } from '../actions/types';
import { SET_USER } from '../actions/user';

export type State = {
    minPrice: number,
    maxPrice: number,
    categories: array,
}

const dress = require('../../images/categories/dress.png');
const coat = require('../../images/categories/coat.png');
const boot = require('../../images/categories/boot.png');
const coatSelected = require('../../images/categories/coat-selected.png');

const initialState = {
  minPrice: 1,
  maxPrice: 400,
  categories: [
    { id: 0, name: 'Dresses', img: dress, imageSelected: coatSelected },
    { id: 1, name: 'Boots', img: boot, imageSelected: coatSelected },
    { id: 2, name: 'Coats', img: coat, imageSelected: coatSelected },
    { id: 3, name: 'Dresses 2', img: dress, imageSelected: coatSelected },
    { id: 4, name: 'Boots 2', img: boot, imageSelected: coatSelected },
    { id: 5, name: 'Coats 2', img: coat, imageSelected: coatSelected },
    { id: 6, name: 'Dresses 3', img: dress, imageSelected: coatSelected }
  ]
};

export default function (state:State = initialState, action:Action): State {

  return state;
}
