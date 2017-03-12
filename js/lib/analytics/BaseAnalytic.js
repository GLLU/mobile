import md5 from 'md5';

class BaseAnalytic {

  setUser(user) {
    throw new Error("Unhandled method", user);
  }

  trackScreen(name, params = {}) {
    throw new Error("Unhandled method", name, params);
  }

  endTrackScreen(name, params = {}) {
    throw new Error("Unhandled method", name, params);
  }

  logEvent(name, params = {}) {
    throw new Error("Unhandled method", name, params);
  }

  encryptUserId(id) {
    return md5(`${id}`);
  }
}

export default BaseAnalytic;