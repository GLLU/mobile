import React, { Component } from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native';
import * as _ from 'lodash'
import styles from '../styles'

export default class FooterButton extends Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  static propTypes = {
    onPress: React.PropTypes.func,
    isActive: React.PropTypes.bool,
    icon: React.PropTypes.any.isRequired,
  };

  static defaultProps = {
    onPress: _.noop,
    isActive: false
  };

  _getStyle(isActive) {
    return isActive ? styles.footerButtonActive : styles.footerButton;
  }

  _onPress() {
    const shouldActive = !this.props.isActive;
    this.props.onPress(shouldActive);
  }

  render() {
    return (
      <TouchableHighlight style={{margin:5}} onPress={this._onPress}>
        <View style={this._getStyle(this.props.isActive)}>
          <Image source={this.props.icon} style={styles.footerButtonIcon}/>
        </View>
      </TouchableHighlight>
    );
  }
}

