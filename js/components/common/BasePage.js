import React, { Component } from 'react';
import { Alert } from 'react-native';
import Config from 'react-native-config'
import BaseComponent from './BaseComponent';
import Analytics, {
  APP_LOADED_EVENT,
  PAGE_LOADED_EVENT
} from '../../lib/analytics/Analytics';

class BasePage extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('BasePage componentDidMount');
    Analytics.trackScreen(PAGE_LOADED_EVENT, {
      page: this.constructor.name,
    }, true);
  }

  componentWillUnmount() {
    console.log('BasePage componentWillUnmount');
    Analytics.endTrackScreen(PAGE_LOADED_EVENT, {
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
              this.props.popRoute(this.props.navigation.key);
            }
          }
        ]
      );
    } else {
      this.props.popRoute(this.props.navigation.key);
    }
  }
}

export default BasePage;
