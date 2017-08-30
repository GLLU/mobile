'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { followUpdate, unFollowUpdate, goToNotificationSubjectScreen, markAsReadNotifications } from '../../../actions';

import ListViewHeader from './ListViewHeader';
import NotificationRow from './NotificationRow';
import BaseComponent from "../../common/base/BaseComponent";
import SpinnerSwitch from "../../loaders/SpinnerSwitch";
import Separator from "../../common/lists/Separator";

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
    this.onMarkAsReadPress = this.onMarkAsReadPress.bind(this);
    this.onUserNavigate = this.onUserNavigate.bind(this);
    this.toggleFollowAction = this.toggleFollowAction.bind(this);
    this.state = {
      isTrueEndReached: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (_.isEmpty(nextProps.notifications)) {
      this.setState({isTrueEndReached: true});
    }
  }

  onUserNavigate(props) {
    this.logEvent('NotificationsScreen', {name: 'user clicked notification'});
    if(props.action_kind === 'Follow') {
      this.props.navigateTo('profileScreen', { userId: props.initiator.id} );
    } else  {
      this.setState({isNavigating:true},()=>{
        this.props.goToNotificationSubjectScreen(props.go_to_object.id, props.id)
          .then(look=>{
            this.setState({isNavigating:false},()=> {
              this.props.navigateTo('lookScreenProfile', { lookId: look.id })
            });
          });
      });

    }

  }

  onMarkAsReadPress(props) {
    this.logEvent('NotificationsScreen', {name: 'user clicked mark is read'});
    this.props.markAsReadNotifications(props.id)
  }

  toggleFollowAction(user, shouldFollow) {
    let data = {id: user.id};
    if (shouldFollow) {
      this.props.fol
      lowUpdate(data);
    }
    else {
      this.props.unFollowUpdate(data);
    }
  }

  renderListView() {
    return (
    <FlatList
      style={styles.container}
      data={this.props.notifications}
      keyExtractor={(notification,index)=>notification.id!==-1?notification.id:index}
      ItemSeparatorComponent={()=><Separator/>}
      renderItem={({item}) => <NotificationRow onMarkAsReadPress={this.onMarkAsReadPress} onUserPress={this.onUserNavigate} onFollowPress={this.toggleFollowAction} {...item}/>}
      onEndReached={this.state.isTrueEndReached? _.noop:this.props.onEndReached}
      onEndReachedThreshold={100}
    />
    );
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <ListViewHeader goBack={this.props.goBack} title={`My ${this.props.headerData.mode}`}/>
        {this.props.notifications && this.props.notifications.length > 0 ? this.renderListView() : this.props.renderEmpty()}
        {this.state.isNavigating? <SpinnerSwitch/> : null}
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

