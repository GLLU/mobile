// @flow

import { connect } from 'react-redux';
import FollowingTabContent from './FollowingTabContent';
import { showBodyTypeModal, getFollowingFeed, loadMore, showParisBottomMessage } from '../../actions';
import {
  getUsersSuggestions,
} from '../../actions/search';
import { getLooksById } from '../../utils/FeedUtils';
import { getDataWithUsersObj } from '../../utils/UsersUtils';
import { FEED_TYPE_FOLLOWING, toggleFiltersMenus, changeFiltersGender, refreshFeed } from '../../actions/feed';

function mapDispatchToProps(dispatch, ownProps) {
  const navigateToLooksScreen = params => ownProps.navigateTo('lookScreenFollwing', params);
  return {
    navigateToLooksScreen,
    onFollowClicked: () => ownProps.navigateTo('searchScreen', { key: 'people' }),
    showBodyTypeModal: () => dispatch(showBodyTypeModal()),
    getFeed: query => dispatch(getFollowingFeed(query)),
    refreshFeed: () => dispatch(refreshFeed(FEED_TYPE_FOLLOWING)),
    loadMore: () => dispatch(loadMore(FEED_TYPE_FOLLOWING)),
    showParisBottomMessage: message => dispatch(showParisBottomMessage(message)),
    toggleFiltersMenus: () => dispatch(toggleFiltersMenus(FEED_TYPE_FOLLOWING)),
    changeFiltersGender: gender => dispatch(changeFiltersGender(FEED_TYPE_FOLLOWING, gender)),
    getUsersSuggestions: () => dispatch(getUsersSuggestions()),
  };
}

const mapStateToProps = (state) => {
  const defaultFilters = {
    gender: '',
    body_type: '',
    followings: true,
  };

  const hasUserSize = state.user.user_size !== null && !_.isEmpty(state.user.user_size);
  const userSize = hasUserSize ? state.user.user_size : '';
  const flatLooksFeedData = getLooksById(state.feed.following.flatLooksIdData, state.looks.flatLooksData);
  const flatLooksFeedDataWithUsersObjs = getDataWithUsersObj(flatLooksFeedData, state.users.usersData);
  const usersSuggestions = _.map(state.search.suggestions.users, (userId) => state.users.usersData[userId])
  return {
    isLoading: state.feed.following.isLoading,
    defaultFilters,
    modalShowing: state.myBodyType.modalShowing,
    flatLooks: flatLooksFeedDataWithUsersObjs,
    meta: state.feed.following.meta,
    query: state.feed.following.query,
    hasUserSize,
    user_size: userSize,
    user_gender: state.user.gender,
    cardNavigationStack: state.cardNavigation,
    userName: state.user.name,
    isFiltersMenuOpen: state.feed[FEED_TYPE_FOLLOWING].isFiltersMenuOpen,
    myFeedType: FEED_TYPE_FOLLOWING,
    filtersGender: state.feed[FEED_TYPE_FOLLOWING].filtersGender,
    defaultFilterQuery: {
      ...state.feed[FEED_TYPE_FOLLOWING].query,
      gender: state.feed[FEED_TYPE_FOLLOWING].filtersGender
    },
    usersSuggestions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowingTabContent);
