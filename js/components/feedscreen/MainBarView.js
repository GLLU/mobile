// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Platform,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  InteractionManager,
} from 'react-native';
import { Icon } from 'native-base';
import BaseComponent from '../common/base/BaseComponent';
import withAnalytics from '../common/analytics/WithAnalytics';

import Fonts from '../../styles/Fonts.styles';
import Colors from '../../styles/Colors.styles';
import { formatNumberAsAmount } from '../../utils/FormatUtils';

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
  walletBalance: {
    fontSize: 16,
    lineHeight: 16,
    color: Colors.black,
    marginLeft: 8,
    marginHorizontal: 8,
    fontFamily: Fonts.regularFont,
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
    marginLeft: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  btnImageHanger: {
    height: 23,
    width: 23,
    marginRight: 8,
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
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderRadius: 100,
    width: 8,
    height: 8,
    backgroundColor: Colors.secondaryColor,
  },
});

type Props = {
  user: object,
  handleSearchStatus: void,
  navigateTo: void,
  logEvent: void,
  addNewItem: void,
  searchStatus: boolean,
  balance: number,
  showBalanceBadge: boolean
};

class MainBarView extends BaseComponent {

  props: Props

  constructor(props: Props) {
    super(props);
    this._openSearch = this._openSearch.bind(this);
    this.handleNotificationsPress = this.handleNotificationsPress.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.state = {
      hasNotify: false,
      searchStatus: false,
    };
  }

  _openSearch() {
    this.logEvent('Feedscreen', { name: 'Search click' });
    // this.setState({searchStatus: !this.state.searchStatus})
    this.props.handleSearchStatus();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchStatus !== prevState.searchStatus) {
    }
  }

  goToProfile(cameFromBallance: boolean = false) {
    this.props.logEvent('Feedscreen', { name: `${cameFromBallance ? 'Balance' : 'Profile'} click` });
    this.props.navigateTo('profileScreen', { user: this.props.user, cameFromBallance });
  }

  handleNotificationsPress() {
    this.props.logEvent('Feedscreen', { name: 'Notifications click' });
    this.props.navigateTo('notificationsScreen');
  }

  renderNavigationButton(icon: string, onPress: void, iconStyle: object, containerStyle: object) {
    return (
      <View style={containerStyle}>
        <TouchableOpacity transparent onPress={onPress}>
          <Image source={icon} style={iconStyle} />
        </TouchableOpacity>
      </View>
    );
  }

  _renderNavigationText(text: string, onPress: void, textStyle: object, shouldShowBadge: boolean) {
    return (
      <View>
        <TouchableOpacity transparent onPress={onPress}>
          <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
        {shouldShowBadge ? <View style={styles.badge} /> : null}
      </View>
    );
  }

  render() {
    const { gotNewNotifications, addNewItem, balance, showBalanceBadge } = this.props;
    const notificationsIcon = gotNewNotifications ? gotNotification : emptyNotification;
    return (
      <View style={styles.navigationBar}>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end' }}>
          {this.renderNavigationButton(userIcon, this.goToProfile, styles.btnImage)}
          {this._renderNavigationText(balance !== -1 ? formatNumberAsAmount(balance) : '0.0 US$', () => this.goToProfile(true), styles.walletBalance, showBalanceBadge)}
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <Image source={homeIcon} style={[styles.logo]} />
        </View>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
          {this.renderNavigationButton(notificationsIcon, this.handleNotificationsPress, styles.btnImageHanger)}
          {this.renderNavigationButton(search, addNewItem, styles.btnImage)}
        </View>
      </View>
    );
  }
}

export default withAnalytics(MainBarView);
