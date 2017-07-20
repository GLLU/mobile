// @flow

import asScreen from '../common/containers/Screen';
import { connect } from 'react-redux';
import TabContent from './TabContent';
import { showBodyTypeModal, getFeed, loadMore, showParisBottomMessage, clearBodyModal } from '../../actions';
import { getLooksById } from '../../utils/FeedUtils';

function mapDispatchToProps(dispatch) {
  return {
    showBodyTypeModal: () => dispatch(showBodyTypeModal()),
    getFeed: query => dispatch(getFeed(query)),
    loadMore: () => dispatch(loadMore()),
    clearBodyModal: () => dispatch(clearBodyModal()),
    showParisBottomMessage: message => dispatch(showParisBottomMessage(message)),
  };
}

const mapStateToProps = (state) => {
  const hasUserSize = state.user.user_size !== null && !_.isEmpty(state.user.user_size);
  const userSize = hasUserSize ? state.user.user_size : '';
  const flatLooksFeedData = getLooksById(state.feed.flatLooksIdData, state.looks.flatLooksData);
  return {
    modalShowing: state.myBodyType.modalShowing,
    flatLooks: flatLooksFeedData,
    meta: state.feed.meta,
    query: state.feed.query,
    hasUserSize,
    user_size: userSize,
    user_gender: state.user.gender,
    cardNavigationStack: state.cardNavigation,
    userName: state.user.name,
    showBodyModal: state.user.showBodyModal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabContent);
