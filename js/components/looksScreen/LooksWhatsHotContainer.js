// @flow

import asScreen from '../common/containers/Screen';
import {connect} from 'react-redux';
import LooksScreen from './LooksScreen';
import {likeUpdate, unlikeUpdate, loadMore, getLookLikes} from '../../actions';
import { showParisBottomMessage } from '../../actions/paris';
import {updateFavorite, addLookItems } from '../../actions/look';
import {getLooksById} from '../../utils/FeedUtils';
import { getDataWithUsersObj } from '../../utils/UsersUtils';
import {reportAbuse} from '../../actions/looks';
import { hideSwipeWizard, hideClosetWizard } from '../../actions/user';
import {editNewLook} from '../../actions/uploadLook';
import {FEED_TYPE_WHATS_HOT} from '../../actions/feed';


function mapDispatchToProps(dispatch) {
  return {
    updateFavorite: (isFavorite, lookId) => dispatch(updateFavorite(isFavorite, lookId)),
    editNewLook: id => dispatch(editNewLook(id)),
    likeUpdate: id => dispatch(likeUpdate(id)),
    getItems: lookId => dispatch(addLookItems(lookId)),
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
  const flatLooksFeedData = getLooksById(state.feed.whatsHot.flatLooksIdData, state.looks.flatLooksData);
  const flatLooksFeedDataWithUsersObjs = getDataWithUsersObj(flatLooksFeedData, state.users.usersData);
  const flatLook = getDataWithUsersObj([state.looks.flatLooksData[ownProps.navigation.state.params.lookId]], state.users.usersData)[0];

  return {
    flatLook,
    openComments: ownProps.navigation.state.params.openComments ? ownProps.navigation.state.params.openComments : false,
    isLoading: state.loader.loading,
    showSwipeWizard: state.user.showSwipeWizard,
    showClosetWizard: state.user.showClosetWizard,
    flatLooksData: flatLooksFeedDataWithUsersObjs,
    meta: state.feed.whatsHot.meta,
    query: state.feed.whatsHot.query,
    userLooks: state.userLooks.userLooksData,
    cardNavigation: state.cardNavigation,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(asScreen(LooksScreen));
