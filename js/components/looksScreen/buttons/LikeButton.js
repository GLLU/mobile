import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';
import * as _ from 'lodash'
import styles from '../styles'

const likeImage = require('../../../../images/icons/like.png');
const likeClickedImage = require('../../../../images/icons/likedGreen.png');

export default class LikeButton extends Component {
  constructor(props) {
    super(props);
    this._onNumberPress = this._onNumberPress.bind(this);
    this._onIconPress = this._onIconPress.bind(this);
  }

  static propTypes = {
    onIconPress: React.PropTypes.func,
    onNumberPress: React.PropTypes.func,
  };

  static defaultProps = {
    onIconPress: _.noop,
    onNumberPress: _.noop,
  };

  _onIconPress() {
    const shouldActive = !this.props.isActive;
    this.props.onIconPress(shouldActive);
  }

  _onNumberPress() {
    if(this.props.likes > 0) {
      this.props.onNumberPress();
    }

  }

  render() {
    return (
    <View style={[styles.footerButton,{padding: 0, width: 35, alignSelf: 'center'}]}>
        <View style={[ {flexDirection: 'column', padding: 0}]}>
          <TouchableOpacity  onPress={this._onIconPress}>
            <Image source={this.props.isLiked ? likeClickedImage : likeImage}
                   style={[styles.footerButtonIcon,{width: 35, height: 35}]}/>
          </TouchableOpacity>
          <View></View>
          <TouchableWithoutFeedback  onPress={this._onNumberPress}>
            <View>
              <Text style={styles.footerButtonText}>{this.props.likes}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
    </View>

    );
  }
}

