import { Image } from 'react-native';
import * as Keychain from 'react-native-keychain';

export default class KeychainUtils {

  static saveApiKeyToKeychain(email, api_key) {
    return Keychain.setGenericPassword(email, api_key);
  }

  static getKeychainData() {
    return Keychain.getGenericPassword();
  }


  static resetKeychainData() {
    return Keychain.resetGenericPassword();
  }
}