import { RNConfig } from 'NativeModules';
import EnvConfig from '../config.json';

let environment = RNConfig.buildEnvironment;

let getApiUrl = function() {
  return EnvConfig[environment].API_URL;
}

export default {
  getApiUrl: getApiUrl()
}