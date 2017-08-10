// @flow

import {connect} from 'react-redux';
import WhatsHotTabContent from './WhatsHotTabContent';
import {showBodyTypeModal, getWhatsHotFeed, loadMore, showParisBottomMessage} from '../../actions';
import {FEED_TYPE_WHATS_HOT} from '../../actions/feed';
import {getLooksById} from '../../utils/FeedUtils';

function mapDispatchToProps(dispatch, ownProps) {
  const navigateToLooksScreen = params => ownProps.navigateTo('lookScreenWhatsHot', params);
  return {
    navigateToLooksScreen,
    showBodyTypeModal: () => dispatch(showBodyTypeModal()),
    getFeed: query => dispatch(getWhatsHotFeed(query)),
    loadMore: () => dispatch(loadMore(FEED_TYPE_WHATS_HOT)),
    showParisBottomMessage: message => dispatch(showParisBottomMessage(message)),
  };
}

const mapStateToProps = (state) => {
  let defaultFilters = {
    gender: '',
    body_type: '',
  };
  if (state.user.user_size) {
    const myBodyType = state.user.user_size.body_type ? state.user.user_size.body_type : '';
    const myGender = state.user.gender ? state.user.gender : '';
    defaultFilters = {
      gender: myGender,
      'sort[field]': 'likes_count',
    };
  }
  const hasUserSize = state.user.user_size !== null && !_.isEmpty(state.user.user_size);
  const userSize = hasUserSize ? state.user.user_size : '';
  const flatLooksFeedData = getLooksById(state.feed.whatsHot.flatLooksIdData, state.looks.flatLooksData);
  return {
    isLoading: state.feed.whatsHot.isLoading,
    defaultFilters,
    modalShowing: state.myBodyType.modalShowing,
    flatLooks: flatLooksFeedData,
    meta: state.feed.whatsHot.meta,
    query: state.feed.whatsHot.query,
    hasUserSize,
    user_size: userSize,
    user_gender: state.user.gender,
    cardNavigationStack: state.cardNavigation,
    userName: state.user.name,
    isFilterMenuOpen: state.filters.filterMenuStatus[FEED_TYPE_WHATS_HOT],
    myFeedType: FEED_TYPE_WHATS_HOT,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WhatsHotTabContent);
