// @flow

import asScreen from '../common/containers/Screen';
import { connect } from 'react-redux';
import LooksScreen from './LooksScreen';
import { likeUpdate, unlikeUpdate, loadMore, getLookLikes } from '../../actions';
import { showParisBottomMessage } from '../../actions/paris';
import {updateFavorite} from '../../actions/look';
import { getLooksById } from '../../utils/FeedUtils';
import { getDataWithUsersObj } from '../../utils/UsersUtils';
import { reportAbuse } from '../../actions/looks';
import { hideSwipeWizard , hideClosetWizard} from '../../actions/user';
import { editNewLook } from '../../actions/uploadLook';
import {FEED_TYPE_WHATS_HOT} from '../../actions/feed';


function mapDispatchToProps(dispatch) {
  return {
    updateFavorite: (isFavorite, lookId) => dispatch(updateFavorite(isFavorite, lookId)),
    editNewLook: id => dispatch(editNewLook(id)),
    likeUpdate: id => dispatch(likeUpdate(id)),
    unlikeUpdate: id => dispatch(unlikeUpdate(id)),
    getLookLikes: id => dispatch(getLookLikes(id)),
    reportAbuse: lookId => dispatch(reportAbuse(lookId)),
    onHideSwipeWizard: () => dispatch(hideSwipeWizard()),
    onShowClosetMessage: (message) => {
      dispatch(showParisBottomMessage(message));
      dispatch(hideClosetWizard());
    },
    loadMore: () => dispatch(loadMore(FEED_TYPE_WHATS_HOT)),
  };
}

const mapStateToProps = (state, ownProps) => {
  const flatLooksFeedData = getLooksById(state.feed.bestMatch.flatLooksIdData, state.looks.flatLooksData);
  const flatLooksFeedDataWithUsersObjs = getDataWithUsersObj(flatLooksFeedData, state.users.usersData);
  const flatLook = getDataWithUsersObj([state.looks.flatLooksData[ownProps.navigation.state.params.lookId]], state.users.usersData)[0];
  return {
    flatLook: flatLook,
    openComments: ownProps.navigation.state.params.openComments ? ownProps.navigation.state.params.openComments : false,
    isLoading: state.loader.loading,
    showSwipeWizard: state.user.showSwipeWizard,
    showClosetWizard: state.user.showClosetWizard,
    flatLooksData: flatLooksFeedDataWithUsersObjs,
    usersData: state.users.usersData,
    meta: state.feed.bestMatch.meta,
    query: state.feed.bestMatch.query,
    userLooks: state.userLooks.userLooksData,
    cardNavigation: state.cardNavigation,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(asScreen(LooksScreen));
