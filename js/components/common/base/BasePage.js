import React, { Component } from 'react';
import BaseComponent from './BaseComponent';
import withNavigation from '../navigation/WithNavigation'

class BasePage extends BaseComponent {

  static propTypes={
    resetTo:React.PropTypes.func,
    resetWithPayload:React.PropTypes.func,
    navigateTo:React.PropTypes.func,
    goBack:React.PropTypes.func
  };

  resetTo=this.props.resetTo;

  resetWithPayload=this.props.resetWithPayload;

  navigateTo=this.props.navigateTo;

  goBack=this.props.goBack;
}

export default withNavigation(BasePage);
