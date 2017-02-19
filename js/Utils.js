import * as Keychain from 'react-native-keychain';
import { Client } from 'bugsnag-react-native';
import Config from 'react-native-config';
import _ from 'lodash';
import RNFetchBlob from 'react-native-fetch-blob';

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

  static resetKeychainData() {
    return Keychain.resetGenericPassword();
  }

  static notifyRequestError(err, data, user) {
    const client = this.getBugsnagClient();
    client.leaveBreadcrumb("REST request", {
      type: 'request',
      data: data,
    });
    if (!_.isEmpty(user) && user.id && user.username && user.email) {
      client.setUser(user.id.toString(), user.username, user.email);
    }
    client.notify(err);
  }

  static postMultipartForm(api_key, path, formData, fileField, file) {
    return new Promise((resolve, reject) => {
      formData.push({
        name : fileField,
        filename : _.last(file.path.split('/')),
        type:'image/*',
        data: RNFetchBlob.wrap(file.path)
      });

      return RNFetchBlob.fetch('POST', `${Config.API_URL}${path}`, {
        Authorization : `Token token=${api_key}`,
        'Content-Type' : 'multipart/form-data',
      }, formData).then((resp) => {
        console.log('resp', resp);
        const json = JSON.parse(resp.data);
        const status = resp.respInfo.status;
        if (status === 200 || status === 201) {
          resolve(json); 
        } else if (status === 422) { //validation error
          reject(json);
        } else { //generic error
          reject(json.error);
        }
      }).catch((err) => {
        console.log('File upload error:', err);
        reject(err);
      });
    });
  }
}