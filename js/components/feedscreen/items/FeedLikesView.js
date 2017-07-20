// @flow

import React, { Component } from 'react';
import { StyleSheet, Image, Platform, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import { formatNumberAsString } from "../../../utils/FormatUtils";

const likeIcon = require('../../../../images/icons/like.png');
const likedIcon = require('../../../../images/icons/likedRed.png');

const styles = StyleSheet.create({
  likeContainer: {
    height: 30,
    backgroundColor: 'transparent',
  },
  btnWithImage: {
    backgroundColor: 'blue'
  },
  iconWithImage: {
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginTop: 3
  },
  countLikeLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
});

type Props = {
  item:object,
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
    const {item} = this.props;
    const shouldActive = !item.liked;
    this.props.onPress(shouldActive);
  }

  handleLikesNumberPress() {
    const {item} = this.props;
    if (item.likes > 0) {
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

    const {item} = this.props;

    const likeIconView = item.liked ? likedIcon : likeIcon;
    return (
      <View style={[styles.likeContainer]}>
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
          {this.renderLikesAmount(item.likes)}
        </View>
      </View>
    )
  }
}

export default FeedLikesView

