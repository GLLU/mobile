import React, { Component } from 'react';
import { Alert } from 'react-native';
import Config from 'react-native-config'
import BaseComponent from './BaseComponent';
import Analytics from '../../lib/analytics/Analytics';

class BasePage extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('BasePage componentDidMount');
    Analytics.trackScreen({
      page: this.constructor.name,
    }, true);
  }

  componentWillUnmount() {
    console.log('BasePage componentWillUnmount');
    Analytics.endTrackScreen({
      page: this.constructor.name,
    });
  }

  setLeaveBreadcrumb(props) {
    this.bugsnag.leaveBreadcrumb("Page", {
      type: 'navigation',
      component: this.constructor.name,
      props: props,
    });
  }

  resetToFeedscreen() {
    this.resetToHome('feedscreen');
  }

  resetToHome(homeroute) {
    this.props.reset([
      {
        key: homeroute,
        index: 0,
      },
    ], this.props.navigation.key);
  }

  goBack(withConfirmation = false) {
    if (withConfirmation) {
      Alert.alert(
        '',
        'Are you sure you want to go back?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              console.log('Cancel Pressed');
            },
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () => {
              this.goBack(false);
            }
          }
        ]
      );
    } else {
      console.log(`let's navigate!`,this.props.navigation)
      this.props.navigation.goBack();
    }
  }
}

export default BasePage;
