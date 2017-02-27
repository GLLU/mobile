import React, {Component} from 'react';
import {View, Text, Animated, TouchableOpacity, Image, TouchableHighlight} from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
import BottomButton from './bottomButton';
import TopButton from './topButton';
import MenuModal from './menuModal';
import BuyItButton from './buyItButton';

export default class BottomLookContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.look.likes,
      isLiked: this.props.look.isLiked,
      fadeAnimContent: new Animated.Value(0),
    }
  }

  _renderBuyItButtons(look) {
    return look.items.map((item, index) => {
      return  (
        <BuyItButton key={index} title={'zara'} price={item.price} positionTop={item["cover_y_pos"]} positionLeft={item["cover_x_pos"]}/>
      )
    });
  }

  render() {
    Animated.timing(          // Uses easing functions
      this.state.fadeAnimContent,    // The value to drive
      {
        toValue: 1,
        delay: 250      }            // Configuration
    ).start();
    const avatar = {};
    avatar.imageUri = this.props.look.userAvatar;
    avatar.bodyType = this.props.look.type;
    return (
      <Animated.View style={{opacity: this.state.fadeAnimContent, justifyContent: 'space-between'}}>
        <TouchableOpacity transparent onPress={() => this.props.tempPopRoute()}>
          <Icon style={{color: 'green', marginTop: 10, marginLeft: 10, backgroundColor: 'transparent', position: 'absolute'}} name="ios-arrow-back" />
        </TouchableOpacity>
        <View style={[styles.lookInfo,{flexGrow: 1, flexDirection: 'column',marginTop: 40}]}>
          <TopButton avatar={avatar} onPress={() => this.props.goToProfile(this.props.look)}/>
          <BottomButton isLiked={this.state.liked} likes={this.state.likes} toggleLike={(isLiked) => this.props.toggleLike(isLiked)} toggleMenu={() => this.props._toggleMenu()}/>
        </View>
        {this._renderBuyItButtons(this.props.look)}
        <MenuModal isMenuOpen={this.state.isMenuOpen} reportAbuse={(lookId) => this._reportAbuse(lookId)} closeModal={() => this._toggleMenu()}/>
      </Animated.View>
    )
  }
}
