import React, { Component } from 'react';
import Utils from '../../Utils';
import Config from 'react-native-config';
import _ from 'lodash';

class BaseComponent extends Component {
  constructor(props) {
    super(props);

    this.bugsnag = Utils.getBugsnagClient();
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
    if (!_.isEmpty(user) && user.id && user.username && user.email) {
      this.bugsnag.setUser(user.id.toString(), user.username, user.email);
    }
  }

  notifyError(error) {
    if (!__DEV__) {
      this.bugsnag.notify(error, (report) => {
        report.metadata = { "account": {
          "company": "GLLU Ltd.",
          "machine_name": Config.MACHINE_NAME
          }
        }
      });
    }
  }

  getBugsnagClient() {
    return this.bugsnag;
  }
}

export default BaseComponent;
