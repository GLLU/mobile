import React, { Component } from 'react';
import { Platform } from 'react-native';
import { AppEventsLogger } from 'react-native-fbsdk';

class FacebookAnalytics {

  setUser(user) {
  }

  trackScreen(name, params = {}) {
    AppEventsLogger.logEvent(name, params);
  }

  endTrackScreen(name, params = {}) {
  }

  logEvent(name, params = {}, timed = false) {
    const action = params.name || name;
    delete params['name']
    AppEventsLogger.logEvent(action, params);
  }
}

export default FacebookAnalytics;
