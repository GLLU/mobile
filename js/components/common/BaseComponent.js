import React, { Component } from 'react';
import Utils from '../../Utils';
import Config from 'react-native-config';
import _ from 'lodash';
import Analytics from '../../lib/analytics/Analytics';

const MockBugsnag= ()=>{
  const bugsnag = Utils.getBugsnagClient()
  const propNames=Object.getOwnPropertyNames(bugsnag);
  let mock={};
  _.each(propNames,propName=>mock[propName]=_.noop)
  return mock;
}

/*global __DEV__ */
const DEV=__DEV__;

class BaseComponent extends Component {
  constructor(props) {
    super(props);

    this.bugsnag = DEV? MockBugsnag() : Utils.getBugsnagClient()
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
    if (!DEV) {
      this.bugsnag.notify(error, (report) => {
        report.metadata = {
          "account": {
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

  logEvent(name, params = {}) {
    // set it async to not affect main thread
    setTimeout(() => {
      console.log('BaseComponent logEvent', name);
      Analytics.logEvent(name, params);
    }, 10);
  }
}

export default BaseComponent;
