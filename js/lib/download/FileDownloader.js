import RNFetchBlob from 'react-native-fetch-blob'
import * as _ from "lodash";

const {fs} = RNFetchBlob;

const baseDownloadDir = `${fs.dirs.CacheDir}/media`;

export const downloadFile = (uri, extension = '.jpg') => {
  return new Promise((resolve, reject) => {
    RNFetchBlob
      .config({
        path: `${baseDownloadDir}/infash-image-${_.now()}${extension}`,
        overwrite: true
      }).fetch('GET', uri)
      .then((res => {
        if (Math.floor(res.respInfo.status / 100) !== 2) {
          throw new Error('Failed to download file');
        }
        const localPath = res.path();
        resolve(localPath)
      }))
      .catch(reject);
  });
};