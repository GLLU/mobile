'use strict';

import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Button, Text } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";

import styles from './styles';
import { connect } from 'react-redux';

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

  componentWillReceiveProps(nextProps) {
    if(this.props.itemScreenLook === this.props.item.id && !this.props.isLoading) {
      this.setState({ likes: this.props.itemScreenLikes, liked: this.props.itemScreenIsLiked });
    }
  }

  handleLikePress() {
    const likes = !this.state.liked ? this.state.likes+1 : this.state.likes-1;
    this.setState({ likes: likes, liked: !this.state.liked });
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

function bindActions(dispatch) {
  return {
  };
}

const mapStateToProps = state => {
  return {
    isLoading: state.loader.loading,
    itemScreenLikes: state.look.likes,
    itemScreenIsLiked: state.look.is_liked
  }
};

export default connect(mapStateToProps, bindActions)(LikeView);

