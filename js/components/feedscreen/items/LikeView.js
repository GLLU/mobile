'use strict';

import React, { Component } from 'react';
import { StyleSheet, Image, Platform, View, Text ,TouchableWithoutFeedback } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";

const likeIcon = require('../../../../images/icons/like.png');
const likedIcon = require('../../../../images/icons/likedRed.png');

const styles = StyleSheet.create({
  likeContainer: {
    height: 30,
    width: 50,
    backgroundColor: 'transparent',
  },
  btnWithImage: {
    backgroundColor: 'blue'
  },
  iconWithImage: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 3
  },
  countLikeLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center'
  },
});

class LikeView extends Component {

  static propTypes = {
    item: React.PropTypes.object,
    onPress: React.PropTypes.func,
    onLikesNumberPress: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    console.log('propsLikeView',props)
    this.state = {
      isLiked: props.item.liked,
      likes: props.item.likes
    }

  }

  handleLikePress() {
    const { likes, isLiked } = this.state
    this.setState({isLiked: !isLiked, likes: isLiked ? likes-1 : likes+1})
    const shouldActive = !this.state.isLiked;
    this.props.onPress(shouldActive);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.item.likes !== this.state.likes) {
      this.setState({isLiked: nextProps.item.liked, likes: nextProps.item.likes})
    }
  }

  handleLikesNumberPress() {
    if(this.state.likes > 0) {
      this.props.onLikesNumberPress();
    }
  }

  getLikesStringFeedView() {
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
    const {lookHeight} = this.props;
    const likeIconView = this.state.isLiked ? likedIcon : likeIcon;
    const likes = this.getLikesStringFeedView()
    return (
      <View style={[styles.likeContainer, { marginTop: lookHeight - 30 }, likes.length > 3 ? {width: 60} : null]}>
        <Grid style={{ backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <Col style={{flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
            <TouchableWithoutFeedback transparent onPress={() => this.handleLikePress()} style={styles.btnWithImage}>
              <Image source={likeIconView} style={styles.iconWithImage}/>
            </TouchableWithoutFeedback>
          </Col>
          <Col style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center', marginRight: 3}}>
            <TouchableWithoutFeedback onPress={() => this.handleLikesNumberPress()}>
              <View>
                <Text style={styles.countLikeLabel}>{`${likes}`}</Text>
              </View>
            </TouchableWithoutFeedback>
          </Col>
        </Grid>
      </View>
    )
  }
}

export default LikeView

