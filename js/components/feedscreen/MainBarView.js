import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Platform,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  InteractionManager
} from 'react-native';
import {Icon} from 'native-base';
import BaseComponent from '../common/base/BaseComponent';
import withAnalytics from '../common/analytics/WithAnalytics';


const homeIcon = require('../../../images/logo/inFASH-header.png');
const userIcon = require('../../../images/icons/Profile_black.png');
const emptyNotification = require('../../../images/icons/Bell.png');
const gotNotification = require('../../../images/icons/Bell_circle.png');
const cameraIcon = require('../../../images/icons/Camera_black.png');
const search = require('../../../images/icons/search-black.png');

const styles = StyleSheet.create({
  btnProfile: {
    paddingVertical: 0,
    paddingHorizontal: 7,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnFilter: {
    paddingVertical: 0,
    alignItems: 'center',
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnCamera: {},
  btnImage: {
    height: 23,
    width: 23,
    marginBottom: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  logo: {
    height: 40,
    width: 80,
    resizeMode: 'contain',
    marginBottom: 2,
  },
  normalBtn: {
    fontSize: 24,
  },
  wallet: {
    paddingTop: (Platform.OS === 'ios' ? 10 : 0),
    marginTop: 5,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'normal',
    color: '#757575',
  },
  navigationBar: {
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    paddingBottom: 5,
    alignItems: 'center',
  },
  btnImageHanger: {
    height: 23,
    width: 23,
    resizeMode: 'contain',
  },
  hangerBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  centerEdges: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  profileBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

type Props = {
  user: object,
  handleSearchStatus: void,
  navigateTo: void,
  logEvent: void,
  addNewItem: void,
  searchStatus: bool,

}

class MainBarView extends BaseComponent {

  props: Props

  constructor(props: Props) {
    super(props);
    this._openSearch = this._openSearch.bind(this);
    this.handleNotificationsPress = this.handleNotificationsPress.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.goToSearch = this.goToSearch.bind(this);
    this.state = {
      hasNotify: false,
      searchStatus: false,
    };
  }

  _openSearch() {
    this.logEvent('Feedscreen', {name: 'Search click'});
    // this.setState({searchStatus: !this.state.searchStatus})
    this.props.handleSearchStatus();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchStatus !== prevState.searchStatus) {
    }
  }

  goToProfile() {
    const {logEvent, navigateTo} = this.props
    logEvent('Feedscreen', {name: 'Profile click'});
    navigateTo('profileScreen', this.props.user);
  }

  goToSearch() {
    const {logEvent, navigateTo, handleIndexChange} = this.props
    logEvent('Feedscreen', {name: 'Profile click'});
    navigateTo('searchScreen');
    handleIndexChange(2)
  }

  handleNotificationsPress() {
    const {logEvent, navigateTo} = this.props
    logEvent('Feedscreen', {name: 'Notifications click'});
    navigateTo('notificationsScreen');
  }


  renderNavigationButton(icon: string, onPress: void, iconStyle: object, containerStyle: object) {
    return (
      <View style={containerStyle}>
        <TouchableOpacity transparent onPress={onPress}>
          <Image source={icon} style={iconStyle}/>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {gotNewNotifications, addNewItem} = this.props;
    const notificationsIcon = gotNewNotifications ? gotNotification : emptyNotification;
    return (
      <View style={styles.navigationBar}>
        <View style={{flexDirection: 'row', flex: 1}}>
          {this.renderNavigationButton(cameraIcon, addNewItem, styles.btnImage, styles.centerEdges)}
          {this.renderNavigationButton(userIcon, this.goToProfile, styles.btnImage)}
        </View>
        <View style={{flex: 3, flexDirection: 'row', justifyContent: 'center'}}>
          <Image source={homeIcon} style={[styles.logo]}/>
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          {this.renderNavigationButton(notificationsIcon, this.handleNotificationsPress, styles.btnImageHanger)}
          {this.renderNavigationButton(search, this.goToSearch, styles.btnImage, styles.centerEdges)}
        </View>
      </View>
    );
  }
}

export default withAnalytics(MainBarView);
