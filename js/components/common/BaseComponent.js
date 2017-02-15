import React, { Component } from 'react';
import { Client } from 'bugsnag-react-native';
import Config from 'react-native-config';

class BaseComponent extends Component {
  constructor(props) {
    super(props);

    this.bugsnag = new Client(Config.BUGSNAG_API_KEY);
    this.setBugsnagUser(props.user);
    this.setLeaveBreadcrumb(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setBugsnagUser(nextProps.user);
    this.setLeaveBreadcrumb(nextProps);
  }

  setLeaveBreadcrumb(props) {
    this.bugsnag.leaveBreadcrumb("Component", {
      component: this.constructor.name,
      props: props,
    })
  }

  setBugsnagUser(user) {
    if (user) {
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

  getBugsnagClient() {
    return this.bugsnag;
  }
}

export default BaseComponent;
