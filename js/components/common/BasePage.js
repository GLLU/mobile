import React, { Component } from 'react';
import Config from 'react-native-config'
import BaseComponent from './BaseComponent';

class BasePage extends BaseComponent {
  constructor(props) {
    super(props);
  }

  setLeaveBreadcrumb(props) {
    this.bugsnag.leaveBreadcrumb("Page", {
      type: 'navigation',
      component: this.constructor.name,
      props: props,
    });
  }
}

export default BasePage;
