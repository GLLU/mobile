import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';
import * as _ from 'lodash'
import FooterButtonWithCounter from "./FooterButtonWithCounter";

const likeImage = require('../../../../images/icons/like.png');
const likeClickedImage = require('../../../../images/icons/likedRed.png');

export default class LikeButton extends Component {
  constructor(props) {
    super(props);
    this._onNumberPress = this._onNumberPress.bind(this);
    this._onIconPress = this._onIconPress.bind(this);
    this.state = {
      liked: props.liked,
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
    const {likes, liked} = this.state;
    this.setState({liked: !liked, likes: liked ? likes - 1 : likes + 1}, () => {
      const {liked, likes} = this.state;
      this.props.onIconPress(liked, likes);
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.likes !== this.state.likes) {
      this.setState({liked: nextProps.liked, likes: nextProps.likes})
    }
  }

  _onNumberPress() {
    if (this.props.likes > 0) {
      this.props.onNumberPress();
    }
  }

  render() {
    return (
      <FooterButtonWithCounter
        {...this.props}
        count={this.state.likes}
        icon={{active: likeClickedImage, inactive: likeImage}}
        isActive={this.state.liked}
        onIconPress={this._onIconPress}
        onNumberPress={this._onNumberPress}/>
    );
  }
}

