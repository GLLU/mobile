import FlurryAnalytics from './FlurryAnalytics';
import GoogleAnalytics from './GoogleAnalytics';
import FacebookAnalytics from './FacebookAnalytics';
import { APP_LOADED_EVENT, PAGE_LOADED_EVENT } from './constants';

class Analytics {
  constructor() {
    console.log("Init Analytics");
    this.tools = this.setupAnalytics();
  }

  setupAnalytics() {
    return [
      new FlurryAnalytics(),
      new GoogleAnalytics(),
      new FacebookAnalytics(),
    ]
  }

  setUser(user) {
    this._loop(x => {
      x.setUser(user);
    })
  }

  trackAppLoaded(params = {}) {
    this.logEvent(APP_LOADED_EVENT, params, true);
  }

  endTrackAppLoaded(params = {}) {
    this.endTimedEvent(APP_LOADED_EVENT, params);
  }

  trackScreen(...args) {
    this._loop(x => {
      if (typeof x.trackScreen === 'function') {
        x.trackScreen(PAGE_LOADED_EVENT, ...args);
      }
    })
  }

  endTrackScreen(...args) {
    this._loop(x => {
      if (typeof x.trackScreen === 'function') {
        x.endTrackScreen(PAGE_LOADED_EVENT, ...args);
      }
    })
  }

  logEvent(...args) {
    this._loop(x => {
      if (typeof x.logEvent === 'function') {
        x.logEvent(...args);
      }
    });
  }

  endTimedEvent(...args) {
    this._loop(x => {
      if (typeof x.logEvent === 'function') {
        x.endTimedEvent(...args);
      }
    });
  }

  _loop(callback) {
    this.tools.map(callback);
  }
}

export default new Analytics();