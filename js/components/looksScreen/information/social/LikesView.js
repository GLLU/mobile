'use strict';

import React, { PureComponent } from 'react';
import { StyleSheet, Image, Platform, View, Text, TouchableWithoutFeedback } from 'react-native';
import SocialView from "./SocialView";

const likeIcon = require('../../../../../images/icons/like-black-hollow.png');

class LikesView extends PureComponent {

  static propTypes = {
    likes: React.PropTypes.number,
    onPress: React.PropTypes.func,
  };

  render() {
    const {likes} = this.props;
    return (
      <SocialView count={likes} icon={likeIcon}/>
    );
  }
}

export default LikesView

