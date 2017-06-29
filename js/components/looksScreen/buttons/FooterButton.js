import React, { PureComponent } from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native';
import * as _ from 'lodash'
import styles from '../styles'

export default class FooterButton extends PureComponent {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  static propTypes = {
    onPress: React.PropTypes.func,
    isActive: React.PropTypes.bool,
    icon: React.PropTypes.any,
    iconUrl: React.PropTypes.any,
  };

  static defaultProps = {
    onPress: _.noop,
    isActive: false
  };

  _getStyle=(isActive) =>isActive ? styles.footerButtonActive : styles.footerButton;

  _onPress() {
    const shouldActive = !this.props.isActive;
    this.props.onPress(shouldActive);
  }

  render() {
    return (
      <TouchableHighlight style={{margin:5, width: 45, maxWidth: 55, alignSelf: 'flex-end'}} onPress={this._onPress}>
        <View style={this._getStyle(this.props.isActive)}>
          <Image source={this.props.icon ? this.props.icon : { uri: this.props.iconUrl } } style={styles.footerButtonIcon}/>
        </View>
      </TouchableHighlight>
    );
  }
}

