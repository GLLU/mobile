'use strict';

import React, { PureComponent } from 'react';
import { ScrollView, Image, StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native';
import LikesView from "./social/LikesView";
import CommentsView from "./social/CommentsView";
import Colors from "../../../styles/Colors.styles";

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between'
  },
  textStyle:{
    flex:-1,
    flexDirection:'row',
    padding:15,
    textAlign:'center',
    borderColor:'black',
    borderWidth:2,
    backgroundColor:'white'
  }
});

class InformationViewFooter extends PureComponent {

  static propTypes = {
    likes: React.PropTypes.number,
    comments: React.PropTypes.number,
  };

  render() {
    const {likes,comments}=this.props;
    return (
      <View style={{flex:-1,flexDirection:'row', alignItems:'center', backgroundColor:Colors.background}}>
        <LikesView likes={likes}/>
        <CommentsView comments={comments}/>
      </View>
    );
  }
}

export default InformationViewFooter;

