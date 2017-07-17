// @flow

import asScreen from '../common/containers/Screen'
import { connect } from "react-redux";
import BlockedUsersScreen from "./BlockedUsersScreen";
import { getBlockedUsers, getMoreBlockedUsers, unblockUser } from "../../actions/user";
import * as _ from "lodash";

const mapDispatchToProps = (dispatch) => {
  return {
    getBlockedUsers: () => dispatch(getBlockedUsers()),
    getMoreBlockedUsers: () => dispatch(getMoreBlockedUsers()),
    unblockUser: (userId) => dispatch(unblockUser(userId)),
  };
};

const mapStateToProps = (state) => {
  const blockedUsers = _.map(state.blockedUsers.blockedUsers, user => ({...user, id: user.user_id}));
  return {
    blockedUsers,
    total: state.blockedUsers.meta.total
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(asScreen(BlockedUsersScreen));