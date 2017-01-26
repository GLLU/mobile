import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, TouchableHighlight} from 'react-native';
import styles from './styles';

const likeImage = require('../../../images/like.png');
const likeClickedImage = require('../../../images/likeClicked.png');
const shareImage = require('../../../images/share.png');
const bubbleImage = require('../../../images/bubble.png');
const infoImage = require('../../../images/infoIcon.png');

export default class BottomButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: false
    }
  }

  _onLikeClicked() {
    let likeToggle = !this.state.isLike;
    this.setState({isLike: likeToggle});
    likeToggle ? this.props.toggleLike(true) : this.props.toggleLike(false);
  }

  _onInformationClicked() {

  }

  _onBubbleClicked() {

  }

  _onShareClicked() {

  }

  render() {
    return (
      <View style={styles.bottomContainer}>
        <View style={styles.bottomLeft}>
          <View style={styles.horizontalContainer}>
            <TouchableHighlight style={{marginRight: 10}} onPress={() => this._onLikeClicked()}>
              <View style={[styles.footerButton, {paddingLeft: 0}]}>
                <Image source={this.state.isLike ? likeClickedImage : likeImage} style={{width: 40, height: 40,top: 2, resizeMode: 'stretch'}} />
                <Text style={styles.footerButtonText}>{this.props.likes}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={{marginRight: 10}} onPress={() => this._onInformationClicked()}>
            <View style={[styles.footerButton, {width: 40}]}>
              <Image source={infoImage} style={{height: 25, width: 25, resizeMode: 'contain', right: 2}} />
            </View>
          </TouchableHighlight>
            <TouchableHighlight style={{marginRight: 10}} onPress={() => this._onBubbleClicked()}>
            <View style={[styles.footerButton, {width: 40}]}>
              <Image source={bubbleImage} style={{height: 25, width: 25, resizeMode: 'contain', right: 2}} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{marginRight: 10}} onPress={() => this._onShareClicked()}>
            <View style={[styles.footerButton, {width: 40}]}>
              <Image source={shareImage} style={{height: 25, width: 25, resizeMode: 'contain', right: 2}} />
            </View>
          </TouchableHighlight>
          </View>
        </View>
        <View style={styles.bottomRight}>
          <TouchableOpacity style={[styles.footerButton, {backgroundColor: 'rgba(0,0,0,.3)'}]}>
            <Text style={[styles.footerButtonText]}>Hide</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
