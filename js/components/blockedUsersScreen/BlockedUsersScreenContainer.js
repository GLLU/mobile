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
  const blockerUserWithUsersObject = _.map(blockedUsersState.blockedUsers, (userId) => state.users.usersData[userId])
  return {
    blockedUsers: blockerUserWithUsersObject,
    totalBlockedUsersCount: blockedUsersState.meta.total
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(asScreen(BlockedUsersScreen));