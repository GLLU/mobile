// @flow
import Mixpanel from 'react-native-mixpanel';

class MixPanelAnalytics {
  constructor() {
    Mixpanel.sharedInstanceWithToken('b1124c27f83903679e358ddab0dd87f1');
    this.logEvent('Screen', { name: 'martin logged in', firstParameter: 'eswqewqe' })
    // Mixpanel.trackWithProperties('martin logged in', { firstParameter: '48543537' });
    // Mixpanel.registerSuperProperties();
  }

  logEvent(screenName: string, properties: any) {
    const eventName = properties.name ? properties.name : screenName;

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
