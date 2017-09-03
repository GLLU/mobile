// @flow

import React, { Component } from 'react';
import { StyleSheet, Image, Platform, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import { formatNumberAsString } from "../../../utils/FormatUtils";

const likeIcon = require('../../../../images/icons/likeBlack.png');
const likedIcon = require('../../../../images/icons/redLike.png');

const styles = StyleSheet.create({
  likeContainer: {
    height: 30,
    backgroundColor: 'transparent',
  },
  btnWithImage: {
    backgroundColor: 'blue'
  },
  iconWithImage: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 3
  },
  countLikeLabel: {
    color: 'black',
    fontSize: 12,
    fontWeight: '500',
  },
});

type Props = {
  likes:number,
  isLiked:boolean,
  onPress: void,
  onLikesNumberPress: void
}

class FeedLikesView extends Component {

  props: Props;

  constructor(props:Props) {
    super(props);
    this.handleLikePress = this.handleLikePress.bind(this);
    this.handleLikesNumberPress = this.handleLikesNumberPress.bind(this);
  }

  handleLikePress() {
    const {isLiked} = this.props;
    const shouldActive = !isLiked;
    this.props.onPress(shouldActive);
  }

  handleLikesNumberPress() {
    const {likes} = this.props;
    if (likes > 0) {
      this.props.onLikesNumberPress();
    }
  }

  renderLikesAmount(likes: number) {
    const likesAmount = formatNumberAsString(likes);
    return (
      <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginLeft: 3}}>
        <TouchableWithoutFeedback onPress={this.handleLikesNumberPress} style={{width: 20, backgroundColor: 'red'}}>
          <View>
            <Text style={styles.countLikeLabel}>{`${likesAmount}`}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  render() {

    const {likes,isLiked} = this.props;

    const likeIconView = isLiked ? likedIcon : likeIcon;
    return (
      <View style={styles.likeContainer}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignSelf: 'flex-start',
          justifyContent: 'space-between',
          marginRight: 5
        }}>
          <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableWithoutFeedback transparent onPress={this.handleLikePress} style={styles.btnWithImage}>
              <Image source={likeIconView} style={styles.iconWithImage}/>
            </TouchableWithoutFeedback>
          </View>
          {likes > 0 ? this.renderLikesAmount(likes) : <View/>}
        </View>
      </View>
    )
  }
}

export default FeedLikesView

