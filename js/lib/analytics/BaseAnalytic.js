class BaseAnalytic {

  setUser(user) {
    throw new Error("Unhandled method", user);
  }


  logEvent() {
    throw new Error("Unhandled method");
  }
}

export default BaseAnalytic;