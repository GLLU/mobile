// @flow

import asScreen from '../common/containers/Screen'
import { connect } from "react-redux";
import BlockedUsersScreen from "./BlockedUsersScreen";
import { unblockUser } from "../../actions/user";

const mapDispatchToProps = (dispatch) => {
  return {
    getBlockedUsers: () => ([]),
    unblockUser: (userId) => dispatch(unblockUser(userId)),
  };
};

const mapStateToProps = (state) => {
  return {}

};

export default connect(mapStateToProps, mapDispatchToProps)(asScreen(BlockedUsersScreen));