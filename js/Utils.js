import { Image } from 'react-native';
import * as Keychain from 'react-native-keychain';
import Config from 'react-native-config';
import * as _ from 'lodash';
import RNFetchBlob from 'react-native-fetch-blob';
import BugsnagUtils from "./utils/BugsnagUtils";
import FacebookUtils from "./utils/FacebookUtils";
import FormatUtils from "./utils/FormatUtils";

/*global __DEV__ */
const DEV=__DEV__;

export default class Utils {
  static format_measurement(value, measurements_scale) {
    return FormatUtils.format_measurement(value,measurements_scale);
  }

  static format_number(value) {
    return FormatUtils.format_number(value);
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
    return FacebookUtils.loginWithFacebook();
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