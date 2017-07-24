// @flow

import { connect } from 'react-redux';
import TabContent from './TabContent';
import { showBodyTypeModal, getBestMatchFeed, loadMore, showParisBottomMessage, clearBodyModal } from '../../actions';
import { getLooksById } from '../../utils/FeedUtils';

function mapDispatchToProps(dispatch, ownProps) {
  const navigateToLooksScreen = params => ownProps.navigateTo('lookScreenBestMatch', params);
  return {
    navigateToLooksScreen,
    showBodyTypeModal: () => dispatch(showBodyTypeModal()),
    getFeed: query => dispatch(getBestMatchFeed(query)),
    loadMore: () => dispatch(loadMore('bestMatch')),
    clearBodyModal: () => dispatch(clearBodyModal()),
    showParisBottomMessage: message => dispatch(showParisBottomMessage(message)),
  };
}

const mapStateToProps = (state) => {
  let defaultFilters = {
    gender: '',
    body_type: ''
  };
  if (state.user.user_size) {
    const myBodyType = state.user.user_size.body_type ? state.user.user_size.body_type : '';
    const myGender = state.user.gender ? state.user.gender : '';
    defaultFilters = {
      gender: myGender,
      body_type: myBodyType,
      following: true
    };
  }
  const hasUserSize = state.user.user_size !== null && !_.isEmpty(state.user.user_size);
  const userSize = hasUserSize ? state.user.user_size : '';
  const flatLooksFeedData = getLooksById(state.feed.bestMatch.flatLooksIdData, state.looks.flatLooksData);
  return {
    defaultFilters,
    modalShowing: state.myBodyType.modalShowing,
    flatLooks: flatLooksFeedData,
    meta: state.feed.bestMatch.meta,
    query: state.feed.bestMatch.query,
    hasUserSize,
    user_size: userSize,
    user_gender: state.user.gender,
    cardNavigationStack: state.cardNavigation,
    userName: state.user.name,
    showBodyModal: state.user.showBodyModal,
    navigateToLooks: 'lookScreenBestMatch',
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabContent);
