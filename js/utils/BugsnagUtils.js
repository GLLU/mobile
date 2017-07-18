import { Client, Configuration } from 'bugsnag-react-native';
import Config from 'react-native-config';
import {isEmpty,noop,each} from 'lodash';
import * as selfRef from './BugsnagUtils'
export default selfRef

/*global __DEV__ */
const DEV=__DEV__;

const getRealBugsnagClient=()=>{
  const config = new Configuration(Config.BUGSNAG_API_KEY)
  config.codeBundleId = Config.BUGSNAG_BUNDLE_ID
  return new Client(config)
};

const MockBugsnag= ()=>{
  const bugsnag = getRealBugsnagClient();
  const propNames=Object.getOwnPropertyNames(bugsnag);
  let mock={};
  each(propNames,propName=>mock[propName]=noop);
  return mock;
};

export const getBugsnagClient=() => {
  if(DEV){
    return MockBugsnag()
  }
  return getRealBugsnagClient()
};

export const notifyRequestError=(err, data, user)=> {
  const client = getBugsnagClient();
  client.leaveBreadcrumb("REST request", {
    type: 'request',
    data: data,
  });
  if (!isEmpty(user) && user.id && user.username && user.email) {
    client.setUser(user.id.toString(), user.username, user.email);
  }
  client.notify(err);
};