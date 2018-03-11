// @flow

import axios from 'axios';
import ApiUtils from './ApiUtils';
import Utils from '../utils';

const SYTE_URL = 'https://syteapi.com/offers/bb';
const ACCOUNT_ID = '6742';
const SIG = 'PFKQPt+GhsBISoHekefe82DvDpbg/J+ijc7Oi/3IRuA=';
const PAYLOAD_TYPE = 'image_bin';

class SyteApi {

  static getSuggestions(image: any) {
    console.log('before fetch');
    const url = `${SYTE_URL}?account_id=${ACCOUNT_ID}&sig=${encodeURIComponent(SIG)}&payload_type=${PAYLOAD_TYPE}`;

    return axios(url, {
      method: 'POST',
      data: image,
    })
            .then((response) => {
              console.log('this is the response', response.data);
              return response.data;
            })
            .catch((error) => {
              console.log(`error: ${error}`);
              throw new Error(error);
            });
  }
}

export default SyteApi;
