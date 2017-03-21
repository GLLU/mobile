import React, { Component } from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native';
import * as _ from 'lodash'
import FooterButton from './FooterButton'

const shareIcon = require('../../../../images/share.png');

export default class ShareButton extends Component {
  constructor(props) {
    super(props);
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
      <FooterButton {...this.props} icon={shareIcon}/>
    );
  }
}

