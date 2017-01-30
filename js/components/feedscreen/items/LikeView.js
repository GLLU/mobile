'use strict';

import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Button, Text } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";

import styles from './styles';

const likeIcon = require('../../../../images/icons/like.png');
const likedIcon = require('../../../../images/icons/liked.png');
const bgShadow = require('../../../../images/background-shadow.png');

class LikeView extends Component {

  static propTypes = {
    item: React.PropTypes.object,
    onPress: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.item.likes,
      liked: this.props.item.liked
    }
  }

  handleLikePress() {
    const likes = !this.state.liked ? this.state.likes+1 : this.state.likes-1;
    this.setState({likes: likes, liked: !this.state.liked,
    });
    console.log('like?',this.state.likes)
    this.props.onPress(this.props.item , !this.state.liked)
  }

  render() {
    const img = this.props.item;
    const likeIconView = this.state.liked ? likedIcon : likeIcon;
    return (
      <View style={[styles.likeContainer, { marginTop: img.height - 35 }]}>
        <Image source={bgShadow} style={styles.bgShadow} />
        <Grid>
            <Col>
              <Button transparent onPress={() => this.handleLikePress()} style={styles.btnWithImage}>
                <Image source={likeIconView} style={styles.iconWithImage} />
              </Button>
            </Col>
            <Col>
              <Text style={styles.countLikeLabel}>{this.state.likes}</Text>
            </Col>
        </Grid>
      </View>
    )
  }
}

export default LikeView;
