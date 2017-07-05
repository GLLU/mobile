import React, { Component } from 'react';
import { Platform } from 'react-native';
import RNFlurryAnalytics from 'react-native-flurry-analytics';
import Config from 'react-native-config';
import _ from 'lodash';
import { encrypt } from "../../utils/MD5Utils";

/*global __DEV__ */
const DEV=__DEV__;

class FlurryAnalytics {
  constructor() {
    RNFlurryAnalytics.setAppVersion(Config.APP_VERSION);
    RNFlurryAnalytics.setSessionContinueSeconds(10);
    if (DEV) {
      RNFlurryAnalytics.setCrashReportingEnabled(false);
      RNFlurryAnalytics.setDebugLogEnabled(true);
    } else {
      RNFlurryAnalytics.setCrashReportingEnabled(true);
      RNFlurryAnalytics.setDebugLogEnabled(false);
    }
    this.startSession();
  }

  startSession() {
    const key = Platform.OS === 'ios' ? Config.FLURRY_API_KEY_IOS : Config.FLURRY_API_KEY_ANDROID
    RNFlurryAnalytics.startSession(key);
  }

  setUser(user) {
    if (!_.isEmpty(user)) {
      if (user.id && user.id != -1) {
        RNFlurryAnalytics.setUserId(encrypt(user.id));
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
