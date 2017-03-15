import React, { Component } from 'react';
import { Platform } from 'react-native';
import BaseAnalytic from './BaseAnalytic';
import { AppEventsLogger } from 'react-native-fbsdk';

class FacebookAnalytics extends BaseAnalytic {
  constructor() {
    super();
  }

  setUser(user) {
    console.log('FacebookAnalytics.setUser Do nothing', user);
  }

  trackScreen(name, params = {}) {
    console.log('FacebookAnalytics.trackScreen', name, params, params.page);
    AppEventsLogger.logEvent(name, params);
  }

  endTrackScreen(name, params = {}) {
    console.log("FacebookAnalytics no tracking for this method", name, params);
  }

  logEvent(name, params = {}, timed = false) {
    console.log('FacebookAnalytics.logEvent', name, params, timed);
    const action = params.name || name;
    delete params['name']
    AppEventsLogger.logEvent(action, params);
  }
}

export default FacebookAnalytics;
