import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';
import * as _ from 'lodash'
import styles from '../styles'

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

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.isLiked !== this.state.isLiked) {
  //     this.setState({isLiked: nextProps.isLiked, likes: nextProps.likes})
  //   }
  // }

  getLikesString() {
    let { likes }  = this.state
    likes = likes.toString()
    if(likes.length > 4 && likes.length < 7){
      likes = Math.floor(likes/1000) + 'K'
    } else if(likes.length === 7){
      likes = Math.floor(likes/1000000) + 'M'
    }
    return likes
  }

  render() {
    const likes = this.getLikesString()
    return (
    <View style={[{padding: 0, maxWidth: 60, alignSelf: 'flex-end', margin:5, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 10,minHeight: 35,
      width: 45}]}>
        <View style={[ {flexDirection: 'column', padding: 0, alignSelf: 'center', justifyContent: 'center'}]}>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={this._onIconPress}>
            <Image source={this.state.isLiked ? likeClickedImage : likeImage}
                   style={[styles.footerButtonIcon,{width: 30, height: 30}]} resizeMode={'stretch'}/>
          </TouchableOpacity>
          <View style={{height:1}}/>
          <TouchableWithoutFeedback  onPress={this._onNumberPress}>
            <View style={{width: 30}}>
              <Text style={styles.footerButtonText}>{`${likes}`}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
    </View>

    );
  }
}

