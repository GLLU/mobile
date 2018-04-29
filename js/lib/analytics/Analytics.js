import { Platform } from 'react-native';

import AppsFlyerAnalytics from './AppsFlyerAnalytics';
//import GoogleAnalytics from './GoogleAnalytics';
import FacebookAnalytics from './FacebookAnalytics';
import MixPanelAnalytics from './MixPanelAnalytics';
import { APP_LOADED_EVENT, PAGE_LOADED_EVENT } from './constants';

class Analytics {
  constructor() {
    this.tools = this.setupAnalytics();
  }

  setupAnalytics() {

    if (Platform.OS === 'ios'){
      return [
        new FacebookAnalytics(),
        new MixPanelAnalytics(),
      ];
    }

    return [
      new FacebookAnalytics(),
      new MixPanelAnalytics(),
      new AppsFlyerAnalytics(),
    ];
  }

  setUser(user) {
    this._loop((x) => {
      if (typeof x.setUser === 'function') {
        x.setUser(user);
      }
    });
  }

  trackAppLoaded(params = {}) {
    this.logEvent(APP_LOADED_EVENT, params, true);
  }

  endTrackAppLoaded(params = {}) {
    this.endTimedEvent(APP_LOADED_EVENT, params);
  }

  trackScreen(params = {}) {
    this._loop((x) => {
      if (typeof x.trackScreen === 'function') {
        x.trackScreen(PAGE_LOADED_EVENT, Object.assign({}, params));
      }
    });
  }

  endTrackScreen(params = {}) {
    this._loop((x) => {
      if (typeof x.endTrackScreen === 'function') {
        x.endTrackScreen(PAGE_LOADED_EVENT, Object.assign({}, params));
      }
    });
  }

  logEvent(name, params = {}) {
    this._loop((x) => {
      if (typeof x.logEvent === 'function') {
        x.logEvent(name, Object.assign({}, params));
      }
    });
  }

  endTimedEvent(name, params = {}) {
    this._loop((x) => {
      if (typeof x.endTimedEvent === 'function') {
        x.endTimedEvent(name, Object.assign({}, params));
      }
    });
  }

  _loop(callback) {
    this.tools.map(callback);
  }
}

export default new Analytics();
