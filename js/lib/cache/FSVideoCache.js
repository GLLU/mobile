import RNFetchBlob from 'react-native-fetch-blob'
import * as selfRef from './FSVideoCache'
const {fs} = RNFetchBlob;

export default selfRef;

const baseCacheDir = fs.dirs.CacheDir + '/videocache';

const queue={};

const downloadFile = (uri) => {
  return new Promise((resolve, reject) => {
    RNFetchBlob
      .config({
        fileCache: true,
        appendExt: 'mp4'
      }).fetch('GET', uri)
      .then((res =>{
        const localPath=res.path();
        resolve(localPath)
      }))
      .catch(reject);
  });
}

export const get = (uri) => new Promise((resolve, reject) => {
  resolve(queue[uri]);
});

export const add = (uri) => new Promise((resolve, reject) => {
  downloadFile(uri).then(entry=>{
    queue[uri]=entry;
    resolve(entry)
  }).catch(reject)
});