import React, { Component } from 'react';
import { Platform } from 'react-native';
import BaseAnalytic from './BaseAnalytic';
import { AppEventsLogger } from 'react-native-fbsdk';

class FacebookAnalytics extends BaseAnalytic {
  constructor() {
    super();
  }

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
