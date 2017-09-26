// @flow

import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import * as _ from 'lodash';

const { fs } = RNFetchBlob;

const baseDownloadDir = `${fs.dirs.CacheDir}/media`;

export const downloadFile = (uri) => new Promise((resolve, reject) => {
  const extension=uri.split('.').pop();
  RNFetchBlob
      .config({
        path: `${baseDownloadDir}/infash-image-${_.now()}.${extension}`,
        overwrite: true,
      }).fetch('GET', uri)
      .then(((res) => {
        if (Math.floor(res.respInfo.status / 100) !== 2) {
          throw new Error('Failed to download file');
        }
        const localPath = res.path();

        const formattedlocalPath = Platform.OS === 'ios' ? localPath : `file://${localPath}`;
        resolve(formattedlocalPath);
      }))
      .catch(reject);
});

export const downloadAsBase64 = (uri, mediaType = 'image') => new Promise((resolve, reject) => {
  const extension=uri.split('.').pop();
  RNFetchBlob
      .config({
        fileCache: true,
      })
      .fetch('GET', uri)
      // the image is now dowloaded to device's storage
      .then((res) => {
        // the image path you can use it directly with Image component
        imagePath = res.path();
        return res.readFile('base64');
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
