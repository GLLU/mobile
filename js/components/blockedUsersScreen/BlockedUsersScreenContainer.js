// @flow

import asScreen from '../common/containers/Screen'
import { connect } from "react-redux";
import BlockedUsersScreen from "./BlockedUsersScreen";
import { getBlockedUsers, getMoreBlockedUsers, unblockUser } from "../../actions/user";

const mapDispatchToProps = (dispatch) => {
  return {
    getBlockedUsers: () => dispatch(getBlockedUsers()),
    getMoreBlockedUsers: () => dispatch(getMoreBlockedUsers()),
    unblockUser: (userId) => dispatch(unblockUser(userId)),
  };
};

const mapStateToProps = (state) => {
  const blockedUsersState = state.blockedUsers;
  return {
    blockedUsers: blockedUsersState.blockedUsers,
    totalBlockedUsersCount: blockedUsersState.meta.total
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(asScreen(BlockedUsersScreen));