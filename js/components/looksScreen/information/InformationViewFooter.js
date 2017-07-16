'use strict';

import React, { PureComponent } from 'react';
import { ScrollView, Image, StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native';
import LikesView from "./social/LikesView";
import CommentsView from "./social/CommentsView";
import Colors from "../../../styles/Colors.styles";

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background
  }
});

class InformationViewFooter extends PureComponent {

  static propTypes = {
    likes: React.PropTypes.number,
    comments: React.PropTypes.number,
    onCommentsPress: React.PropTypes.func,
    onLikesPress: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.onCommentsPress = this.onCommentsPress.bind(this);
  }

  onCommentsPress() {
    this.props.onCommentsPress(true);
  }

  render() {
    const {likes, comments, onLikesPress} = this.props;
    return (
      <View style={styles.container}>
        <LikesView likes={likes} onPress={onLikesPress}/>
        <CommentsView comments={comments} onPress={this.onCommentsPress}/>
      </View>
    );
  }
}

export default InformationViewFooter;

