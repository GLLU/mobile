// @flow

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity, Text, View } from 'react-native';
import ListScreen from "../common/lists/ListScreen";
import * as _ from "lodash";
import BlockedUserRow from "./BlockedUserRow";

type Props={
  blockedUsers:Array<object>,
  getBlockedUsers:void,
  unblockUser:void,
  totalBlockedUsersCount:number
}

class BlockedUsersScreen extends Component {

  props: Props;

  static defaultProps = {
    getBlockedUsers:_.noop
  };

  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
    this.props.getBlockedUsers()
  }

  render() {
    const {totalBlockedUsersCount, } = this.props;
    const headerData = {title: 'Blocked Users', count:totalBlockedUsersCount};
    return (
      <ListScreen
        renderEmpty={()=>null}
        renderItem={(user) => <BlockedUserRow {...user} key={user.id} userId={user.id} onUnblockUserPress={this.props.unblockUser}/>}
        headerData={headerData}
        data={this.props.blockedUsers}
        goBack={this.props.goBack}
        />
    );
  }
}

export default BlockedUsersScreen;