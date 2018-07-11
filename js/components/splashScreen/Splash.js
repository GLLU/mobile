// @flow

import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { NavigationActions } from 'react-navigation';

import * as userMapper from '../../mappers/userMapper';

const background = require('../../../images/backgrounds/splashScreen.png');

const deviceWidth = Dimensions.get('window').width;

type SplashProps = {
  checkLogin: () => void,
  resetTo: (string) => void
};

class Splash extends Component {

  props: SplashProps;

  constructor(props: SplashProps) {
    super(props);
    this.checkLogin = this.checkLogin.bind(this);
  }

  componentWillMount() {
    this.checkLogin();
  }

  checkLogin() {
    const { user, screenProps, setUsers } = this.props;
    const { notification } = screenProps;
    if (notification) {
      const mappedUser = userMapper.map(notification.initiator);
      setUsers({ [mappedUser.id]: mappedUser });
    }
    setTimeout(() => {
      this.props.checkLogin()
        .then(() => {
          if (user.id !== -1 && user.name !== null) {
            if (notification) {
              if (notification.groupedNotifications) {
                this.props.resetWithPayload({
                  index: 1,
                  actions: [
                    NavigationActions.navigate({ routeName: 'feedscreen' }),
                    NavigationActions.navigate({ routeName: 'notificationsScreen' }),
                  ],
                });
              }
              else if (notification.action_kind === 'Follow') {
                this.props.resetWithPayload({
                  index: 1,
                  actions: [
                    NavigationActions.navigate({ routeName: 'feedscreen' }),
                    NavigationActions.navigate({ routeName: 'profileScreen', params: { userId: notification.initiator.id } }),
                  ],
                });
              } else {
                this.props.goToNotificationSubjectScreen(notification.go_to_object.id, notification.id)
                  .then(look => {
                    this.props.resetWithPayload({
                      index: 1,
                      actions: [
                        NavigationActions.navigate({ routeName: 'feedscreen' }),
                        NavigationActions.navigate({ routeName: 'lookScreenProfile', params: { lookId: look.id } }),
                      ],
                    });
                  });
              }
            } else {
              OneSignal.sendTag('id', user.id.toString());
              this.props.resetTo('feedscreen');
            }
          } else {
            this.props.resetTo('loginscreen');
          }
        })
        .catch(() => {
          this.props.resetTo('loginscreen');
        });
    }, 50);
  }

  render() {
    return (
      <Image
        source={background} resizeMode={'stretch'}
        style={{ flex: 1, width: deviceWidth, justifyContent: 'center', alignItems: 'center' }} />
    );
  }
}

export default Splash;
