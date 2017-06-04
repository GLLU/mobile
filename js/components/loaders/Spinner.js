/* @flow */

import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import computeProps from 'native-base/src/Utils/computeProps';


export default class Spinner extends Component {

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
        style={ {height: 80}}
        color={this.getColor()}
        size={this.props.size ? this.props.size : 'large'}
      />
    );
  }

}
