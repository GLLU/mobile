// @flow

import asScreen from '../common/containers/Screen';
import { connect } from 'react-redux';
import LooksScreen from './LooksScreen';
import { likeUpdate, unlikeUpdate, loadMore, getLookLikes } from '../../actions';
import { getLooksById } from '../../utils/FeedUtils';
import { reportAbuse } from '../../actions/looks';
import { editNewLook } from '../../actions/uploadLook';


function mapDispatchToProps(dispatch) {
  return {
    editNewLook: id => dispatch(editNewLook(id)),
    likeUpdate: id => dispatch(likeUpdate(id)),
    unlikeUpdate: id => dispatch(unlikeUpdate(id)),
    getLookLikes: id => dispatch(getLookLikes(id)),
    reportAbuse: lookId => dispatch(reportAbuse(lookId)),
    loadMore: () => dispatch(loadMore()),
  };
}

const mapStateToProps = (state) => {
  const flatLooksFeedData = getLooksById(state.feed.flatLooksIdData, state.looks.flatLooksData);
  return {
    isLoading: state.loader.loading,
    flatLooksData: flatLooksFeedData,
    meta: state.feed.meta,
    query: state.feed.query,
    userLooks: state.userLooks.userLooksData,
    cardNavigation: state.cardNavigation,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(asScreen(LooksScreen));
