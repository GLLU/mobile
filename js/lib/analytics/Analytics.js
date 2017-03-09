import FlurryAnalytic from './FlurryAnalytic';

export const APP_LOADED_EVENT = 'AppLoaded';
export const PAGE_LOADED_EVENT = 'PageLoaded';

class Analytics {
  constructor(user) {
    console.log("Init Analytics");
    this.tools = this.setupAnalytics();
  }

  setupAnalytics() {
    return [
      new FlurryAnalytic(),
    ]
  }

  setUser(user) {
    this._loop(x => {
      x.setUser(user);
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