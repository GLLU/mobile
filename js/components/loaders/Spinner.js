/* @flow */

import React, {Component} from 'react';
import { ActivityIndicator } from 'react-native';
import computeProps from 'native-base/src/Utils/computeProps';


export default class Spinner extends Component {

  prepareRootProps() {
    const type = {
      height: 80,
    };

    const defaultProps = {
      style: type,
    };

    return computeProps(this.props, defaultProps);
  }


  render() {
    const getColor = () => {
      if (this.props.color) {
        return this.props.color;
      } else if (this.props.inverse) {
        return 'red'
      }

      return 'blue';
    };

    return (
      <ActivityIndicator
        {...this.prepareRootProps()}
        color={getColor()}
        size={this.props.size ? this.props.size : 'large'}
      />
        );
  }

}
