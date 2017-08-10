import React, {Component} from 'react';
import {Dimensions, Image} from 'react-native';
import {Provider} from 'react-redux';
import {whyDidYouUpdate} from 'why-did-you-update';
import App from './App';
import Spinner from './components/loaders/Spinner';
import configureStore from './configureStore';
import {disableConsole} from './utils/DevUtils';
const background = require('../images/backgrounds/splashScreen.png');
const deviceWidth = Dimensions.get('window').width;

// whyDidYouUpdate(React)

/* global __DEV__ */
const DEV = __DEV__;

if (!DEV) {
  disableConsole();
}

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

    onStoreConfigured() {
      this.setState({ isLoading: false });
    }

    render() {
      if (this.state.isLoading) {
        return (
          <Image
            source={background} resizeMode={'stretch'}
            style={{ flex: 1, width: deviceWidth, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner />
          </Image>
        );
      }
      return (
        <Provider store={this.state.store}>
          <App isStoreConfigured={!this.state.isLoading}/>
        </Provider>
      );
    }
  }

  return Root;
}

export default setup;
