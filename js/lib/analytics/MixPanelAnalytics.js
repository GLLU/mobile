// @flow
import Mixpanel from 'react-native-mixpanel';

class MixPanelAnalytics {
  constructor() {
    Mixpanel.sharedInstanceWithToken('b1124c27f83903679e358ddab0dd87f1');
    Mixpanel.trackWithProperties('martin logged in', { firstParameter: '48543537' });
  // Mixpanel.registerSuperProperties();
  }
  logEvent(eventName: string, properties: any) {
    if (properties) {
      Mixpanel.trackWithProperties(eventName, properties);
    } else {
      Mixpanel.track(eventName);
    }
  }

  setUser(user: any) {
    if (!user) {
      if (user.id && user.id !== -1) {
        Mixpanel.identify(user.id);
      }
    }
  }

  alias(userId: number) {
    Mixpanel.createAlias(userId);
  }

  reset() {
    Mixpanel.reset();
  }
}

export default MixPanelAnalytics;
