import React, { Component } from 'react';
import { Platform } from 'react-native';
import RNFlurryAnalytics from 'react-native-flurry-analytics';
import Config from 'react-native-config';
import BaseAnalytic from './BaseAnalytic';
import _ from 'lodash';

/*global __DEV__ */
const DEV=__DEV__;

class FlurryAnalytics extends BaseAnalytic {
  constructor() {
    super();
    RNFlurryAnalytics.setAppVersion(Config.APP_VERSION);
    RNFlurryAnalytics.setSessionContinueSeconds(10);
    RNFlurryAnalytics.setEventLoggingEnabled(true);
    if (DEV) {
      RNFlurryAnalytics.setCrashReportingEnabled(false);
      RNFlurryAnalytics.setDebugLogEnabled(true);
    } else {
      RNFlurryAnalytics.setCrashReportingEnabled(true);
      RNFlurryAnalytics.setDebugLogEnabled(false);
    }
    const key = Platform.OS === 'ios' ? Config.FLURRY_API_KEY_IOS : Config.FLURRY_API_KEY_ANDROID
    RNFlurryAnalytics.startSession(key);
  }

  setUser(user) {
    if (!_.isEmpty(user)) {
      if (user.id && user.id != -1) {
        RNFlurryAnalytics.setUserId(this.encryptUserId(user.id));
        RNFlurryAnalytics.setUserGender(user.gender === 'male' ? 'm' : 'f');
      }
    }
  }

  trackScreen(name, params = {}) {
    this.logEvent(name, params, true);
  }

  endTrackScreen(name, params = {}) {
    this.endTimedEvent(name, params);
  }

  logEvent(name, params = {}, timed = false) {
    delete params['name']
    RNFlurryAnalytics.logEvent(name, params, timed);
  }

  endTimedEvent(name, params = {}) {
    delete params['name']
    RNFlurryAnalytics.endTimedEvent(name, params);
  }
}

export default FlurryAnalytics;
