import React, { Component } from 'react';
import { Platform } from 'react-native';
import Config from 'react-native-config';
import BaseAnalytic from './BaseAnalytic';
import _ from 'lodash';
import {
  GoogleAnalyticsTracker,
  GoogleAnalyticsSettings,
} from 'react-native-google-analytics-bridge';


class GoogleAnalytics extends BaseAnalytic {
  constructor() {
    super();
    this.tracker = new GoogleAnalyticsTracker(Config.GOOGLE_ANALYTICS_TRACKER_ID);
    GoogleAnalyticsSettings.setDispatchInterval(30);
    // later we can enable it to reduce debug noice
    // if (__DEV__) {
    //   GoogleAnalyticsSettings.setDryRun(true);
    // }
  }

  setUser(user) {
    if (!_.isEmpty(user)) {
      if (user.id && user.id != -1) {
        this.tracker.setUser(this.encryptUserId(user.id));
      }
    }
  }

  trackScreen(name, params = {}) {
    console.log('GoogleAnalytics trackScreen', name, params, params.page);
    this.tracker.trackScreenView(params.page);
  }

  endTrackScreen(name, params = {}) {
    console.log("GoogleAnalytics no tracking for this method");
  }

  logEvent(name, params = {}, timed = false) {
    const action = params.action || name;
    this.tracker.trackEvent(name, action, params);
  }
}

export default GoogleAnalytics;
