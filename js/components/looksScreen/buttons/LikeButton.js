import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';
import * as _ from 'lodash'
import styles from '../styles'
import FooterButton from "./FooterButton";

const likeImage = require('../../../../images/icons/like.png');
const likeClickedImage = require('../../../../images/icons/likedRed.png');

export default class LikeButton extends Component {
  constructor(props) {
    super(props);
    this._onNumberPress = this._onNumberPress.bind(this);
    this._onIconPress = this._onIconPress.bind(this);
    this.state = {
      isLiked: props.isLiked,
      likes: props.likes
    }
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
    const { likes, isLiked } = this.state
    this.setState({isLiked: !isLiked, likes: isLiked ? likes-1 : likes+1}, () => {
      const { isLiked, likes } = this.state;
      this.props.onIconPress(isLiked, likes);
    })
  }

  _onNumberPress() {
    if(this.props.likes > 0) {
      this.props.onNumberPress();
    }

  }

  getLikesString() {
    let { likes }  = this.state;
    likes = likes.toString();
    if(likes.length > 4 && likes.length < 7){
      likes = Math.floor(likes/1000) + 'K'
    } else if(likes.length === 7){
      likes = Math.floor(likes/1000000) + 'M'
    }
    return likes
  }

  getIconByActive = (isActive) => isActive ? likeClickedImage : likeImage;

  render() {
    const likes = this.getLikesString();
    return (
      <View>
        <FooterButton {...this.props} onPress={this._onIconPress} isActive={false} icon={this.getIconByActive(this.state.isLiked)}/>
        <TouchableWithoutFeedback onPress={this._onNumberPress}>
          <View>
            <Text style={styles.footerButtonText}>{`${likes}`}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

