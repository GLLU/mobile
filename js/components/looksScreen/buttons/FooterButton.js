import React, { Component } from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native';
import * as _ from 'lodash'
import styles from '../styles'

export default class FooterButton extends Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this.state = {
      isActive: this.props.isActive
    }
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive !== undefined) {
      this.setState({isActive: nextProps.isActive})
    }
  }

  _onPress() {
    const shouldActive = !this.state.isActive;
    this.props.onPress(shouldActive);
    this.setState({isActive: shouldActive})
  }

  render() {
    return (
      <TouchableHighlight style={{marginRight: 10}} onPress={this._onPress}>
        <View style={[this._getStyle(this.state.isActive), {width:40}]}>
          <Image source={this.props.icon} style={{height: 25, width: 25, resizeMode: 'contain', right: 2}}/>
        </View>
      </TouchableHighlight>
    );
  }
}

