// @flow

import axios from 'axios';
import ApiUtils from './ApiUtils';
import Utils from '../utils';
import Config from 'react-native-config';

class SyteApi {

  /* As of July 18 feed=default refer to shopstyle & awin */
  static getSuggestions(image: any) {
    const url = `${Config.SYTE_URL}/bb?account_id=${Config.SYTE_ACCOUNT_ID}&sig=${encodeURIComponent(Config.SYTE_SIG)}&payload_type=${Config.SYTE_PAYLOAD_TYPE}&feed=infash`;

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
    const offerLinkUrl = `${offerLink}&force_currency=${Config.DEFAULT_CUREENCY}`;
    return axios(offerLinkUrl, {
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
