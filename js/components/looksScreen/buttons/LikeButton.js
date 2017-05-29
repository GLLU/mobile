import React, { Component } from 'react';
import { View, Image, TouchableHighlight, StyleSheet, Text } from 'react-native';
import * as _ from 'lodash'
import styles from '../styles'

const likeImage = require('../../../../images/icons/like.png');
const likeClickedImage = require('../../../../images/icons/liked.png');

export default class LikeButton extends Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  static propTypes = {
    onPress: React.PropTypes.func,
  };

  static defaultProps = {
    onPress: _.noop,
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
        <View style={[styles.footerButton, {flexDirection: 'column'}]}>
          <Image source={this.props.isLiked ? likeClickedImage : likeImage}
                 style={[styles.footerButtonIcon,{width: 35, height: 35}]}/>
          <Text style={styles.footerButtonText}>{this.props.likes}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

