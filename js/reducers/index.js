
import { combineReducers } from 'redux';

import drawer from './drawer';
import loader from './loader';
import cardNavigation from './cardNavigation';
import user from './user';
import list from './list';
import myBodyMeasure from './myBodyMeasure';
import myBodyType from './myBodyType';
import filters from './filters';
import uploadLook from './uploadLook';
import feed from './feed';
import look from './look';
import stats from './stats';

import { reducer as api } from 'redux-json-api';

export default combineReducers({
  drawer,
  loader,
  user,
  list,
  cardNavigation,
  myBodyType,
  myBodyMeasure,
  filters,
  uploadLook,
  feed,
  look,
  stats,
  api,
});
