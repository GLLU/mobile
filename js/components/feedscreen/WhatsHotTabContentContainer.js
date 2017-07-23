// @flow

import { connect } from 'react-redux';
import TabContent from './TabContent';
import { showBodyTypeModal, getWhatsHotFeed, loadMore, showParisBottomMessage, clearBodyModal } from '../../actions';
import { getLooksById } from '../../utils/FeedUtils';

function mapDispatchToProps(dispatch) {
  return {
    showBodyTypeModal: () => dispatch(showBodyTypeModal()),
    getFeed: query => dispatch(getWhatsHotFeed(query)),
    loadMore: () => dispatch(loadMore('WhatsHot')),
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
      body_type: myBodyType
    };
  }
  const hasUserSize = state.user.user_size !== null && !_.isEmpty(state.user.user_size);
  const userSize = hasUserSize ? state.user.user_size : '';
  const flatLooksFeedData = getLooksById(state.feed.whatsHot.flatLooksIdData, state.looks.flatLooksData);
  return {
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
    showBodyModal: state.user.showBodyModal,
    navigateToLooks: 'lookScreenWhatsHot',
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabContent);
