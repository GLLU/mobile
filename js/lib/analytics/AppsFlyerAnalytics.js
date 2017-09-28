// @flow
import appsFlyer from 'react-native-appsflyer';
import Config from 'react-native-config';

const options = {
  devKey: Config.APPSFLYER_DEV_KEY,
};


class AppsFlyerAnalytics {
  constructor() {
      appsFlyer.initSdk(options,
        (result) => {
          console.log(result);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}

export default AppsFlyerAnalytics;
