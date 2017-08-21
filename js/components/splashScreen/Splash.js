// @flow

import React, {Component} from 'react';
import {View, Image, Linking, Platform, Dimensions, TouchableOpacity} from 'react-native';
import OneSignal from 'react-native-onesignal';
import {NavigationActions} from "react-navigation";

import Spinner from '../loaders/Spinner';

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
    const { user, notification } = this.props;
    setTimeout(() => {
      this.props.checkLogin()
        .then(() => {
          if (user.id !== -1 && user.name !== null) {
            if (notification) {
              let screenToNavigate;
              let screenProps;

              if (notification.action_kind === 'Follow') {
                this.props.resetWithPayload({
                  index: 1,
                  actions: [
                    NavigationActions.navigate({ routeName: 'feedscreen' }),
                    NavigationActions.navigate({ routeName: 'profileScreen', params: { user: notification } }),
                  ],
                });
              } else {
                this.props.goToNotificationSubjectScreen(notification.go_to_object.id, notification.id)
                  .then(look => {
                    this.props.resetWithPayload({
                      index: 1,
                      actions: [
                        NavigationActions.navigate({ routeName: 'feedscreen' }),
                        NavigationActions.navigate({ routeName: 'lookScreenWhatsHot', params: { lookId: look.id } }),
                      ],
                    });
                  });
              }
            } else {
              OneSignal.sendTag("id", user.id.toString());
              this.props.resetTo('feedscreen');
            }
          } else {
            this.props.resetTo('loginscreen');
          }
        })
        .catch(() => {
          this.props.resetTo('loginscreen');
        });
    }, 1000);
  }

  render() {
    return (
      <Image
        source={background} resizeMode={'stretch'}
        style={{ flex: 1, width: deviceWidth, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner />
      </Image>
    );
  }
}

export default Splash;
