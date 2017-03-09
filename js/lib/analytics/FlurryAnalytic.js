import React, { Component } from 'react';
import { Platform } from 'react-native';
import FlurryAnalytics from 'react-native-flurry-analytics';
import Config from 'react-native-config';
import BaseAnalytic from './BaseAnalytic';
import _ from 'lodash';
import md5 from 'md5';

class FlurrAnalytic extends BaseAnalytic {
  constructor() {
    super();
    FlurryAnalytics.setAppVersion(Config.APP_VERSION);
    FlurryAnalytics.setSessionContinueSeconds(10);
    FlurryAnalytics.setEventLoggingEnabled(true);
    if (__DEV__) {
      FlurryAnalytics.setCrashReportingEnabled(false);
      FlurryAnalytics.setDebugLogEnabled(true);
      FlurryAnalytics.setEventLoggingEnabled(true);
    } else {
      FlurryAnalytics.setCrashReportingEnabled(true);
      FlurryAnalytics.setDebugLogEnabled(false);      
    }

    const key = Platform.OS === 'ios' ? Config.FLURRY_API_KEY_IOS : Config.FLURRY_API_KEY_ANDROID
    FlurryAnalytics.startSession(key);
  }

  setUser(user) {
    if (!_.isEmpty(user)) {
      if (user.id && user.id != -1) {
        FlurryAnalytics.setUserId(md5(`${user.id}`));
        FlurryAnalytics.setUserGender(user.gender == 'male' ? 'm' : 'f');
      }
    }
  }

  logEvent(name, params = {}, timed = false) {
    FlurryAnalytics.logEvent(name, params, timed);
  }

  endTimedEvent(name, params = {}) {
    FlurryAnalytics.endTimedEvent(name, params);
  }
}

export default FlurrAnalytic;
