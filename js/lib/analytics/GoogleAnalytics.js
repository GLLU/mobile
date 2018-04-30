/*
import React from 'react';
import Config from 'react-native-config';
import _ from 'lodash';
import {
  GoogleAnalyticsTracker,
  GoogleAnalyticsSettings,
} from 'react-native-google-analytics-bridge';
import { encrypt } from "../../utils/MD5Utils";


class GoogleAnalytics {
  constructor() {
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
        this.tracker.setUser(encrypt(user.id));
      }
    }
  }

  trackScreen(name, params = {}) {
    this.tracker.trackScreenView(params.page);
  }

  endTrackScreen(name, params = {}) {
  }

  logEvent(name, params = {}, timed = false) {
    const action = params.name || name;
    delete params['name']
    if (!_.isEmpty(params)) {
      let label = '';
      let value = null;
      for (let [k, v] of Object.entries(params)) {
        label = k;
        value = `${v}`;
        break;
      }
      if (value != null && value != undefined) {
        if (!_.isNumber(value)) {
          this.tracker.trackEvent(name, action, { label: value });
        } else {
          this.tracker.trackEvent(name, action, { label, value });
        }
      }
      
    } else {
      this.tracker.trackEvent(name, action);
    }
  }
}

export default GoogleAnalytics;
*/
