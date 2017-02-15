import * as Keychain from 'react-native-keychain';
import { Client } from 'bugsnag-react-native';
import Config from 'react-native-config';

export default class Utils {
  static format_measurement(value, measurements_scale) {
    return `${this.format_number(value)} ${measurements_scale}`;
  }

  static format_number(value) {
    return Math.round(value * 100)/ 100;  
  }

  static saveApiKeyToKeychain(email, api_key) {
    return Keychain.setGenericPassword(email, api_key);
  }

  static getKeychainData() {
    return Keychain.getGenericPassword();
  }

  static getBugsnagClient() {
    return new Client(Config.BUGSNAG_API_KEY)
  }

  static notifyRequestError(err, data, user) {
    const client = this.getBugsnagClient();
    client.leaveBreadcrumb("REST request", {
      type: 'request',
      data: data,
    });
    if (user && user.id) {
      client.setUser(user.id.toString(), user.username, user.email);
    }
    client.notify(err);
  }

}