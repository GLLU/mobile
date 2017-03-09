import md5 from 'md5';

class BaseAnalytic {

  setUser(user) {
    throw new Error("Unhandled method", user);
  }

  trackScreen(name, params = {}) {
    throw new Error("Unhandled method");
  }

  endTrackScreen(name, params = {}) {
    throw new Error("Unhandled method");
  }

  logEvent() {
    throw new Error("Unhandled method");
  }

  encryptUserId(id) {
    return md5(`${id}`);
  }
}

export default BaseAnalytic;