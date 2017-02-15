import React, { Component } from 'react';
import { Client } from 'bugsnag-react-native';
import Config from 'react-native-config'

class BaseComponent extends Component {
  constructor(props) {
    super(props);

    this.bugsnag = new Client(Config.BUGSNAG_API_KEY);
    this.setBugsnagUser(props.user);
  }

  componentWillReceiveProps(nextProps) {
    this.setBugsnagUser(nextProps.user);
  }

  setBugsnagUser(user) {
    if (user) {
      console.log('user', user);
      this.bugsnag.setUser(user.id.toString(), user.username, user.email);
    }
  }

  notifyError(error) {
    this.bugsnag.notify(error, (report) => {
      report.metadata = { "account": {
        "company": "GLLU Ltd.",
        "machine_name": Config.MACHINE_NAME
        }
      }
    });
  }
}

export default BaseComponent;
