/* @flow */

import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';


export default class Spinner extends Component {

  static defaultProps={
    style:{
      height:80
    }
  }

  getColor = () => {
    if (this.props.color) {
      return this.props.color;
    }
    return '#45D56E';
  };

  render() {
    return (
      <ActivityIndicator
        {...this.props}
        style={ this.props.style}
        color={this.getColor()}
        size={this.props.size ? this.props.size : 'large'}
      />
    );
  }

}
