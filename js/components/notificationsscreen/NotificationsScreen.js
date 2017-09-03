// @flow

import React, {Component} from 'react';
import {ListView, Image, TouchableOpacity, View, Text, ActivityIndicator} from 'react-native';
import I18n from 'react-native-i18n';
import EmptyStateScreen from '../common/EmptyStateScreen';
import NotificationListView from './notificationsList/NotificationListView';
import { openCamera } from '../../lib/camera/CameraUtils';
import { formatLook } from '../../utils/UploadUtils';

type notificationsProps = {
  notifications: any,
  isLoading: boolean,
  getNotifications: () => void,
  clearNewNotifications: () => void,
  navigateTo: () => void,
  goBack: () => void

};

class NotificationsScreen extends Component {

  props: notificationsProps;

  constructor() {
    super();
    this._uploadLook = this._uploadLook.bind(this);
  }

  componentDidMount() {
    this.props.clearNewNotifications();
  }

  _getNotificationsData = () => {
    this.props.getNotifications(); // need to be moved to notification page
  }

  _renderEmptyState = () => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <EmptyStateScreen
        title={I18n.t('NO_NOTIFICATIONS_TITLE')} subtitle={I18n.t('NO_NOTIFICATIONS_LEGEND')}
        icon={require('../../../images/emptyStates/alert.png')}
        buttonText={I18n.t('POST_NOW')}
        onButtonClicked={this._uploadLook} />
    </View>
  )

  async _uploadLook() {
    this.props.logEvent('Followerscreen', {name: 'user started uploading a look', origin: 'notifications'});
    const path = await openCamera(true);
    const file = formatLook(path);
    if (file) {
      this._goToAddNewItem(file);
    } else {
      this.props.logEvent('Followerscreen', {name: 'User canceled the upload look', origin: 'camera'})
    }
  }

  _goToAddNewItem = (imagePath: any) => {
    this.props.addNewLook(imagePath).then(() => {
      this.props.navigateTo('uploadLookScreen', { mode: 'create' });
    }).catch((err) => {
    });
  }


  render(): React.Component {
    const headerData = {
      mode: 'Notifications',
    };

    const { notifications, navigateTo, goBack, isLoading } = this.props;

    if (isLoading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
        <NotificationListView
          renderEmpty={this._renderEmptyState}
          headerData={headerData}
          notifications={notifications}
          navigateTo={navigateTo}
          goBack={goBack}
          onEndReached={this._getNotificationsData}
          mode={headerData.mode}/>
      </View>
    );
  }
}

export default NotificationsScreen;
