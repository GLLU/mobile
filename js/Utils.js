import { Image } from 'react-native';
import * as Keychain from 'react-native-keychain';
import Config from 'react-native-config';
import * as _ from 'lodash';
import RNFetchBlob from 'react-native-fetch-blob';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import BugsnagUtils from "./utils/BugsnagUtils";

/*global __DEV__ */
const DEV=__DEV__;

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

  static getBugsnagClient() { return BugsnagUtils.getBugsnagClient() }


  static notifyRequestError(err, data, user) { return BugsnagUtils.notifyRequestError(err, data, user) }

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

  static getLoaderImage() {
    const loadersArr = ['#e1f7d5', '#ffbdbd', '#c9c9ff', '#f1cbff', '#f6dbdb', '#f2e3c6', '#d3ece1', '#c2eec7', '#eed2e8', '#4e4e56', '#da635d', '#dcd0c0', '#b1938b', '#06b8d2', '#98f2e1' ]
    const loaderColor = loadersArr[Math.floor(Math.random()*loadersArr.length)];
    return loaderColor;
  }

  static resetKeychainData() {
    return Keychain.resetGenericPassword();
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

  static isVideo(path) {
    const fileTypesArr = ['.jpg','.png']
    let type;
    for(let i = 0; i<fileTypesArr.length; i++){
       type = path.search(fileTypesArr[i]) > -1;
      if(type) {
        return false
      }
    }
    return true
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