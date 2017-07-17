// @flow

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity, Text, View } from 'react-native';
import ListScreen from "../common/lists/ListScreen";
import i18n from 'react-native-i18n';
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
    getBlockedUsers:_.noop,
    blockedUsers:[]
  };

  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
    this.props.getBlockedUsers()
  }

  renderEmptyView(){
    return (
      <View style={{flex:1, justifyContent:'center'}}>
      <Text style={{textAlign:'center'}}>
        {i18n.t('EMPTY_BLOCKED_USERS')}
      </Text>
    </View>
    );
  }

  render() {
    const {totalBlockedUsersCount, blockedUsers, goBack, unblockUser } = this.props;
    const header = {title: 'Blocked Users', count:totalBlockedUsersCount};
    return (
      <ListScreen
        renderEmpty={this.renderEmptyView}
        renderItem={(user) => <BlockedUserRow {...user} key={user.id} userId={user.id} onUnblockUserPress={unblockUser}/>}
        headerData={header}
        data={blockedUsers}
        goBack={goBack}
        />
    );
  }
}

export default BlockedUsersScreen;