import React, {Component} from 'react';
import BasePage from '../common/BasePage';
import {View, Image, Animated, InteractionManager, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
import BottomButton from './bottomButton';
import TopButton from './topButton';
import BuyItButton from './buyItButton';
import VideoPlayer from './videoPlayer/videoPlayer';
import { likeUpdate, unLikeUpdate } from '../../actions/likes';
import { getLook } from '../../actions/looks';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import navigateTo from '../../actions/sideBarNav';

const { popRoute, pushRoute } = actions

class ItemScreen extends BasePage {
  static propTypes = {
    flatLook: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0.35),
      fadeAnimContent: new Animated.Value(0),
      likes: this.props.flatLook.likes,
      liked: this.props.flatLook.liked,
    }

  }

  componentDidMount() {
    let that = this
    InteractionManager.runAfterInteractions(() => {
      that.props.getLook(that.props.flatLook.id);
    });
  }

  _toggleLike(isLiked){
    if (isLiked) {
      let data = {id: this.props.flatLook.id, likes: this.state.likes+1, liked: true}
      this.props.likeUpdate(data);
    } else {
      let data = {id: this.props.flatLook.id, likes: this.state.likes-1, liked: false}
      this.props.unLikeUpdate(data);
    }
  }

  _tempPopRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  _goToProfile() {
    this.props.navigateTo('profileScreen', 'itemScreen', this.props.look.user);
  }

  onLoad() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 750
    }).start();
  }

  onThumbnailLoad() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 250
    }).start();
  }
  _renderItems() {
    return (
      <View>
        <Animated.Image
          resizeMode={'cover'}
          style={[{opacity: this.state.fadeAnim},styles.itemImage]}
          source={{uri: this.props.flatLook.uri}}
          onLoad={this.onLoad()}>

        { this.props.flatLook.id === this.props.look.id ? this._renderItemContent() : null }
        </Animated.Image>
        <Animated.Image
          resizeMode={'contain'}
          style={[styles.itemImage, {opacity: this.state.fadeAnim}]}
          source={{uri: this.props.flatLook.uri}}
          onLoad={this.onThumbnailLoad()}/>
      </View>
    )
  }

  _renderItemContent() {
    Animated.timing(          // Uses easing functions
      this.state.fadeAnimContent,    // The value to drive
      {
        toValue: 1,
        delay: 250      }            // Configuration
    ).start();
    const avatar = {};
    avatar.imageUri = this.props.look.user.avatar.url;
    avatar.bodyType = this.props.flatLook.type;
    return (
      <Animated.View style={{opacity: this.state.fadeAnimContent, justifyContent: 'space-between'}}>
        <TouchableOpacity transparent onPress={() => this._tempPopRoute()}>
          <Icon style={{color: 'green', marginTop: 10, marginLeft: 10, backgroundColor: 'transparent', position: 'absolute'}} name="ios-arrow-back" />
        </TouchableOpacity>
        <View style={[styles.lookInfo,{flexGrow: 1, flexDirection: 'column',marginTop: 40}]}>
          <TopButton avatar={avatar} onPress={() => this._goToProfile()}/>
          <BottomButton isLiked={this.state.liked} toggleLike={(isLiked) => this._toggleLike(isLiked)} likes={this.state.likes}/>
        </View>
        {this._renderBuyItButtons()}
      </Animated.View>
    )
  }
  _renderBuyItButtons() {
    return this.props.look.items.map((item, index) => {
      return  (
        <BuyItButton key={index} title={'zara'} price={item.price} positionTop={item["cover_y_pos"]} positionLeft={item["cover_x_pos"]}/>
      )
    });
  }
  render() {
    return  this._renderItems();
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    likeUpdate: (id) => dispatch(likeUpdate(id)),
    unLikeUpdate: (id) => dispatch(unLikeUpdate(id)),
    getLook: (lookId) => dispatch(getLook(lookId))
  };
}

const mapStateToProps = state => {
  const lookData = state.look.screenLookData.look ? state.look.screenLookData.look : [];
  return {
    isLoading: state.loader.loading,
    navigation: state.cardNavigation,
    look: lookData,
  };
};

export default connect(mapStateToProps, bindAction)(ItemScreen);
