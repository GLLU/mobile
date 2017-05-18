
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import App from './App';
import SpinnerSwitch from './components/loaders/SpinnerSwitch'
import configureStore from './configureStore';

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
