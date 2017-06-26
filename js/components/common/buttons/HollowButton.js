import React, { Component } from 'react';
import * as _ from 'lodash';
import SolidButton from "./SolidButton";

class HollowButton extends Component {

  static propTypes = {
    onPress: React.PropTypes.func
  }

  static defaultProps = {
    onPress: _.noop
  }

  render() {
    return (
      <SolidButton {...this.props} style={[{backgroundColor: 'transparent'},this.props.style]}/>
    );
  }
}

export default HollowButton;
