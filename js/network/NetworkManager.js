// @flow

import axios, { CancelToken } from 'axios';
import Config from 'react-native-config';

import ApiUtils from './ApiUtils';
import Utils from '../utils';


class NetworkManager {

  static _token;

  static fetch(route: string, method: string, body: any, isFormData: boolean): void {
    return axios(this._getUrl(route), {
      method,
      headers: this._getHeaders(isFormData),
      data: isFormData ? body : this._getBody(body),
      validateStatus: status => ApiUtils.checkStatus(status),
    })
            .then((response) => {
              // console.log(`Method: ${method}, Route: ${route}, Body: ${body}`);
              return response.data;
              
            })
            .catch((error) => {
              Utils.notifyRequestError(new Error(JSON.stringify(error)), error.response.data);
              throw ApiUtils.generalErrors(error);
            });
  }


  static setToken(token) {
    this._token = `Token ${token}`;
  }

  static _getToken() {
    return this._token;
  }

  static removeToken() {
    this._token = null;
  }

  static _getUrl(route: string) {
    return `${Config.API_URL}${route}`;
  }

  static _getHeaders(isFormData: boolean) {
    const contentType = isFormData ? 'multipart/form-data; boundary=----WebKitFormBoundarybCWfCArA88j4YJQ8' : 'application/json';

    return {
      Accept: 'application/json',
      'Content-Type': contentType,
      Authorization: this._getToken(),
    };
  }

  static _getBody(body, isFormData) {
    return JSON.stringify(body);
  }
}

export default NetworkManager;
