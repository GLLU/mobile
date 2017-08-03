// @flow

import asScreen from '../common/containers/Screen';
import {connect} from 'react-redux';
import LooksScreen from './LooksScreen';
import {likeUpdate, unlikeUpdate, loadMore, getLookLikes} from '../../actions';
import {getLooksById} from '../../utils/FeedUtils';
import {hideSwipeWizard} from '../../actions/user';
import {reportAbuse} from '../../actions/looks';
import {editNewLook} from '../../actions/uploadLook';

function mapDispatchToProps(dispatch, ownProps) {
  return {
    navigateToLooksScreen: params => ownProps.navigateTo('lookScreenWhatsHot', params),
    editNewLook: id => dispatch(editNewLook(id)),
    likeUpdate: id => dispatch(likeUpdate(id)),
    unlikeUpdate: id => dispatch(unlikeUpdate(id)),
    getLookLikes: id => dispatch(getLookLikes(id)),
    reportAbuse: lookId => dispatch(reportAbuse(lookId)),
    loadMore: () => dispatch(loadMore()),
    onHideSwipeWizard: () => dispatch(hideSwipeWizard()),
  };
}

const mapStateToProps = (state) => {
  const flatLooksFeedData = getLooksById(state.feed.flatLooksIdData, state.looks.flatLooksData);
  return {
    isLoading: state.loader.loading,
    showSwipeWizard: state.user.showSwipeWizard,
    flatLooksData: flatLooksFeedData,
    meta: state.feed.meta,
    query: state.feed.query,
    userLooks: state.userLooks.userLooksData,
    cardNavigation: state.cardNavigation,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(asScreen(LooksScreen));
