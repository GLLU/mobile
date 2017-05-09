import React, { Component } from 'react';
import { StyleSheet, Image, Platform } from 'react-native'
import { View, Text, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import navigateTo from '../../actions/sideBarNav';
import BaseComponent from '../common/BaseComponent';
import {openCamera} from '../../lib/camera/CameraUtils'

const userIcon = require('../../../images/icons/user.png');
const emptyNotification = require('../../../images/icons/emptyNotification.png');
const gotNotification = require('../../../images/icons/hangerGreenCircle.png');
const bagIcon = require('../../../images/icons/bag.png');
const rectangleIcon = require('../../../images/icons/rectangle.png')
const searchIcon = require('../../../images/icons/search.png')
const cameraIcon = require('../../../images/icons/camera.png')

const styles = StyleSheet.create({
  navigationBar: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    paddingLeft: 0,
    paddingBottom: 5
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
    handleSearchStatus: React.PropTypes.func,
    handleOpenPhotoModal: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
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
    this.props.navigateTo('profileScreen', 'feedscreen', this.props.user);
  }

  handleNotificationsPress() {
    this.logEvent('ProfileScreen', {name: 'Notifications click'});
    this.props.navigateTo('notificationsScreen', 'feedscreen');
  }

  async openCamera() {
    this.logEvent('Feedscreen', { name: 'Open Camera click' });
    let file = {};
    file.path = await openCamera();
    if(file.path.search(".mp4") > -1) {
      console.log('filepath: ',file.path)
      file.localPath = file.path
      file.path = file.path.replace('file://', '')
      file.type = 'look[video]'
    } else {
      file.type = 'look[image]'
    }
    this.props.addNewItem(file);
  }

  handleOpenCamera() {
    if(Platform.OS !== 'ios') {
      this.openCamera()
    } else {
      this.props.handleOpenPhotoModal();
    }
  }

  render() {
    const notificationBtn = this.state.gotNewNotifications ? gotNotification : emptyNotification;
    return(
      <View style={styles.navigationBar}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Button transparent onPress={() => this.handleNotificationsPress()}>
            <Image source={notificationBtn} style={styles.btnImageHanger} />
          </Button>
        </View>
        <View style={{flex: 2, flexDirection: 'row', justifyContent: 'center'}}>
          <Button transparent onPress={() => this.handleOpenCamera()} style={styles.btnCamera}>
            <Image source={cameraIcon} style={styles.btnImage} />
          </Button>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button transparent onPress={() => this.goToProfile()} style={styles.btnProfile}>
            <Image source={userIcon} style={styles.btnImage} />
          </Button>
        </View>
      </View>
    )
  }
}

function bindActions(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
  };
}

const mapStateToProps = state => {
  return {
    user: state.user,
    gotNewNotifications: state.notifications.newNotifications
  }
};

export default connect(mapStateToProps, bindActions)(NavigationBarView);
