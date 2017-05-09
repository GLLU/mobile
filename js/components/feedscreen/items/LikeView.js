'use strict';

import React, { Component } from 'react';
import { StyleSheet, Image, Platform, TouchableWithoutFeedback } from 'react-native';
import { View, Button, Text } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";

import { connect } from 'react-redux';

const likeIcon = require('../../../../images/icons/like.png');
const likedIcon = require('../../../../images/icons/liked.png');
const bgShadow = require('../../../../images/background-shadow.png');

const styles = StyleSheet.create({
  likeContainer: {
    height: 30,
    width: 70,
    paddingBottom: 6,
    backgroundColor: 'transparent',
  },
  bgShadow: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 60,
    height: 30
  },
  btnWithImage: {
    backgroundColor: 'blue'
  },
  iconWithImage: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 5
  },
  countLikeLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: (Platform.OS == 'ios' ? 10 : 0)
  },
});

class LikeView extends Component {

  static propTypes = {
    item: React.PropTypes.object,
    onPress: React.PropTypes.func
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
    this.setState({isLiked: !isLiked, likes: isLiked ? likes+1 : likes-1})
    this.props.onPress(this.props.item, !this.props.item.liked)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.item.likes !== this.state.likes) {
      this.setState({isLiked: nextProps.item.liked, likes: nextProps.item.likes})
    }
  }

  render() {
    const img = this.props.item;
    const likeIconView = this.state.isLiked ? likedIcon : likeIcon;
    return (
      <View style={[styles.likeContainer, { marginTop: img.height - 35 }]}>
        <Image source={bgShadow} style={styles.bgShadow}/>
        <Grid>
          <Col style={{flexDirection: 'column', alignItems: 'center'}}>
            <TouchableWithoutFeedback transparent onPress={() => this.handleLikePress()} style={styles.btnWithImage}>
              <Image source={likeIconView} style={styles.iconWithImage}/>
            </TouchableWithoutFeedback>
          </Col>
          <Col style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={styles.countLikeLabel}>{this.state.likes}</Text>
          </Col>
          <Col style={{width:10}}/>
        </Grid>
      </View>
    )
  }
}

export default LikeView

