// @flow
import Mixpanel from 'react-native-mixpanel';
import Config from 'react-native-config';

class MixPanelAnalytics {
  constructor() {
    Mixpanel.sharedInstanceWithToken(Config.MIXPANEL_API_KEY);
    // this.logEvent('Screen', { name: 'martin logged in', firstParameter: 'eswqewqe' })
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
    if (user) {
      if (user.id && user.id !== -1) {
        Mixpanel.identify(user.id.toString());
        Mixpanel.registerSuperProperties({ 'email' : user.email, 'user name': user.username });
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
