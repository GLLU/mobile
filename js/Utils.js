import { Image } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { Client, Configuration } from 'bugsnag-react-native';
import Config from 'react-native-config';
import _ from 'lodash';
import RNFetchBlob from 'react-native-fetch-blob';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

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
    const config = new Configuration(Config.BUGSNAG_API_KEY)
    config.codeBundleId = Config.codeBundleId
    return new Client(config)
  }

  static loginWithFacebook() {
    return new Promise((resolve, reject) => {
      let PERMISSIONS = ["email", "public_profile"];
      LoginManager.logInWithReadPermissions(PERMISSIONS).then(
        (result) => {
          if (result.isCancelled) {
            alert('Login cancelled');
          } else {
            const diffPermissions = _.difference(PERMISSIONS, result.grantedPermissions);
            if (diffPermissions.length === 0) {
              AccessToken.getCurrentAccessToken().then(
                (data) => {
                  const infoRequest = new GraphRequest('/me?fields=id,name,email,gender', null, (error, result) => {
                    if (error) {
                      alert(`Failed to retrieve user info: ${JSON.stringify(error)}`);
                    } else {
                      const jsonData = {
                        access_token: data["accessToken"],
                        expiration_time: data["expirationTime"],
                        data: result
                      };
                      console.log('dataaaa',data)
                      resolve(jsonData)
                    }
                  });
                  new GraphRequestManager().addRequest(infoRequest).start();
                }
              );
            } else {
              alert(`Missing permissions: ${diffPermissions.join(', ')}`);
              reject(`Missing permissions: ${diffPermissions.join(', ')}`)
            }
          }
        },
        (error) => {
          alert('Login fail with error: ' + error);
          reject('Login fail with error: ' + error)
        }
      );
    })
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

  static postMultipartForm(api_key, path, formData, fileField, file, method = 'POST') {
    return new Promise((resolve, reject) => {
      formData.push({
        name : fileField,
        filename : _.last(file.path.split('/')),
        type:'image/*',
        data: RNFetchBlob.wrap(file.path)
      });

      return RNFetchBlob.fetch(method, `${Config.API_URL}${path}`, {
        Authorization : `Token token=${api_key}`,
        'Content-Type' : 'multipart/form-data',
      }, formData).then((resp) => {
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

  static preloadLookImages(looks) {
    const coverUrls = looks.map(look => look.cover.type === "image" ? _.find(look.cover.list, x => x.version === 'medium').url : _.find(look.cover.list, x => x.version === 'large_720').url);
    return this.preloadImages(coverUrls);
  }

  static preloadImages(urls) {
    return Promise.all(
      urls.map(url => {
        if(url.search(".mp4") > -1) {
          return url
        } else {
          return Image.prefetch(url)
        }
      })
    );
  }
}