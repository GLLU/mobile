import React, {Component} from 'react';
import {View, Image, Animated, InteractionManager, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'native-base';
import Swiper from 'react-native-swiper';
import styles from './styles';
import BottomButton from './bottomButton';
import TopButton from './topButton';
import BuyItButton from './buyItButton';
import IndicatorButton from './indicatorButton';
import VideoPlayer from './videoPlayer/videoPlayer';
import { like, unlike } from '../../actions/likes';
import { getLook } from '../../actions/looks';

const dataSample = [
  {
    type: 'image',
    source: require('../../../images/img1.jpg'),
    avatar: require('../../../images/avatar1.jpg'),
    brand: 'ZARA',
    price: 40.50,
    top: 28,
    left: 16
  },
  {
    type: 'image',
    source: require('../../../images/img2.jpg'),
    avatar: require('../../../images/avatar2.jpg'),
    brand: 'ZARA 2',
    price: 50.50,
    top: 55,
    left: 16
  },
  {
    type: 'image',
    source: require('../../../images/img3.jpg'),
    avatar: require('../../../images/avatar1.jpg'),
    brand: 'ZARA 3',
    price: 60.50,
    top: 30,
    left: 16
  },
  {
    type: 'video',
    source: 'https://www.quirksmode.org/html5/videos/big_buck_bunny.mp4',
  }
];

const renderPagination = (index) => { // total, context
  return (
    <IndicatorButton activeIndex={index} sources={dataSample}/>
  )
}

class ItemScreen extends Component {
  static propTypes = {
    flatLook: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0.35),
      fadeAnimContent: new Animated.Value(0),
    }
  }

  componentDidMount() {
    let that = this
    InteractionManager.runAfterInteractions(() => {
      that.props.getLook(that.props.flatLook.id);
    });
    //this.props.getLook(this.props.flatLook.id);
  }

  _toggleLike(isLiked){
    isLiked ? this.props.like(this.props.flatLook.id) : this.props.unlike(this.props.flatLook.id);
  }

  _tempPopRoute() {
    this.props.popRoute(this.props.navigation.key);
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
        <View style={styles.itemContainer}>
          <Animated.Image
            style={[{opacity: this.state.fadeAnim},styles.itemImage]}
            source={{uri: this.props.flatLook.uri}}
            onLoad={this.onLoad()}>
          <TouchableOpacity transparent onPress={() => this._tempPopRoute()}>
            <Icon style={{color: 'green', marginTop: 10, marginLeft: 10, backgroundColor: 'transparent'}} name="ios-arrow-back" />
          </TouchableOpacity>
          { this.props.flatLook.id !== this.props.look.id ? null : this._renderItemContent() }
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
        delay: 500
      }            // Configuration
    ).start();
    const avatar = {}
    avatar.imageUri = this.props.flatLook.uri
    avatar.bodyType = this.props.look["user_size"]["body_type"];;
    let lookLikes = this.props.look.likes
    console.log('likes: ',lookLikes, 'avatar:',avatar);
    return (
      <Animated.View style={{opacity: this.state.fadeAnimContent, flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
        <TopButton avatar={avatar} />
        <BottomButton toggleLike={(isLiked) => this._toggleLike(isLiked)} likes={lookLikes}/>
        {/*<BuyItButton title={'zara'} price={50} positionTop={35} positionLeft={20} />*/}
      </Animated.View>
    )
  }

  render() {
    return this.props.flatLook.id !== this.props.look.id ? this._renderItems() : this._renderItems();
    //return <View></View>
  }

}

import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

const { popRoute, pushRoute } = actions

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    like: (id) => dispatch(like(id)),
    unlike: (id) => dispatch(unlike(id)),
    getLook: (lookId) => dispatch(getLook(lookId))
  };
}

const mapStateToProps = state => {
  const lookData = state.look.screenLookData.look ? state.look.screenLookData.look : [];
  return {
    isLoading: state.loader.loading,
    navigation: state.cardNavigation,
    look: lookData
  };

};

export default connect(mapStateToProps, bindAction)(ItemScreen);
