import React, {Component} from 'react';
import {View, Image, Animated, InteractionManager, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
import BottomButton from './bottomButton';
import TopButton from './topButton';
import BuyItButton from './buyItButton';
import IndicatorButton from './indicatorButton';
import VideoPlayer from './videoPlayer/videoPlayer';
import { like, unlike, getLikes } from '../../actions/likes';
import { getLook } from '../../actions/looks';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

const { popRoute, pushRoute } = actions

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

  componentWillMount() {
    this.props.getLikes(this.props.flatLook.id)
  }

  componentDidMount() {
    let that = this
    InteractionManager.runAfterInteractions(() => {
      that.props.getLook(that.props.flatLook.id);
    });
  }

  _toggleLike(isLiked){
    if (isLiked) {
      this.props.like(this.props.flatLook.id);
    } else {
      this.props.unlike(this.props.flatLook.id);
    }
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
            resizeMode={'cover'}
            style={[{opacity: this.state.fadeAnim},styles.itemImage]}
            source={{uri: this.props.flatLook.uri}}
            onLoad={this.onLoad()}>
          <TouchableOpacity transparent onPress={() => this._tempPopRoute()}>
            <Icon style={{color: 'green', marginTop: 10, marginLeft: 10, backgroundColor: 'transparent'}} name="ios-arrow-back" />
          </TouchableOpacity>
          { this.props.flatLook.id !== this.props.look.id && !this.props.isLoading ? null : this._renderItemContent() }
          </Animated.Image>
          {/*<Animated.Image*/}
            {/*resizeMode={'contain'}*/}
            {/*style={[styles.itemImage, {opacity: this.state.fadeAnim}]}*/}
            {/*source={{uri: this.props.flatLook.uri}}*/}
            {/*onLoad={this.onThumbnailLoad()}/>*/}
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
    const avatar = {};
    avatar.imageUri = this.props.flatLook.uri;
    avatar.bodyType = this.props.flatLook.type;
    return (
      <Animated.View style={{opacity: this.state.fadeAnimContent, flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
        <TopButton avatar={avatar} />
        <BottomButton isLiked={this.props.isLiked} toggleLike={(isLiked) => this._toggleLike(isLiked)} likes={this.props.likes}/>
        {/*<BuyItButton title={'zara'} price={50} positionTop={35} positionLeft={20} style={styles.BuyItButton}/>*/}
      </Animated.View>
    )
  }

  render() {
    return  this._renderItems();
  }

}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    like: (id) => dispatch(like(id)),
    unlike: (id) => dispatch(unlike(id)),
    getLikes: (id) => dispatch(getLikes(id)),
    getLook: (lookId) => dispatch(getLook(lookId))
  };
}

const mapStateToProps = state => {
  const lookData = state.look.screenLookData.look ? state.look.screenLookData.look : [];
  return {
    isLoading: state.loader.loading,
    navigation: state.cardNavigation,
    look: lookData,
    likes: state.look.likes,
    isLiked: state.look.is_liked
  };

};

export default connect(mapStateToProps, bindAction)(ItemScreen);
