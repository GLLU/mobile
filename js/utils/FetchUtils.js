import Config from 'react-native-config';
import {last} from 'lodash';
import RNFetchBlob from 'react-native-fetch-blob';
import * as selfRef from './FetchUtils'

export default selfRef;

export const postMultipartForm = (api_key, path, formData, fileField, file, method = 'POST') => {
  return new Promise((resolve, reject) => {
    formData.push({
      name: fileField,
      filename: last(file.path.split('/')),
      type: 'image/*',
      data: RNFetchBlob.wrap(file.path)
    });

    return RNFetchBlob.fetch(method, `${Config.API_URL}${path}`, {
      Authorization: `Token token=${api_key}`,
      'Content-Type': 'multipart/form-data',
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