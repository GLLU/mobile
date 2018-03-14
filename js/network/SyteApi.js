// @flow

import axios from 'axios';
import ApiUtils from './ApiUtils';
import Utils from '../utils';
import Config from 'react-native-config';

class SyteApi {

  static getSuggestions(image: any) {
    const url = `${Config.SYTE_URL}/bb?account_id=${Config.SYTE_ACCOUNT_ID}&sig=${encodeURIComponent(Config.SYTE_SIG)}&payload_type=${Config.SYTE_PAYLOAD_TYPE}&feed=default`;

    return axios(url, {
      method: 'POST',
      data: image,
    })
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              throw new Error(error);
            });
  }

  static getOffers(offerLink: string) {
    return axios(offerLink, {
      method: 'GET',
    })
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              throw new Error(error);
            });
  }
}

export default SyteApi;
