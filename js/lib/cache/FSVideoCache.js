import { AsyncStorage } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'
import * as selfRef from './FSVideoCache'
import * as _ from "lodash";
const {fs} = RNFetchBlob

const baseCacherDir = `${fs.dirs.CacheDir}/videos`;

// time to cache in miliseconds(1000*360*24*7 = a week)
const cacheDuration = 1000*360*24*7;

export default selfRef;

const downloadFile = (uri) => {
  return new Promise((resolve, reject) => {
    RNFetchBlob
      .config({
        path: `${baseCacherDir}/gllu-video-${_.now()}.mp4`,
        overwrite: true
      }).fetch('GET', uri)
      .then((res => {
        if (Math.floor(res.respInfo.status / 100) !== 2) {
          throw new Error('Failed to successfully download video');
        }
        const localPath = res.path();
        resolve(localPath)
      }))
      .catch(reject);
  });
};

const deleteFile = filePath => {
  return fs.stat(filePath)
    .then(res => res && res.type === 'file')
    .then(exists => exists && fs.unlink(filePath)) //if file exist
    .catch((err) => {
      // swallow error to always resolve
    });
};

export const get = (uri) => new Promise((resolve, reject) => {
  AsyncStorage.getItem(uri)
    .then(rawItem=>{
      const metadata=JSON.parse(rawItem);
      if(metadata){
        resolve(metadata.path)
      }
      else{
        resolve('')
      }
    })
    .catch(reject);
});

export const add = (uri) => new Promise((resolve, reject) => {
  downloadFile(uri).then(path => {
    const metadata= {path, expiry:_.now()+cacheDuration};
    AsyncStorage.setItem(uri, JSON.stringify(metadata))
      .then(() => {
        resolve(path);
      })
      .catch(reject);
  }).catch(reject)
});