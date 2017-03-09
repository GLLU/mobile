import FlurryAnalytics from './FlurryAnalytics';
import GoogleAnalytics from './GoogleAnalytics';
export const APP_LOADED_EVENT = 'AppLoaded';
export const PAGE_LOADED_EVENT = 'PageLoaded';
export const GENERAL_EVENT = 'GeneralEvent';

class Analytics {
  constructor(user) {
    console.log("Init Analytics");
    this.tools = this.setupAnalytics();
  }

  setupAnalytics() {
    return [
      new FlurryAnalytics(),
      new GoogleAnalytics(),
    ]
  }

  setUser(user) {
    this._loop(x => {
      x.setUser(user);
    })
  }

  trackScreen(...args) {
    this._loop(x => {
      if (typeof x.trackScreen === 'function') {
        x.trackScreen(...args);
      }
    })
  }

  endTrackScreen(...args) {
    this._loop(x => {
      if (typeof x.trackScreen === 'function') {
        x.endTrackScreen(...args);
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