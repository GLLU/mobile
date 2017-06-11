
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import App from './App';
import SpinnerSwitch from './components/loaders/SpinnerSwitch'
import configureStore from './configureStore';
import { disableConsole } from "./utils/DevUtils";

/*global __DEV__ */
const DEV=__DEV__;

if(!DEV){
  disableConsole()
}

function setup():React.Component {
  class Root extends Component {

    constructor(props) {
      super(props);
      this.onStoreConfigured=this.onStoreConfigured.bind(this);
      this.state = {
        store:configureStore(this.onStoreConfigured),
        isLoading: true
      };
    }

    onStoreConfigured(){
      this.setState({ isLoading: false });
    }

    render() {
      if (this.state.isLoading) {
        return <SpinnerSwitch/>;
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
