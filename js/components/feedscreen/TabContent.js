import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { View } from 'native-base';
import LikeView from './items/LikeView';
import TypeView from './items/TypeView';
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
    meta: React.PropTypes.object,
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
    const { imagesColumn1, imagesColumn2 } = this.distributeImages(this.props.flatLooks);
    this.state = {
      imagesColumn1,
      imagesColumn2,
      isLoading: false,
      noMoreData: false,
    };
    this.scrollCallAsync = _.debounce(this.scrollDebounced, 100)
    this.loadMoreAsync = _.debounce(this.loadMore, 100)
    this.showBodyModal = _.once(this._showBodyModal);
    this.layoutWidth = 0;
  }

  componentWillReceiveProps(nextProps) {
    const total = nextProps.meta.total;
    const flatLooks = nextProps.flatLooks;
    const { imagesColumn1, imagesColumn2 } = this.distributeImages(flatLooks);
    this.setState({
      imagesColumn1,
      imagesColumn2,
      total,
    });

    // show modal after done loading for 3 seconds
    if (this.props.reloading && this.props.reloading != nextProps.reloading) {
      if (!this.props.hasUserSize) {
        setTimeout(() => {
          this.showBodyModal();
        }, 3000);  
      }
    }
  }

  distributeImages(looks) {
    const imagesColumn1 = [];
    const imagesColumn2 = [];
    const colW = (deviceWidth - 10) / 2;
    _.filter(looks, x => x.width && x.height).map((look, index) => {
      const { width, height } = look;
      look.width = colW;
      look.height = height * colW / width ;
      if (index % 2 === 0) {
        imagesColumn1.push(look);
      } else {
        imagesColumn2.push(look);
      }
    });

    return { imagesColumn1, imagesColumn2 };
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
    const { meta: { total }, query } = this.props;
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
    this.logEvent('Feedscreen', { name: 'Image click' });
    this.props.navigateTo('looksScreen', 'feedscreen', item);
  }

  toggleLikeAction(item, isLiked) {
    this.logEvent('Feedscreen', { name: 'Like Image click' });
    if (isLiked) {
      let data = {id: item.id, likes: item.likes+1, liked: true}
      this.props.likeUpdate(data);
    } else {
      let data = {id: item.id, likes: item.likes-1, liked: false}
      this.props.unLikeUpdate(data);
    }
  }

  getProgress() {
    console.log('still playing')
  }

  renderVideo(img, index) {
    return (
      <View style={{flex: 1}} >
        <Video source={{uri: img.uri,mainVer: 1, patchVer: 0}}
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
      <Image source={{uri: img.uri.replace('-staging', '')}} style={{width: img.width - 5, height: img.height, resizeMode: 'contain' }}>
        <LikeView index={index} item={img} onPress={this.toggleLikeAction.bind(this)}/>
      </Image>
    )
  }

  _renderImages(images) {
    return images.map((img, index) => {
        return  (
          <TouchableOpacity key={index} onPress={(e) => this._handleItemPress(img)} onLayout={(event) => {
            var {x, y, width, height} = event.nativeEvent.layout;
            if(img.coverType === 'video'){
              console.log('Y position: ',y)
            }
          }}>
            <View style={{width: img.width, height: img.height, paddingLeft: 0 }}>
              {img.coverType === 'video' ? this.renderVideo(img, index) : this.renderImage(img, index)}
            </View>
          </TouchableOpacity>);
    });
  }

  _renderLoadMore() {
    return (<View style={styles.loader}>
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
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
          <Spinner color='#666666'/>
        </View>
      );  
    }
    
  }

  render() {
    return(
      <View style={styles.tab}>
        <ScrollView
            style={{flex: 1}}
            scrollEventThrottle={100}
            onScroll={this.handleScroll.bind(this)}>
          <View style={[{flex: 1, flexDirection: 'row', paddingLeft: 5}]}>
            <View style={{flex: 0.5, flexDirection: 'column'}}>
              {this._renderImages(this.state.imagesColumn1)}
            </View>
            <View style={{flex: 0.5, flexDirection: 'column'}}>
              {this._renderImages(this.state.imagesColumn2)}
            </View>
          </View>
          {this._renderLoadMore()}
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
  const hasUserSize = state.user.user_size != null && !_.isEmpty(state.user.user_size);
  const user_size = hasUserSize ? state.user.user_size : '';
  return {
    modalShowing: state.myBodyType.modalShowing,
    flatLooks: state.feed.flatLooksData,
    meta: state.feed.meta,
    query: state.feed.query,
    hasUserSize,
    user_size: user_size,
    user_gender: state.user.gender
  }
};

export default connect(mapStateToProps, bindActions)(TabContent);
