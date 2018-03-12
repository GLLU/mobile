// @flow

import { connect } from 'react-redux';
import WhatsHotTabContent from './WhatsHotTabContent';
import { showBodyTypeModal, getWhatsHotFeed, loadMore, showParisBottomMessage } from '../../actions';
import { FEED_TYPE_WHATS_HOT, toggleFiltersMenus, changeFiltersGender, refreshFeed } from '../../actions/feed';
import { getLooksById } from '../../utils/FeedUtils';
import { getDataWithUsersObj } from '../../utils/UsersUtils';

function mapDispatchToProps(dispatch, ownProps) {
  const navigateToLooksScreen = params => ownProps.navigateTo('lookScreenWhatsHot', params);
  return {
    navigateToLooksScreen,
    showBodyTypeModal: () => dispatch(showBodyTypeModal()),
    getFeed: query => dispatch(getWhatsHotFeed(query)),
    loadMore: () => dispatch(loadMore(FEED_TYPE_WHATS_HOT)),
    refreshFeed: () => dispatch(refreshFeed(FEED_TYPE_WHATS_HOT)),
    showParisBottomMessage: message => dispatch(showParisBottomMessage(message)),
    toggleFiltersMenus: () => dispatch(toggleFiltersMenus(FEED_TYPE_WHATS_HOT)),
    changeFiltersGender: gender => dispatch(changeFiltersGender(FEED_TYPE_WHATS_HOT, gender)),
  };
}

const mapStateToProps = (state) => {
  const defaultFilters = {
    'sort[field]': 'hot',
    gender: '',
    body_type: '',
  };
  const hasUserSize = state.user.user_size !== null && !_.isEmpty(state.user.user_size);
  const userSize = hasUserSize ? state.user.user_size : '';
  const flatLooksFeedData = getLooksById(state.feed.whatsHot.flatLooksIdData, state.looks.flatLooksData);
  const flatLooksFeedDataWithUsersObjs = getDataWithUsersObj(flatLooksFeedData, state.users.usersData);
  return {
    isLoading: state.feed.whatsHot.isLoading,
    defaultFilters,
    modalShowing: state.myBodyType.modalShowing,
    flatLooks: flatLooksFeedDataWithUsersObjs,
    meta: state.feed.whatsHot.meta,
    query: state.feed.whatsHot.query,
    hasUserSize,
    user_size: userSize,
    user_gender: state.user.gender,
    cardNavigationStack: state.cardNavigation,
    userName: state.user.name,
    isFiltersMenuOpen: state.feed[FEED_TYPE_WHATS_HOT].isFiltersMenuOpen,
    myFeedType: FEED_TYPE_WHATS_HOT,
    filtersGender: state.feed[FEED_TYPE_WHATS_HOT].filtersGender,
    defaultFilterQuery: {
      ...state.feed[FEED_TYPE_WHATS_HOT].query,
      gender: state.feed[FEED_TYPE_WHATS_HOT].filtersGender,
    },
    querySuggestions: state.querySuggestions.suggestions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WhatsHotTabContent);
