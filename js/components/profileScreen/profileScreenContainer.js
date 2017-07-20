// @flow

import {connect} from 'react-redux';

import {
  getStats,
  getUserBodyType,
  addNewLook,
  getUserLooks,
  showParisBottomMessage,
  likeUpdate,
  unlikeUpdate,
  loadMoreUserLooks,
  getUserBalance,
} from '../../actions';

import {editNewLook} from '../../actions/uploadLook';
import {followUpdate, unFollowUpdate} from '../../actions/follows';

import asScreen from '../common/containers/Screen';

import ProfileScreen from './ProfileScreen';

function bindAction(dispatch: any, ownProps: any): void {
  return {
    getStats: id => dispatch(getStats(id)),
    getUserBalance: id => dispatch(getUserBalance(id)),
    getUserBodyType: data => dispatch(getUserBodyType(data)),
    addNewLook: imagePath => dispatch(addNewLook(imagePath)),
    editNewLook: id => dispatch(editNewLook(id)),
    getUserLooks: data => dispatch(getUserLooks(data)),
    loadMoreUserLooks: looksCall => dispatch(loadMoreUserLooks(looksCall)),
    showParisBottomMessage: message => dispatch(showParisBottomMessage(message)),
    likeUpdate: id => dispatch(likeUpdate(id)),
    unlikeUpdate: id => dispatch(unlikeUpdate(id)),
    onFollowClicked: (id: number, isFollowing: boolean) => {
      isFollowing ? dispatch(unFollowUpdate(id)) : followUpdate(followUpdate(id));
    },
    onStatClicked: (screen, user, isMyProfile, type, count) => {
      ownProps.navigation.navigate(screen, {
        user,
        isMyProfile,
        mode: type,
        count,
      });
    },
  };
}

const mapStateToProps = (state, ownProps) => {
  const hasUserSize = state.user.user_size !== null && !_.isEmpty(state.user.user_size);
  const userData = ownProps.navigation.state.params;
  const isMyProfile = userData.is_me;
  const userId = isMyProfile ? userData.id : userData.user_id;
  const userSize = hasUserSize ? state.user.user_size : {};
  return {
    userData,
    stats: state.stats,
    balance: state.wallet.balance,
    hasUserSize,
    userSize,
    isMyProfile,
    userId,
    navigation: ownProps.navigation,
    isFollowing: userData.is_following,
    currLookScreenId: state.userLooks.currId,
    isLoading: state.loader.loading,
    userLooks: userId === state.userLooks.currId ? state.userLooks.userLooksData : [],
    cardNavigation: state.cardNavigation,
    meta: userId === state.userLooks.currId ? state.userLooks.meta : { total_count: 0 },
    query: state.userLooks.query,
  };
};

export default connect(mapStateToProps, bindAction)(asScreen(ProfileScreen));
