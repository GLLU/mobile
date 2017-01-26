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
      thumbnailOpacity: new Animated.Value(0.35),
      fadeAnim: new Animated.Value(0),
    }
    //this.props.getLook(this.props.flatLook.id);
  }

  componentDidMount() {
    let that = this
    InteractionManager.runAfterInteractions(() => {
      that.props.getLook(that.props.flatLook.id);
    });
    this.props.getLook(this.props.flatLook.id);
  }

  _toggleLike(isLiked){
    isLiked ? this.props.like(this.props.flatLook.id) : this.props.unlike(this.props.flatLook.id);
  }

  _tempPopRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  onLoad() {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 1,
      duration: 750
    }).start();
  }

  onThumbnailLoad() {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 1,
      duration: 250
    }).start();
  }
  _renderItems() {
    return (
      <View>

      <Swiper style={styles.container} horizontal={false} loop={false}
              renderPagination={renderPagination}
      >
        {
          dataSample.map((item, i) => {
            return item.type === 'image' ? (
                <View style={styles.itemContainer} key={i}>

                  <Animated.Image
                    style={[{opacity: this.state.thumbnailOpacity},styles.itemImage]}
                    source={{uri: this.props.flatLook.uriMedium}}
                    onLoad={this.onLoad()}
                  >
                  <TouchableOpacity transparent onPress={() => this._tempPopRoute()}>
                    <Icon style={{color: 'green', marginTop: 10, marginLeft: 10}} name="ios-arrow-back" />
                  </TouchableOpacity>
                    { Object.keys(this.props.look.screenLookData).length === 0 ? null : this._renderItemLoader(item) }
                  </Animated.Image>
                  <Animated.Image
                    resizeMode={'contain'}
                    style={[styles.itemImage, {opacity: this.state.thumbnailOpacity}]}
                    source={{uri: this.props.flatLook.uri}}
                    onLoad={this.onThumbnailLoad()}
                  />
                  {/*<Image source={{uri: 'https://s3.amazonaws.com/gllu-assets/uploads/look_image/image/5/large_3dd9fd71-4c39-4d6a-9608-ca856c1c9959.jpg'}} style={styles.itemImage}>*/}
                    {/*<Button transparent onPress={() => this._tempPopRoute()}>*/}
                      {/*<Icon style={{color: 'green', marginTop: 10}} name="ios-arrow-back" />*/}
                    {/*</Button>*/}
                    {/*<TopButton avatar={item.avatar} />*/}
                    {/*<BottomButton toggleLike={(isLiked) => this._toggleLike(isLiked)}/>*/}
                    {/*<BuyItButton title={item.brand} price={item.price} positionTop={item.top} positionLeft={item.left} />*/}
                  {/*</Image>*/}
                </View>
              ) :
              <VideoPlayer source={{uri: item.source}} key={i}/>
            // (<View style={styles.itemContainer} key={i}>
            //   {/**/}
            //   <Text>Video put here</Text>
            // </View>)
          })
        }
      </Swiper>
      </View>
    )
  }

  _renderItemLoader(item) {
    console.log('item',item);
    Animated.timing(          // Uses easing functions
      this.state.fadeAnim,    // The value to drive
      {
        toValue: 1,
        delay: 500
      }            // Configuration
    ).start();
    const avatar = {}
    avatar.imageUri = this.props.look.screenLookData.data.attributes.cover.image.small.url
    let lookBodyType = _.find(this.props.look.screenLookData.included, {type: 'sizes'});
    avatar.bodyType = lookBodyType.attributes['body-type'];
    let lookInfoLikes = this.props.look.screenLookData.data.attributes.likes
    return (
      <Animated.View style={{opacity: this.state.fadeAnim, flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
        <TopButton avatar={avatar} />
        <BottomButton toggleLike={(isLiked) => this._toggleLike(isLiked)} likes={lookInfoLikes}/>
        {/*<BuyItButton title={'zara'} price={50} positionTop={35} positionLeft={20} />*/}
      </Animated.View>
    )
  }
  render() {

    return this.props.isLoading === 0 ? this._renderItems() : this._renderItems();
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

const mapStateToProps = state => ({
  isLoading: state.api.isReading,
  navigation: state.cardNavigation,
  look: state.screenLook
});

export default connect(mapStateToProps, bindAction)(ItemScreen);
