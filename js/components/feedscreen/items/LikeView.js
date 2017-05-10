'use strict';

import React, { Component } from 'react';
import { StyleSheet, Image, Platform, View, Text } from 'react-native';
import {  Button } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";

const likeIcon = require('../../../../images/icons/like.png');
const likedIcon = require('../../../../images/icons/liked.png');
const bgShadow = require('../../../../images/background-shadow.png');

const styles = StyleSheet.create({
  likeContainer: {
    height: 30,
    width: 70,
    paddingBottom: 6,
    backgroundColor: 'transparent',
  },
  bgShadow: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 60,
    height: 30
  },
  iconWithImage: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  countLikeLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: (Platform.OS == 'ios' ? 10 : 0)
  },
});

class LikeView extends Component {

  static propTypes = {
    item: React.PropTypes.object,
    onPress: React.PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  handleLikePress() {
    this.props.onPress(this.props.item, !this.props.item.liked)
  }

  render() {
    const img = this.props.item;
    const likeIconView = this.props.item.liked ? likedIcon : likeIcon;
    return (
      <View style={[styles.likeContainer, { marginTop: img.height - 35 }]}>
        <Image source={bgShadow} style={styles.bgShadow}/>
        <Grid>
          <Col style={{flexDirection: 'column', alignItems: 'center'}}>
            <Button transparent onPress={() => this.handleLikePress()} style={styles.btnWithImage}>
              <Image source={likeIconView} style={styles.iconWithImage}/>
            </Button>
          </Col>
          <Col style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={styles.countLikeLabel}>{this.props.item.likes}</Text>
          </Col>
          <Col style={{width:10}}/>
        </Grid>
      </View>
    )
  }
}

export default LikeView

