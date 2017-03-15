import React, { Component } from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native';
import * as _ from 'lodash'
import FooterButton from './FooterButton'

const bubbleIcon = require('../../../../images/bubble.png');

export default class CommentsButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.isActive
    }
  }

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
      <FooterButton {...this.props} icon={bubbleIcon}/>
    );
  }
}

