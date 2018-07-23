import React, { Component } from 'react';
import { Dimensions, Image } from 'react-native';
import { Provider } from 'react-redux';
import OneSignal from 'react-native-onesignal';

import App from './App';
import configureStore from './configureStore';
import { disableConsole } from './utils/DevUtils';

const deviceWidth = Dimensions.get('window').width;
const background = require('../images/backgrounds/splashScreen.png');

/* global __DEV__ */
const DEV = __DEV__;

if (!DEV) {
  disableConsole();
} else {
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
}

let notificationObject;

function setup(): React.Component {
  class Root extends Component {

    constructor(props) {
      super(props);
      this.onStoreConfigured = this.onStoreConfigured.bind(this);
      this.state = {
        store: configureStore(this.onStoreConfigured),
        isLoading: true,
      };

      require('./strings/index');
    }

    componentWillMount() {
      OneSignal.addEventListener('opened', this._onOpened);
    }

    componentWillUnmount() {
      OneSignal.removeEventListener('opened', this._onOpened);
    }

    _onOpened(openResult) {
      notificationObject = openResult.notification.payload.additionalData;
    }

    onStoreConfigured() {
      setTimeout(() => this.setState({ isLoading: false }), 300);
    }

    render() {
      if (this.state.isLoading) {
        return (
          <Image
            source={background} resizeMode={'stretch'}
            style={{ flex: 1, width: deviceWidth, justifyContent: 'center', alignItems: 'center' }} />
        );
      }
      return (
        <Provider store={this.state.store}>
          <App notification={notificationObject} isStoreConfigured={!this.state.isLoading} />
        </Provider>
      );
    }
  }

  return Root;
}

export default setup;
