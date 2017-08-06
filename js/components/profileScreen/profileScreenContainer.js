// @flow

import { connect } from 'react-redux';

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

import { editNewLook } from '../../actions/uploadLook';
import { followUpdate, unFollowUpdate } from '../../actions/follows';
import { getLooksById } from '../../utils/FeedUtils';
import { blockUser, hideWalletBadge } from '../../actions/user';


import asScreen from '../common/containers/Screen';

import ProfileScreen from './ProfileScreen';

function bindAction(dispatch: any, ownProps: any): void {
  return {
    navigateToLooksScreen: params => ownProps.navigateTo('lookScreenWhatsHot', params),
    hideWalletBadge: () => dispatch(hideWalletBadge()),
    getStats: id => dispatch(getStats(id)),
    getUserBalance: id => dispatch(getUserBalance(id)),
    getUserBodyType: data => dispatch(getUserBodyType(data)),
    addNewLook: imagePath => dispatch(addNewLook(imagePath)),
    blockUser: userId => dispatch(blockUser(userId)),
    editNewLook: id => dispatch(editNewLook(id)),
    getUserLooks: data => dispatch(getUserLooks(data)),
    loadMoreUserLooks: looksCall => dispatch(loadMoreUserLooks(looksCall)),
    showParisBottomMessage: (balance) => {
      ownProps.logEvent('ProfileScreen', { name: 'Wallet Pressed' });
      const parisMessage = balance < 50 ? 'Hey, you can withdraw the reward once you reach at least US$50.00' : 'Hey, to withdraw please Contact us';
      dispatch(showParisBottomMessage(parisMessage));
    },
    likeUpdate: id => dispatch(likeUpdate(id)),
    unlikeUpdate: id => dispatch(unlikeUpdate(id)),
    onFollowClicked: (id: number, isFollowing: boolean) => {
      isFollowing ? dispatch(unFollowUpdate(id)) : dispatch(followUpdate(id));
    },
    onProfileEdit: (user) => {
      ownProps.navigation.navigate('editProfileScreen');
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
  const userData = ownProps.navigation.state.params.user;
  const isMyProfile = userData.isMe ? userData.isMe : userData.is_me;
  const userId = userData.userId ? userData.userId : userData.id;
  const userSize = hasUserSize ? state.user.user_size : {};

  return {
    cameFromBallance: ownProps.navigation.state.params.cameFromBallance,
    userData,
    stats: state.stats,
    balance: state.wallet.balance,
    hasUserSize,
    userSize,
    userGender: state.user.gender,
    isMyProfile,
    userId,
    navigation: ownProps.navigation,
    isFollowing: userData.isFollowing ? userData.isFollowing : userData.is_following,
    currLookScreenId: state.userLooks.currId,
    isLoading: state.loader.loading,
    userLooks: userId === state.userLooks.currId ? getLooksById(state.userLooks.flatLooksIdData, state.looks.flatLooksData) : [],
    cardNavigation: state.cardNavigation,
    meta: userId === state.userLooks.currId ? state.userLooks.meta : { total_count: 0 },
    query: state.userLooks.query,
  };
};

export default (asScreen(connect(mapStateToProps, bindAction)(asScreen(ProfileScreen))));
