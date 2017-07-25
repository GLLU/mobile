// @flow

import {connect} from 'react-redux';
import TabContent from './TabContent';
import {showBodyTypeModal, getFollowingFeed, loadMore, showParisBottomMessage, clearBodyModal} from '../../actions';
import {getLooksById} from '../../utils/FeedUtils';
import {FEED_TYPE_FOLLOWING} from '../../actions/feed';

function mapDispatchToProps(dispatch, ownProps) {
  const navigateToLooksScreen = params => ownProps.navigateTo('lookScreenFollwing', params);
  return {
    navigateToLooksScreen,
    showBodyTypeModal: () => dispatch(showBodyTypeModal()),
    getFeed: query => dispatch(getFollowingFeed(query)),
    loadMore: () => dispatch(loadMore(FEED_TYPE_FOLLOWING)),
    clearBodyModal: () => dispatch(clearBodyModal()),
    showParisBottomMessage: message => dispatch(showParisBottomMessage(message)),
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
  return {
    isLoading: state.feed.following.isLoading,
    defaultFilters,
    modalShowing: state.myBodyType.modalShowing,
    flatLooks: flatLooksFeedData,
    meta: state.feed.following.meta,
    query: state.feed.following.query,
    hasUserSize,
    user_size: userSize,
    user_gender: state.user.gender,
    cardNavigationStack: state.cardNavigation,
    userName: state.user.name,
    showBodyModal: state.user.showBodyModal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabContent);
