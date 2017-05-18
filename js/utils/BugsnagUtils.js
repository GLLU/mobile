import { Image } from 'react-native';
import { Client, Configuration } from 'bugsnag-react-native';
import Config from 'react-native-config';
import {isEmpty,noop,each} from 'lodash';

/*global __DEV__ */
const DEV=__DEV__;

export default class BugsnagUtils {

  static getBugsnagClient() {
    if(DEV){
      return BugsnagUtils.MockBugsnag()
    }
    return BugsnagUtils.getRealBugsnagClient()
  }

  static getRealBugsnagClient(){
    const config = new Configuration(Config.BUGSNAG_API_KEY)
    config.codeBundleId = Config.codeBundleId
    return new Client(config)
  }

  static MockBugsnag= ()=>{
    const bugsnag = BugsnagUtils.getRealBugsnagClient();
    const propNames=Object.getOwnPropertyNames(bugsnag);
    let mock={};
    each(propNames,propName=>mock[propName]=noop);
    return mock;
  };

  static notifyRequestError(err, data, user) {
    const client = BugsnagUtils.getBugsnagClient();
    client.leaveBreadcrumb("REST request", {
      type: 'request',
      data: data,
    });
    if (!isEmpty(user) && user.id && user.username && user.email) {
      client.setUser(user.id.toString(), user.username, user.email);
    }
    client.notify(err);
  }

}