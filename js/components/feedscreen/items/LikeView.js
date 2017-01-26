'use strict';

import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Button, Text } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";

import styles from './styles';

const likeIcon = require('../../../../images/icons/like.png');
const likedIcon = require('../../../../images/icons/liked.png');
const bgShadow = require('../../../../images/background-shadow.png');

class LikeView extends Component {

  static propTypes = {
    index: React.PropTypes.number,
    item: React.PropTypes.object,
    onPress: React.PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  render() {
    const img = this.props.item;
    const likeIconView = img.liked ? likedIcon : likeIcon;
    return (<View style={[styles.likeContainer, { marginTop: img.height - 35 }]}>
                <Image source={bgShadow} style={styles.bgShadow} />
                <Grid>
                    <Col>
                      <Button transparent onPress={() => this.props.onPress(img)} style={styles.btnWithImage}>
                        <Image source={likeIconView} style={styles.iconWithImage} />
                      </Button>
                    </Col>
                    <Col>
                      <Text style={styles.countLikeLabel}>{img.likes}</Text>
                    </Col>
                </Grid>
              </View>)
  }
}

export default LikeView;
