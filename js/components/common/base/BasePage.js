import React, { Component } from 'react';
import BaseComponent from './BaseComponent';
import withNavigation from '../navigation/WithNavigation'

class BasePage extends BaseComponent {
  constructor(props) {
    super(props);
    this.navigateTo=this.navigateTo.bind(this);
    this.goBack=this.goBack.bind(this);
    this.resetTo=this.resetTo.bind(this);
    this.resetWithPayload=this.resetWithPayload.bind(this);
  }

  resetTo=this.props.resetTo;

  resetWithPayload=this.props.resetWithPayload;

  navigateTo=this.props.navigateTo;

  goBack=this.props.goBack;
}

export default withNavigation(BasePage);
