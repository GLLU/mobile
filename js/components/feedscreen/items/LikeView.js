'use strict';

import React, { Component } from 'react';
import { StyleSheet, Image, Platform, View, Text ,TouchableWithoutFeedback } from 'react-native';
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

class LikeView extends Component {

  static propTypes = {
    item: React.PropTypes.object,
    onPress: React.PropTypes.func,
    onLikesNumberPress: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.handleLikePress=this.handleLikePress.bind(this);
    this.handleLikesNumberPress=this.handleLikesNumberPress.bind(this);
  }

  handleLikePress() {
    const { item } = this.props;
    const shouldActive = !item.liked;
    this.props.onPress(shouldActive);
  }

  handleLikesNumberPress() {
    const {item} = this.props;
    if(item.likes > 0) {
      this.props.onLikesNumberPress();
    }
  }

  render() {

    const {item} = this.props;

    const likeIconView = item.liked ? likedIcon : likeIcon;
    const likes = formatNumberAsString(item.likes);
    return (
      <View style={[styles.likeContainer]}>
        <View style={{flex: 1, flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'space-between', marginRight: 5}}>
          <View style={{flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
            <TouchableWithoutFeedback transparent onPress={this.handleLikePress} style={styles.btnWithImage}>
              <Image source={likeIconView} style={styles.iconWithImage}/>
            </TouchableWithoutFeedback>
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'flex-start'}}>
            <TouchableWithoutFeedback onPress={this.handleLikesNumberPress} style={{width: 20, backgroundColor: 'red'}}>
              <View>
                <Text style={styles.countLikeLabel}>{`${likes}`}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    )
  }
}

export default LikeView

