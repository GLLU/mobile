import {combineReducers} from 'redux';
import loader from './loader';
import errorHandler from './errorHandler';
import cardNavigation from './cardNavigation';
import user from './user';
import myBodyMeasure from './myBodyMeasure';
import myBodyType from './myBodyType';
import filters from './filters';
import uploadLook from './uploadLook';
import feed from './feed';
import lookComments from './lookComments';
import userLooks from './userLooks';
import userFollows from './userFollows';
import userFollowers from './userFollowers';
import stats from './stats';
import wallet from './wallet';
import notifications from './notifications';
import paris from './paris';
import lookLikes from './lookLikes';
import looks from './looks';
import users from './users';
import blockedUsers from './blockedUsers';
import search from './search';
import bestMatchSuggestions from './bestMatchSuggestions';

export default combineReducers({
  loader,
  errorHandler,
  user,
  lookComments,
  cardNavigation,
  myBodyType,
  myBodyMeasure,
  filters,
  uploadLook,
  feed,
  userLooks,
  stats,
  wallet,
  userFollows,
  userFollowers,
  notifications,
  paris,
  lookLikes,
  looks,
  users,
  blockedUsers,
  search,
  bestMatchSuggestions
});
