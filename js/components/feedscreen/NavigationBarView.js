import React, { Component } from 'react';
import { StyleSheet, Image, Platform ,View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import BaseComponent from '../common/base/BaseComponent';
import { takeMedia } from '../../lib/camera/CameraUtils'
import * as _ from "lodash";

const userIcon = require('../../../images/icons/user.png');
const emptyNotification = require('../../../images/icons/emptyNotification.png');
const gotNotification = require('../../../images/icons/hangerGreenCircle.png');
const cameraIcon = require('../../../images/icons/camera.png')

const styles = StyleSheet.create({
  navigationBar: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    paddingBottom: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5


  },
  btnImageHanger: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  btnCamera: {
  },
  btnImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  normalBtn: {
    fontSize: 24
  },
  wallet: {
    paddingTop: (Platform.OS === 'ios' ? 10 : 0),
    marginTop: 5,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'normal',
    color: '#757575'
  },
});

class NavigationBarView extends BaseComponent {
  static propTypes = {
    user: React.PropTypes.object,
    navigateTo: React.PropTypes.func,
    addNewItem: React.PropTypes.func
  }

  static defaultProps = {
    navigateTo: _.noop,
    addNewItem: _.noop
  }

  constructor(props) {
    super(props);
    this.handleNotificationsPress=this.handleNotificationsPress.bind(this);
    this.takeMedia=this.takeMedia.bind(this);
    this.goToProfile=this.goToProfile.bind(this);
    this.state = {
      gotNewNotifications: this.props.gotNewNotifications
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.gotNewNotifications !== nextProps.gotNewNotifications) {
      this.setState({gotNewNotifications: nextProps.gotNewNotifications})
    }
  }

  goToProfile() {
    this.logEvent('Feedscreen', { name: 'Profile click' });
    this.props.navigateTo('profileScreen', this.props.user);
  }

  handleNotificationsPress() {
    this.logEvent('Feedscreen', {name: 'Notifications click'});
    this.props.navigateTo('notificationsScreen');
  }

  async takeMedia() {
    this.logEvent('Feedscreen', { name: 'Open Camera click' });
    const file = await takeMedia();
    if(file){
      this.props.addNewItem(file);
    }
  }

  render() {
    const notificationBtn = this.state.gotNewNotifications ? gotNotification : emptyNotification;
    return(
      <View style={styles.navigationBar}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <TouchableOpacity transparent onPress={this.handleNotificationsPress}>
            <Image source={notificationBtn} style={styles.btnImageHanger} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 2, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity transparent onPress={this.takeMedia} style={styles.btnCamera}>
            <Image source={cameraIcon} style={styles.btnImage} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableOpacity transparent onPress={this.goToProfile} style={styles.btnProfile}>
            <Image source={userIcon} style={styles.btnImage} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    gotNewNotifications: state.notifications.newNotifications
  }
};

export default connect(mapStateToProps)(NavigationBarView);
