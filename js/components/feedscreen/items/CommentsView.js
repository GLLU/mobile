'use strict';

import React, { Component } from 'react';
import { StyleSheet, Image, Platform, View, Text ,TouchableWithoutFeedback } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";

const bubbleIcon = require('../../../../images/icons/speech-bubble.png');

const styles = StyleSheet.create({
  likeContainer: {
    height: 30,
    width: 50,
    backgroundColor: 'transparent',
  },
  btnWithImage: {
    backgroundColor: 'blue'
  },
  iconBubbleWithImage: {
    height: 18,
    width: 18,
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

class CommentsView extends Component {

  static propTypes = {
    item: React.PropTypes.object,
    onPress: React.PropTypes.func,
    onLikesNumberPress: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      comments: props.item.comments
    }

  }

  getLikesStringFeedView() {
    let { comments }  = this.state
    comments = comments.toString()
    if(comments.length > 4 && comments.length < 7){
      comments = Math.floor(comments/1000) + 'K'
    } else if(comments.length === 7){
      comments = Math.floor(comments/1000000) + 'M'
    }
    return comments
  }

  render() {
    const comments = this.getLikesStringFeedView()
    return (
      <View style={[styles.likeContainer, comments.length > 3 ? {width: 60} : null]}>
        <TouchableWithoutFeedback transparent onPress={() => this.props.onPress()} style={styles.btnWithImage}>
          <Grid >
            <Col style={{flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
                <Image source={bubbleIcon} style={styles.iconBubbleWithImage}/>
            </Col>
            <Col style={{flexDirection: 'column', justifyContent: 'center', alignItems:'flex-start', marginLeft: 3}}>
                <View>
                  <Text style={styles.countLikeLabel}>{`${comments}`}</Text>
                </View>
            </Col>
          </Grid>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default CommentsView

