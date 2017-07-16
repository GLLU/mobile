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

  constructor(props){
    super(props);
    this.onPress=this.onPress.bind(this);
  }

  onPress(){
    const {likes,onPress} = this.props;
    if(likes>0){
      onPress(...arguments)
    }
  }

  render() {
    const {likes} = this.props;
    return (
      <SocialView count={likes} icon={likeIcon} onPress={this.onPress}/>
    );
  }
}

export default LikesView
