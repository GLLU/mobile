'use strict';

import React, { PureComponent } from 'react';
import { StyleSheet, Image, Platform, View, Text, TouchableWithoutFeedback } from 'react-native';
import SocialView from './SocialView'

const commentsIcon = require('../../../../../images/icons/comment-black-hollow.png');

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

class CommentsView extends PureComponent {

  static propTypes = {
    comments: React.PropTypes.number,
    onPress: React.PropTypes.func,
  };

  render() {
    const {comments, onPress} = this.props;
    return (
      <SocialView count={comments} icon={commentsIcon} onPress={onPress}/>
    );
  }
}

export default CommentsView

