
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

    constructor() {
      super();
      this.state = {
        isLoading: true,
        store: configureStore(() => {
          this.state.store.dispatch(checkLogin());
          this.setState({ isLoading: false });
        }),
      };
    }

    render() {
      const { isLoading } = this.state;
      
      if (isLoading) {
        return <SpinnerSwitch/>;
      }
      
      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }
  }

  return Root;
}

export default setup;
