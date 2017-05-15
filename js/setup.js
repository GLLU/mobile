
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { checkLogin } from './actions';

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
      this.state.store.dispatch(checkLogin());
      this.setState({ isLoading: false });
    }

    render() {
      if (this.state.isLoading) {
        return <SpinnerSwitch/>;
      }
      return (
        <Provider store={this.state.store}>
          <App/>
        </Provider>
      );
    }
  }

  return Root;
}

export default setup;
