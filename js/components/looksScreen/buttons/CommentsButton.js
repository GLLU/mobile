import React, { Component } from 'react';
import { View, Image, TouchableHighlight,} from 'react-native';
import * as _ from 'lodash'
import FooterButtonWithCounter from "./FooterButtonWithCounter";
const bubbleIcon = require('../../../../images/icons/speech-bubble.png');

export default class CommentsButton extends Component {

  static propTypes = {
    onPress: React.PropTypes.func,
    isActive: React.PropTypes.bool
  };

  static defaultProps = {
    onPress: _.noop,
    isActive: false
  };

  render() {
    return (
      <FooterButtonWithCounter
        {...this.props}
        icon={{active: bubbleIcon, inactive: bubbleIcon}}
      />
    );
  }
}

