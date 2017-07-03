'use strict';

import React, { Component } from 'react';
import { StyleSheet, Image, Platform, View, Text ,TouchableWithoutFeedback } from 'react-native';

const bubbleIcon = require('../../../../images/icons/speech-bubble.png');

const styles = StyleSheet.create({
  likeContainer: {
    height: 30,
    marginLeft: 3,
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

  renderCommentsAmount(comments) {
    return (
      <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'flex-start', marginLeft: 3}}>
          <View>
            <Text style={styles.countLikeLabel}>{`${comments}`}</Text>
          </View>
      </View>
    )
  }

  render() {
    const comments = this.getLikesStringFeedView()
    return (
      <View style={[styles.likeContainer]}>
        <TouchableWithoutFeedback transparent onPress={() => this.props.onPress()} style={styles.btnWithImage}>
          <View style={{flex: 1, flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'space-between', marginRight: 5}}>
            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
                <Image source={bubbleIcon} style={styles.iconBubbleWithImage}/>
            </View>
            {this.state.comments > 0 ? this.renderCommentsAmount(comments) : <View/>}
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default CommentsView

