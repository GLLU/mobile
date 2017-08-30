// @flow

import asScreen from '../common/containers/Screen';
import {connect} from 'react-redux';
import LooksScreen from './LooksScreen';
import {likeUpdate, unlikeUpdate, loadMore, getLookLikes} from '../../actions';
import { getDataWithUsersObj, addUserDataToItem } from '../../utils/UsersUtils';
import {reportAbuse} from '../../actions/looks';
import { hideSwipeWizard } from '../../actions/user';
import {editNewLook} from '../../actions/uploadLook';
import {FEED_TYPE_WHATS_HOT} from '../../actions/feed';


function mapDispatchToProps(dispatch) {
  return {
    editNewLook: id => dispatch(editNewLook(id)),
    likeUpdate: id => dispatch(likeUpdate(id)),
    unlikeUpdate: id => dispatch(unlikeUpdate(id)),
    getLookLikes: id => dispatch(getLookLikes(id)),
    reportAbuse: lookId => dispatch(reportAbuse(lookId)),
    onHideSwipeWizard: () => dispatch(hideSwipeWizard()),
    loadMore: () => dispatch(loadMore(FEED_TYPE_WHATS_HOT)),
  };
}

const mapStateToProps = (state, ownProps) => {
  const flatLooksFeedData = [state.looks.flatLooksData[ownProps.navigation.state.params.lookId]];
  const flatLooksFeedDataWithUsersObjs = getDataWithUsersObj(flatLooksFeedData, state.users.usersData);
  const mappedFlatLook = getDataWithUsersObj([state.looks.flatLooksData[ownProps.navigation.state.params.lookId]], state.users.usersData)
  return {
    flatLook: mappedFlatLook[0],
    openComments: ownProps.navigation.state.params.openComments ? ownProps.navigation.state.params.openComments : false,
    isLoading: state.loader.loading,
    showSwipeWizard: false,
    flatLooksData: flatLooksFeedDataWithUsersObjs,
    meta: state.feed.whatsHot.meta,
    query: state.feed.whatsHot.query,
    userLooks: state.userLooks.userLooksData,
    cardNavigation: state.cardNavigation,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(asScreen(LooksScreen));
