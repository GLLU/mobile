import React, { Component } from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native';
import * as _ from 'lodash'
import FooterButton from './FooterButton'

const infoIcon = require('../../../../images/icons/info-i-white.png');

export default class InformationButton extends Component {
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
      <FooterButton {...this.props} icon={infoIcon}/>
    );
  }
}

