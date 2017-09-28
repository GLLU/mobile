// @flow

import { connect } from 'react-redux';
import BestMatchTabContent from './BestMatchTabContent';
import {
  showBodyTypeModal,
  getBestMatchFeed,
  loadMore,
  showParisBottomMessage,
} from '../../actions';

import { FEED_TYPE_BEST_MATCH, toggleFiltersMenus, changeFiltersGender, refreshFeed } from '../../actions/feed';
import { saveUserBodyShape } from '../../actions/myBodyMeasure';
import { getSuggestions } from '../../actions/bestMatchSuggestions';
import { getLooksById } from '../../utils/FeedUtils';
import { getDataWithUsersObj } from '../../utils/UsersUtils';

function mapDispatchToProps(dispatch, ownProps) {
  const navigateToLooksScreen = params => ownProps.navigateTo('lookScreenBestMatch', params);
  return {
    navigateToLooksScreen,
    showBodyTypeModal: () => dispatch(showBodyTypeModal()),
    getFeed: query => dispatch(getBestMatchFeed(query)),
    loadMore: () => dispatch(loadMore(FEED_TYPE_BEST_MATCH)),
    refreshFeed: () => dispatch(refreshFeed(FEED_TYPE_BEST_MATCH)),
    saveBodyShape: () => dispatch(saveUserBodyShape()),
    showParisBottomMessage: message => dispatch(showParisBottomMessage(message)),
    toggleFiltersMenus: () => dispatch(toggleFiltersMenus(FEED_TYPE_BEST_MATCH)),
    changeFiltersGender: gender => dispatch(changeFiltersGender(FEED_TYPE_BEST_MATCH, gender)),
    getSuggestions: () => dispatch(getSuggestions()),
  };
}

const mapStateToProps = (state, ownProps) => {
  let defaultFilters = {
    gender: '',
    body_type: '',
  };

  if (state.user.user_size) {
    const myBodyType = state.user.user_size.body_type ? state.user.user_size.body_type : '';
    const myGender = state.user.gender ? state.user.gender : '';
    defaultFilters = {
      gender: myGender,
      body_type: myBodyType,
      'sort[field]': 'created_at',
    };
  }
  const hasUserSize = state.user.hasChoosenBodyShape;
  const userSize = hasUserSize ? state.user.user_size : '';
  const flatLooksFeedData = getLooksById(state.feed.bestMatch.flatLooksIdData, state.looks.flatLooksData);
  const flatLooksFeedDataWithUsersObjs = getDataWithUsersObj(flatLooksFeedData, state.users.usersData);
  return {
    isLoading: state.feed.bestMatch.isLoading,
    currentBodyType: state.myBodyType.currentBodyType.body_type,
    isTabOnFocus: ownProps.isTabOnFocus,
    defaultFilters,
    modalShowing: state.myBodyType.modalShowing,
    flatLooks: flatLooksFeedDataWithUsersObjs,
    meta: state.feed.bestMatch.meta,
    query: state.feed.bestMatch.query,
    hasUserSize,
    currBodyShapeModal: state.myBodyType.currentBodyType.body_type,
    user_size: userSize,
    user_gender: state.user.gender,
    cardNavigationStack: state.cardNavigation,
    userName: state.user.name,
    isFiltersMenuOpen: state.feed[FEED_TYPE_BEST_MATCH].isFiltersMenuOpen,
    myFeedType: FEED_TYPE_BEST_MATCH,
    filtersGender: state.feed[FEED_TYPE_BEST_MATCH].filtersGender,
    defaultFilterQuery: { ...state.feed[FEED_TYPE_BEST_MATCH].query, gender: state.feed[FEED_TYPE_BEST_MATCH].filtersGender },
    bestMatchSuggestions: state.bestMatchSuggestions.suggestions
  };
}
;

export default connect(mapStateToProps, mapDispatchToProps)(BestMatchTabContent);
