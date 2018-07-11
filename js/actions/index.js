import {showProcessing, hideProcessing} from './loader';
import {
  showError,
  hideError,
  showWarning,
  hideWarning,
  showInfo,
  hideInfo,
  showFatalError,
  hideFatalError
} from './errorHandler';
import {showParisBottomMessage, hideParisBottomMessage} from './paris';
import {loadCategories, loadBrands, loadOccasionTags} from './filters';
import {completeEdit, saveUserSize} from './myBodyMeasure';
import {changeBodyType, showBodyTypeModal, hideBodyTypeModal, getUserBodyType} from './myBodyType';
import {likeUpdate, unlikeUpdate, addLookItems} from './look';
import {getUserBalance} from './wallet';
import {getLookLikes, initLookLikes} from './lookLikes';
import {followUpdate, unFollowUpdate, getUserFollowsData, initUserFollows}  from './follows';
import {
  getNotifications,
  goToNotificationSubjectScreen,
  markAsReadNotifications,
  clearNewNotifications
}  from './notifications';
import {getUserFollowersData, initUserFollowers}  from './followers';
import {getLookCommentsData, initLookComments, addLookComment} from './comments';
import {getUserLooksData, getUserLooks, loadMoreUserLooks} from './looks';
import {getFeed, loadMore, clearFeed, getFollowingFeed, getBestMatchFeed, getWhatsHotFeed} from './feed';
import {
  setUser,
  loginViaFacebook,
  checkLogin,
  getStats,
  logout,
  clearTutorial,
  hideTutorial,
  onBodyShapeChoosen
} from './user';

export {
  loadCategories,
  loadOccasionTags,
  loadBrands,
  showParisBottomMessage,
  hideParisBottomMessage,
  completeEdit,
  saveUserSize,
  getUserBodyType,
  changeBodyType,
  showBodyTypeModal,
  hideBodyTypeModal,
  onBodyShapeChoosen,
  getUserBalance,
  setUser,
  getStats,
  checkLogin,
  logout,
  clearFeed,
  getFollowingFeed,
  getWhatsHotFeed,
  getBestMatchFeed,
  loginViaFacebook,
  showProcessing,
  hideProcessing,
  showError,
  hideError,
  showFatalError,
  hideFatalError,
  showWarning,
  hideWarning,
  showInfo,
  hideInfo,
  clearTutorial,
  hideTutorial,
  getUserLooksData,
  getUserLooks,
  likeUpdate,
  unlikeUpdate,
  loadMoreUserLooks,
  followUpdate,
  getLookLikes,
  initLookLikes,
  unFollowUpdate,
  getUserFollowsData,
  initUserFollows,
  getUserFollowersData,
  initUserFollowers,
  getLookCommentsData,
  initLookComments,
  addLookComment,
  getFeed,
  loadMore,
  getNotifications,
  goToNotificationSubjectScreen,
  markAsReadNotifications,
  clearNewNotifications,
  addLookItems,
};
