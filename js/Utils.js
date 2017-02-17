import * as Keychain from 'react-native-keychain';
import { Client } from 'bugsnag-react-native';
import Config from 'react-native-config';
import _ from 'lodash';

var FileUpload = require('NativeModules').FileUpload;

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

  static postMultipartForm(api_key, path, fields, fileField, file) {
    console.log('postMultipartForm', api_key, path, fields, fileField, file);
    return new Promise((resolve, reject) => {
      let headers = {
        'Accept': 'application/json',
      }
      if (api_key && api_key != '') {
        headers = Object.assign(headers, {
          "Authorization": `Token token=${api_key}`,
        });
      }

      var obj = {
        uploadUrl: `${Config.API_URL}/${path}`,
        method: 'POST', // default 'POST',support 'POST' and 'PUT'
        headers: headers,
        fields: fields,
        files: [
          {
            name: fileField,
            filename: _.last(file.path.split('/')), // require, file name
            filepath: file.path, // require, file absoluete path
          },
        ]
      };

      FileUpload.upload(obj, function(err, result) {
        console.log('FileUpload', err, result);
        if (result && (result.status == 201 || result.status == 200)) {
          const data = JSON.parse(result.data);
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  }
}