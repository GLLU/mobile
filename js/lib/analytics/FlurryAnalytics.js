import React, { Component } from 'react';
import { Platform } from 'react-native';
import FlurryAnalytics from 'react-native-flurry-analytics';
import Config from 'react-native-config';
import BaseAnalytic from './BaseAnalytic';
import _ from 'lodash';

class FlurrAnalytics extends BaseAnalytic {
  constructor() {
    super();
    FlurryAnalytics.setAppVersion(Config.APP_VERSION);
    FlurryAnalytics.setSessionContinueSeconds(10);
    FlurryAnalytics.setEventLoggingEnabled(true);
    if (__DEV__) {
      FlurryAnalytics.setCrashReportingEnabled(false);
      FlurryAnalytics.setDebugLogEnabled(true);
    } else {
      FlurryAnalytics.setCrashReportingEnabled(true);
      FlurryAnalytics.setDebugLogEnabled(false);      
    }

    const key = Platform.OS === 'ios' ? Config.FLURRY_API_KEY_IOS : Config.FLURRY_API_KEY_ANDROID
    FlurryAnalytics.startSession(key);
  }

  setUser(user) {
    console.log('FlurryAnalytics.setUser', user);
    if (!_.isEmpty(user)) {
      if (user.id && user.id != -1) {
        FlurryAnalytics.setUserId(this.encryptUserId(user.id));
        FlurryAnalytics.setUserGender(user.gender == 'male' ? 'm' : 'f');
      }
    }
  }

  trackScreen(name, params = {}) {
    console.log('FlurryAnalytics.trackScreen', name, params);
    this.logEvent(name, params, true);
  }

  endTrackScreen(name, params = {}) {
    console.log('FlurryAnalytics.endTrackScreen', name, params);
    this.endTimedEvent(name, params);
  }

  logEvent(name, params = {}, timed = false) {
    console.log('FlurryAnalytics.logEvent', name, params, timed);
    delete params['name']
    FlurryAnalytics.logEvent(name, params, timed);
  }

  endTimedEvent(name, params = {}) {
    console.log('FlurryAnalytics.endTimedEvent', name, params);
    delete params['name']
    FlurryAnalytics.endTimedEvent(name, params);
  }
}

export default FlurrAnalytics;
