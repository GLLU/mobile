import React from 'react';
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
    console.log('GoogleAnalytics.setUser', user);
    if (!_.isEmpty(user)) {
      if (user.id && user.id != -1) {
        this.tracker.setUser(this.encryptUserId(user.id));
      }
    }
  }

  trackScreen(name, params = {}) {
    console.log('GoogleAnalytics.trackScreen', name, params, params.page);
    this.tracker.trackScreenView(params.page);
  }

  endTrackScreen(name, params = {}) {
    console.log("GoogleAnalytics no tracking for this method", name, params);
  }

  logEvent(name, params = {}, timed = false) {
    console.log('GoogleAnalytics.logEvent', name, params, timed);
    const label = params.name || name;
    this.tracker.trackEvent(name, label, params);
  }
}

export default GoogleAnalytics;