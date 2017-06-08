'use strict';

import React, { Component } from 'react';
import { StyleSheet, Image, Platform, View, Text ,TouchableWithoutFeedback } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";

const likeIcon = require('../../../../images/icons/like.png');
const likedIcon = require('../../../../images/icons/likedGreen.png');

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
    this.state = {
      isLiked: props.item.liked,
      likes: props.item.likes
    }

  }

  handleLikePress() {
    const { likes, isLiked } = this.state
    this.setState({isLiked: !isLiked, likes: isLiked ? likes-1 : likes+1})
    const shouldActive = !this.state.isLiked;
    let that = this;
    setTimeout(() => {that.props.onPress(shouldActive);}, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.routeName !== 'feedscreen' && nextProps.item.likes !== this.state.likes) {
      this.setState({isLiked: nextProps.item.liked, likes: nextProps.item.likes})
    }
  }

  handleLikesNumberPress() {
    if(this.state.likes > 0) {
      this.props.onLikesNumberPress();
    }
  }

  render() {
    const {lookHeight} = this.props;
    const likeIconView = this.state.isLiked ? likedIcon : likeIcon;
    return (
      <View style={[styles.likeContainer, { marginTop: lookHeight - 30 }]}>
        <Grid style={{ backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <Col style={{flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
            <TouchableWithoutFeedback transparent onPress={() => this.handleLikePress()} style={styles.btnWithImage}>
              <Image source={likeIconView} style={styles.iconWithImage}/>
            </TouchableWithoutFeedback>
          </Col>
          <Col style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
            <TouchableWithoutFeedback onPress={() => this.handleLikesNumberPress()}>
              <View>
                <Text style={styles.countLikeLabel}>{`${this.state.likes}`}</Text>
              </View>
            </TouchableWithoutFeedback>
          </Col>
        </Grid>
      </View>
    )
  }
}

export default LikeView

