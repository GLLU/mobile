
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import user from './user';
import list from './list';
import myBodyMeasure from './myBodyMeasure';
import myBodyType from './myBodyType';
import filters from './filters';


export default combineReducers({
  drawer,
  user,
  list,
  cardNavigation,
  myBodyType,
  myBodyMeasure,
  filters,
});
