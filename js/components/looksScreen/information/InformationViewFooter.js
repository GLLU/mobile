// @flow

import React, { PureComponent } from 'react';
import { ScrollView, Image, StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native';
import withAnalytics from '../../common/analytics/WithAnalytics';
import Colors from "../../../styles/Colors.styles";
import SocialView from "./SocialView";

const commentsIcon = require('../../../../images/icons/comment-black-hollow.png');
const likeIcon = require('../../../../images/icons/like-black-hollow.png');

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background
  }
});

type Props = {
  likes: number,
  comments: number,
  onCommentsPress: void,
  onLikesPress: void
}

class InformationViewFooter extends PureComponent {

  props:Props;

  constructor(props:Props) {
    super(props);
    this._onCommentsPress = this._onCommentsPress.bind(this);
    this._onLikesPress = this._onLikesPress.bind(this);
  }

  _onCommentsPress() {
    const {onCommentsPress,logEvent} = this.props;
    logEvent('LookScreen', {name: 'Information Comments click'});
    onCommentsPress(true);
  }

  _onLikesPress(){
    const {likes,onLikesPress,logEvent} = this.props;
    logEvent('LookScreen', {name: 'Information Likes click'});
    if(likes>0){
      onLikesPress()
    }
  }

  render() {
    const {likes, comments} = this.props;
    return (
      <View style={styles.container}>
        <SocialView count={likes} icon={likeIcon} onPress={this._onLikesPress}/>
        <SocialView count={comments} icon={commentsIcon} onPress={this._onCommentsPress}/>
      </View>
    );
  }
}

export default withAnalytics(InformationViewFooter);

