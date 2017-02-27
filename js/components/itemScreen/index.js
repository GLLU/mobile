import React, {Component} from 'react';
import BasePage from '../common/BasePage';
import {View, Image, Animated, InteractionManager, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import { Icon } from 'native-base';
import styles from './styles';

import BuyItButton from './buyItButton';
import BottomLookContainer from './BottomLookContainer';
import VideoPlayer from './videoPlayer/videoPlayer';
import { likeUpdate, unLikeUpdate } from '../../actions/likes';
import { loadMore } from '../../actions';
import { getLook, reportAbuse } from '../../actions/looks';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import navigateTo from '../../actions/sideBarNav';

const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT')
const { popRoute, pushRoute } = actions
const LOADER_HEIGHT = 30;

class ItemScreen extends BasePage {
  static propTypes = {
    flatLook: React.PropTypes.number,
  }
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0.35),
      fadeAnimContent: new Animated.Value(0),
      likes: this.props.flatLook.likes,
      liked: this.props.flatLook.liked,
      isMenuOpen: false,
      flatArr: this.props.flatLooksData,
    }

    this.loadMoreAsync = _.debounce(this.loadMore, 100)

  }

  componentDidMount() {
    let that = this
    console.log('that.props.flatLook',that.props.flatLook)
    this._scrollView.scrollTo({ x: 0, y: h*that.props.flatLook, animated: true });
  }

  componentWillMount() {
    console.log('will mount')
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
  _toggleMenu(){
    this.setState({isMenuOpen: !this.state.isMenuOpen})
  }

  _tempPopRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  _goToProfile(look) {
    console.log('goToProfile', this.props.look.user);
    this.props.navigateTo('profileScreen', 'itemScreen', look);
  }

  _reportAbuse() {
    this.props.reportAbuse(this.flat.look.id)
  }

  onLoad() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 750
    }).start();
  }

  loadMore() {
    console.log('loadMore');
    if (this.state.isLoading) {
      return;
    }
    const { meta: { total }, query } = this.props;
    const pageSize = query.page.size;
    const pageNumber = query.page.number;

    if (pageSize * pageNumber < total) {
      this.setState({isLoading: true}, () => {
        this.props.loadMore().then(() => {
          this.setState({isLoading: false});
        }).catch(err => {
          console.log('error', err);
          this.setState({isLoading: false});
        });
      });
    } else {
      this.setState({noMoreData: true})
      console.log('end of feed');
    }
  }

  handleScroll(event) {
    if (this.props.hasUserSize) {
      this.scrollCallAsync(event);
    } else {
      const contentSizeHeight = event.nativeEvent.contentSize.height;
      const layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height;
      const currentScroll = event.nativeEvent.contentOffset.y
      const compare = (contentSizeHeight - layoutMeasurementHeight) / currentScroll;
      if (compare <= LOADER_HEIGHT) {
        this.loadMoreAsync();
      }
    }
  }

  _renderItems() {
    let count = 0
    return (
      <View>
        <ScrollView pagingEnabled={true}
                    ref={(c) => { this._scrollView = c; }}
                    scrollEventThrottle={100}
                    onScroll={this.handleScroll.bind(this)}>
          {this.props.flatLooksData.map((look, index) => {
            return (
              <View key={index}>
                <Animated.Image
                  resizeMode={'cover'}
                  style={[{opacity: this.state.fadeAnim},styles.itemImage]}
                  source={{uri: look.uri}}
                  onLoad={this.onLoad()}>
                  <BottomLookContainer
                    look={look}
                    tempPopRoute={(e) => this._tempPopRoute()}
                    goToProfile={(look) => this._goToProfile(look)}
                    toggleLike={(isLiked) => this._toggleLike(isLiked)}/>
                </Animated.Image>
              </View>
            )
          })}

        </ScrollView>
      </View>
    )
  }

  // _renderItemContent(look) {
  //   console.log('lol')
  //   return (
  //
  //   )
  // }

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
    reportAbuse: (lookId) => dispatch(reportAbuse(lookId)),
    loadMore: () => dispatch(loadMore()),
  };
}

const mapStateToProps = state => {
  const lookData = state.look.screenLookData.look ? state.look.screenLookData.look : [];
  console.log('flatlooooks',state.feed.flatLooksData)
  return {
    isLoading: state.loader.loading,
    navigation: state.cardNavigation,
    look: lookData,
    flatLooksData: state.feed.flatLooksData,
    meta: state.feed.meta,
    query: state.feed.query,
  };
};

export default connect(mapStateToProps, bindAction)(ItemScreen);
