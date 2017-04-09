import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Animated,
  RefreshControl
} from 'react-native';
import { View } from 'native-base';
import LikeView from './items/LikeView';
import TypeView from './items/TypeView';
import SocialShare from '../../lib/social';
import Spinner from '../loaders/Spinner';
import Utils from '../../Utils';
import BaseComponent from '../common/BaseComponent';
import _ from 'lodash';
import { showBodyTypeModal, navigateTo, likeUpdate, unLikeUpdate, getFeed, loadMore } from '../../actions';
import Video from 'react-native-video';

const deviceWidth = Dimensions.get('window').width;
const LOADER_HEIGHT = 30;

class TabContent extends BaseComponent {

  static propTypes = {
    hasUserSize: React.PropTypes.bool,
    flatLooks: React.PropTypes.array,
    query: React.PropTypes.object,
    reloading: React.PropTypes.bool,
    handleSwipeTab: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    likeUpdate: React.PropTypes.func,
    unLikeUpdate: React.PropTypes.func,
    getFeed: React.PropTypes.func,
    showBodyTypeModal: React.PropTypes.func,
    loadMore: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      noMoreData: false,
      //fadeAnim: new Animated.Value(0),
      isRefreshing: false,
    };
    this.scrollCallAsync = _.debounce(this.scrollDebounced, 100)
    this.loadMoreAsync = _.debounce(this.loadMore, 100)
    this.showBodyModal = _.once(this._showBodyModal);
    this.layoutWidth = 0;
  }

  onLoad() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1500
    }).start();
  }

  _onShareClicked() {
    this.logEvent('LookScreen', {name: 'Share click'});
    SocialShare.nativeShare();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.cardNavigationStack.length < 2) {
      const total = nextProps.meta.total;
      this.setState({
        total,
      });

      // show modal after done loading for 3 seconds
      if (this.props.reloading && this.props.reloading !== nextProps.reloading) {
        if (!this.props.hasUserSize) {
          setTimeout(() => {
            this.showBodyModal();
          }, 3000);
        }
      }
    }

  }

  handleScroll(event) {
    if (!this.props.hasUserSize) {
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

  loadMore() {
    if (this.state.isLoading) {
      return;
    }
    const {meta: {total}, query} = this.props;
    const pageSize = query.page.size;
    const pageNumber = query.page.number;

    if (pageSize * pageNumber < total) {
      this.setState({isLoading: true}, () => {
        this.props.loadMore().then((looks) => {
          return Utils.preloadLookImages(looks).then(() => {
            this.setState({isLoading: false});
          });
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

  _showBodyModal() {
    this.props.showBodyTypeModal();
  }

  scrollDebounced(e) {
    this.showBodyModal();
  }

  _handleItemPress(item) {
    this.logEvent('Feedscreen', {name: 'Image click'});
    let that = this
    if(Platform.OS === 'ios') { // On android we use interactionManager, on ios we dont need to we let the TouchableOpacity end. and then go to next page.
      setTimeout(function(){ that.props.navigateTo('looksScreen', 'feedscreen', item); }, 200);
    } else {
      this.props.navigateTo('looksScreen', 'feedscreen', item);
    }
  }

  toggleLikeAction(item, isLiked) {
    this.logEvent('Feedscreen', {name: 'Like Image click'});
    if (isLiked) {
      let data = {id: item.id, likes: item.likes + 1, liked: true}
      this.props.likeUpdate(data);
    } else {
      let data = {id: item.id, likes: item.likes - 1, liked: false}
      this.props.unLikeUpdate(data);
    }
  }

  getProgress() {
    console.log('Video is still playing')
  }

  renderVideo(img, index) {
    return (
      <View style={{flex: 1}}>
        <Video source={{uri: img.uri, mainVer: 1, patchVer: 0}}
               resizeMode={'contain'}
               muted={true}
               style={{width: img.width - 5, height: img.height, overflow: 'hidden'}}
               repeat={false}
               onProgress={this.getProgress()}
        />
        <LikeView index={index} item={img} onPress={this.toggleLikeAction.bind(this)}/>
      </View>
    )
  }

  renderImage(img, index) {
    return (
      <Image source={{uri: img.uri}} style={{width: img.width - 5, height: img.height, resizeMode: 'contain'}}>
        <LikeView index={index} item={img} onPress={this.toggleLikeAction.bind(this)}/>
      </Image>
    )
  }

  _renderImages(images) {
    return images.map((img, index) => {
      return (
        <View key={img.id} style={{width: img.width, height: img.height, paddingLeft: 0}}>
          <TouchableOpacity onPress={(e) => this._handleItemPress(img)}>
            {img.coverType === 'video' ? this.renderVideo(img, index) : this.renderImage(img, index)}
          </TouchableOpacity>
        </View>
      );
    });
  }

  _renderLoadMore() {
    return (
      <View style={styles.loader}>
        {(() => {
          if (this.state.noMoreData) {
            return <Text style={{color: 'rgb(230,230,230)'}}>No additional looks yet</Text>
          }
          if (this.state.isLoading) {
            return <Spinner color='rgb(230,230,230)'/>;
          }
          return null;
        })()}
      </View>);
  }

  _renderLoading() {
    if (this.props.reloading) {
      return (
        <View style={styles.spinnerContainer}>
          <Spinner color='#666666'/>
        </View>
      );
    }
  }

  _renderRefreshingCover() {
    return (
      this.state.isRefreshing &&
      <View style={styles.refreshingCover}/>
    )
  }

  _renderRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this.onRefresh.bind(this)}
        tintColor="#666666"
        colors={['#666666']}
        progressBackgroundColor="#fff"
      />
    )
  }

  onRefresh() {
    this.setState({isRefreshing: true})
    const {getFeed, query} = this.props;

    // reset the first page
    query.page.number = 1;

    getFeed(query)
      .then(() => {
        this.setState({isRefreshing: false})
      })
      .catch(error => {
        console.log('Error when preload image', error)
        this.setState({isRefreshing: false})
      });
  }

  render() {
      return (
        <View style={styles.tab}>
          <ScrollView
            style={{flex: 1}}
            scrollEventThrottle={100}
            onScroll={this.handleScroll.bind(this)}
            refreshControl={this._renderRefreshControl.bind(this)()}>
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 5}}>
              <View style={{flex: 0.5, flexDirection: 'column'}}>
                <TouchableOpacity onPress={() => this._onShareClicked()}>
                  <View style={{width: deviceWidth / 2 - 5, height: deviceWidth / 4, paddingLeft: 0, marginTop: 5}}>
                    <Image source={{uri: 'https://cdn1.gllu.com/assets/buttons/feed_invite_1.png'}}
                           style={{width: deviceWidth / 2 - 10, height: deviceWidth / 4}}
                           resizeMode={'contain'}/>
                  </View>
                </TouchableOpacity>
                {this._renderImages(_.filter(this.props.flatLooks,(look,index)=>index%2===0))}
              </View>
              <View style={{flex: 0.5, flexDirection: 'column'}}>
                {this._renderImages(_.filter(this.props.flatLooks,(look,index)=>index%2===1))}
              </View>
            </View>
            {this._renderLoadMore()}
            {this._renderRefreshingCover()}
          </ScrollView>
          {this._renderLoading()}
        </View>
      )
  }
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    height: LOADER_HEIGHT,
    alignItems: 'center',
    margin: 5,
    padding: 5,
  },
  spinnerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  refreshingCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

function bindActions(dispatch) {
  return {
    showBodyTypeModal: () => dispatch(showBodyTypeModal()),
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    likeUpdate: (id) => dispatch(likeUpdate(id)),
    unLikeUpdate: (id) => dispatch(unLikeUpdate(id)),
    getFeed: (query) => dispatch(getFeed(query)),
    loadMore: () => dispatch(loadMore()),
  };
}

const mapStateToProps = state => {
  const hasUserSize = state.user.user_size !== null && !_.isEmpty(state.user.user_size);
  const flatLooks = mapImages(state.feed.flatLooksData);
  const user_size = hasUserSize ? state.user.user_size : '';
  return {
    modalShowing: state.myBodyType.modalShowing,
    flatLooks: flatLooks,
    meta: state.feed.meta,
    query: state.feed.query,
    hasUserSize,
    user_size: user_size,
    user_gender: state.user.gender,
    cardNavigationStack: state.cardNavigation.routes
  }
};

const mapImages = (looks) => {
  let images = _.cloneDeep(looks) || [];
  const colW = (deviceWidth - 10) / 2;
  images = _.filter(images, x => x.width && x.height).map((look) => {
    const {width, height} = look;
    look.width = colW;
    look.height = height / width * colW;
    return look;
  });
  return images;
}

export default connect(mapStateToProps, bindActions)(TabContent);
