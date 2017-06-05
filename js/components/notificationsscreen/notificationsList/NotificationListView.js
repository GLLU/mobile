'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text,View  } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { followUpdate, unFollowUpdate, goToNotificationSubjectScreen, markAsReadNotifications } from '../../../actions';

import ListViewHeader from './ListViewHeader';
import NotificationRow from './NotificationRow';
import BaseComponent from "../../common/base/BaseComponent";

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#e6e6e6',
  },
});

class NotificationListView extends BaseComponent {

  static propTypes = {
    notifications: React.PropTypes.object,
    onEndReached: React.PropTypes.func,
    headerData: React.PropTypes.object,
    renderEmpty: React.PropTypes.func
  };

  static defaultProps = {
    renderEmpty: _.noop
  };

  constructor(props) {
    super(props);
    this.renderListView = this.renderListView.bind(this);
    const ds = new ListView.DataSource({rowHasChanged: this.rowHasChanged});
    this.state = {
      dataSource: ds.cloneWithRows(props.notifications.allNotifications||[]),
      isTrueEndReached: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (_.isEmpty(nextProps.notifications.allNotifications)) {
      this.setState({isTrueEndReached: true});
    }
    if (nextProps.notifications !== this.props.notifications.allNotifications) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.notifications.allNotifications||[])
      })
    }
  }

  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }

  onUserNavigate(props) {
    this.logEvent('NotificationsScreen', {name: 'user clicked notification'});
    if(props.action_kind === 'Follow') {
      this.props.navigateTo('profileScreen',props);
    } else  {
      this.props.goToNotificationSubjectScreen(props.go_to_object.id, props.id)
        .then(look=>this.props.navigateTo('looksScreen', look));
    }

  }

  onMarkAsReadPress(props) {
    this.logEvent('NotificationsScreen', {name: 'user clicked mark is read'});
    this.props.markAsReadNotifications(props.id)
  }

  toggleFollowAction(user, shouldFollow) {
    let data = {id: user.id};
    if (shouldFollow) {
      this.props.followUpdate(data);
    }
    else {
      this.props.unFollowUpdate(data);
    }
  }

  renderListView() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(data) => <NotificationRow onMarkAsReadPress={this.onMarkAsReadPress.bind(this)} onUserPress={this.onUserNavigate.bind(this)} onFollowPress={this.toggleFollowAction.bind(this)} {...data}/>}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
        enableEmptySections={true}
        onEndReached={this.state.isTrueEndReached? _.noop:this.props.onEndReached}
        onEndReachedThreshold={100}
      />
    );
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <ListViewHeader goBack={this.props.goBack} title={`My ${this.props.headerData.mode}`}/>
        {this.props.notifications.allNotifications && this.props.notifications.allNotifications.length > 0 ? this.renderListView() : this.props.renderEmpty()}
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    followUpdate: (id) => dispatch(followUpdate(id)),
    unFollowUpdate: (id) => dispatch(unFollowUpdate(id)),
    goToNotificationSubjectScreen: (objectId, notificationId) => dispatch(goToNotificationSubjectScreen(objectId, notificationId)),
    markAsReadNotifications: (notificationId) => dispatch(markAsReadNotifications(notificationId))
  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindAction)(NotificationListView);

