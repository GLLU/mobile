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

export const downloadAsBase64 = (uri, mediaType = 'image', extension = 'jpg') => {
  return new Promise((resolve, reject) => {
    let imagePath = null;
    RNFetchBlob
      .config({
        fileCache: true
      })
      .fetch('GET', uri)
      // the image is now dowloaded to device's storage
      .then((res) => {
        // the image path you can use it directly with Image component
        imagePath = res.path();
        return res.readFile('base64')
      })
      .then((base64Data) => {
        const formattedBase64 = `data:${mediaType}/${extension};base64,${base64Data}`;
        // here's base64 encoded image
        resolve(formattedBase64);
        // remove the file from storage
        fs.unlink(imagePath);
      })
      .catch(reject);
  });
};