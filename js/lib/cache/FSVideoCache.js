import { AsyncStorage } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'
import * as selfRef from './FSVideoCache'

export default selfRef;

const downloadFile = (uri) => {
  return new Promise((resolve, reject) => {
    RNFetchBlob
      .config({
        fileCache: true,
        appendExt: 'mp4'
      }).fetch('GET', uri)
      .then((res => {
        const localPath = res.path();
        resolve(localPath)
      }))
      .catch(reject);
  });
}

export const get = (uri) => AsyncStorage.getItem(uri);

export const add = (uri) => new Promise((resolve, reject) => {
  downloadFile(uri).then(entry => {
    AsyncStorage.setItem(uri, entry)
      .then(resolve)
      .catch(reject);
  }).catch(reject)
});