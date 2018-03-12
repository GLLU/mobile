// @flow

import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import * as _ from 'lodash';

const { fs } = RNFetchBlob;

const baseDownloadDir = `${Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir}/infash`;

export const downloadFile = (uri,name=_.now()) => new Promise((resolve, reject) => {
  const extension = uri.split('.').pop();
  RNFetchBlob
      .config({
        path: `${baseDownloadDir}/${name}.${extension}`,
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