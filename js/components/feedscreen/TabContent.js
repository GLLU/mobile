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
  RefreshControl,
  View
} from 'react-native';
import SocialShare from '../../lib/social';
import Spinner from '../loaders/Spinner';
import BaseComponent from '../common/base/BaseComponent';
import MediaContainer from '../common/MediaContainer';
import _ from 'lodash';
import { showBodyTypeModal, likeUpdate, unLikeUpdate, getFeed, loadMore, showParisBottomMessage } from '../../actions';
import MediaBorderPatch from '../common/MediaBorderPatch'
import { formatInvitationMessage } from "../../lib/messages/index";

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
      isRefreshing: false,
      currentScrollPosition: 0
    };
    this.scrollCallAsync = _.debounce(this.scrollDebounced, 100)
    this.loadMoreAsync = _.debounce(this.loadMore, 100)
    this.showBodyModal = _.once(this._showBodyModal);
    this.layoutWidth = 0;
    this.currPosition = 0
    this.contentHeight = 0
  }

  _onInviteFriendsClick() {
    this.logEvent('Feedscreen', {name: 'Invite your friends click'});
    const message=SocialShare.generateShareMessage(formatInvitationMessage(this.props.shareToken));
    SocialShare.nativeShare(message);
  }

  componentDidMount() {
    let that = this
    setInterval(function(){ that.handleScrollPositionForVideo(); }, 100);
    //this.props.showParisBottomMessage(`Hey ${this.props.userName}, you look amazing today!`);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.cardNavigationStack.length < 2) {

      // show modal after done loading for 3 seconds
      if (this.props.reloading && this.props.reloading !== nextProps.reloading) {
        if (!this.props.hasUserSize) {
          setTimeout(() => {this.showBodyModal();}, 3000);
        }
      }
    }
    if(nextProps.clearedField){
      this.contentHeight = 0
      this.contentHeight = 0
      this.currPosition = 0
      this.setState({noMoreData: false})
    }

  }

  handleScroll(event) {
    if (!this.props.hasUserSize) {
      this.scrollCallAsync(event);
    } else {
      const layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height;
      const contentSizeHeight = event.nativeEvent.contentSize.height;
      const currentScroll = event.nativeEvent.contentOffset.y
      if (currentScroll === contentSizeHeight - layoutMeasurementHeight) {
        if(this.contentHeight !== contentSizeHeight) {
          this.contentHeight = contentSizeHeight
          this.loadMoreAsync();
        }

      } else {
      }
    }
    this.currPosition = event.nativeEvent.contentOffset.y;
  }


  handleScrollPositionForVideo() {
    if(this.state.currentScrollPosition !== this.currPosition) {
      this.setState({currentScrollPosition: this.currPosition})
    }
  }

  loadMore() {
    if (this.state.isLoading) {
      console.log('already isLoading')
      return;
    }
    const {meta: {total}, query} = this.props;
    const pageSize = query.page.size;
    const pageNumber = query.page.number;

    if (pageSize * pageNumber < total) {
      this.setState({isLoading: true}, () => {
        this.props.loadMore().then(() => {
          this.setState({isLoading: false})}
        ).catch(err => {
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

  _renderLooks(looks) {
    return looks.map((look) => {
      return (
        <View key={look.id}>
        <MediaContainer look={look}
                        currScroll={this.state.currentScrollPosition}
                        likeUpdate={this.props.likeUpdate}
                        unLikeUpdate={this.props.likeUpdate}
                        navigateTo={this.props.navigateTo}
                        sendParisMessage={this.props.showParisBottomMessage}
                        navigation={this.props.cardNavigationStack}/>
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
          if(this.props.flatLooks.length > 2) {
            return <Image source={require('../../../images/icons/feedLoadMore.gif')} />;

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

  renderInviteFriend() {
    if(Platform.OS === 'ios') {
      return (
        <View style={{width: deviceWidth / 2, height: deviceWidth / 4, marginVertical: 3}}>
          <Image source={{uri: 'https://cdn1.gllu.com/assets/buttons/feed_invite_1.png'}}
                 style={{width: deviceWidth / 2-6, height: deviceWidth / 4, borderRadius: 10, alignSelf: 'center'}}
                 resizeMode={'stretch'}/>
        </View>
      )
    } else {
      return (
        <View style={{width: deviceWidth / 2, height: deviceWidth / 4}}>
          <Image source={{uri: 'https://cdn1.gllu.com/assets/buttons/feed_invite_1.png'}}
                 style={{width: deviceWidth / 2, height: deviceWidth / 4}}
                 resizeMode={'stretch'}/>
          <MediaBorderPatch />
        </View>
      )
    }
  }

  render() {
      return (
        <View style={styles.tab}>
          <ScrollView
            style={{flex: 1}}
            scrollEventThrottle={100}
            onScroll={this.handleScroll.bind(this)}
            refreshControl={this._renderRefreshControl.bind(this)()}>
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', width: deviceWidth, justifyContent: 'flex-end',  alignSelf: 'center', }}>
              <View style={{flex: 0.5, flexDirection: 'column', padding: 0, paddingHorizontal: 0, margin:0}}>
                <TouchableOpacity onPress={() => this._onInviteFriendsClick()}>
                  {this.renderInviteFriend()}
                </TouchableOpacity>
                {this._renderLooks(_.filter(this.props.flatLooks,(look,index)=>index%2===0))}
              </View>
              <View style={{flex: 0.5, flexDirection: 'column', padding: 0, paddingHorizontal: 0, margin:0}}>
                {this._renderLooks(_.filter(this.props.flatLooks,(look,index)=>index%2===1))}
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
    likeUpdate: (id) => dispatch(likeUpdate(id)),
    unLikeUpdate: (id) => dispatch(unLikeUpdate(id)),
    getFeed: (query) => dispatch(getFeed(query)),
    loadMore: () => dispatch(loadMore()),
    showParisBottomMessage: (message) => dispatch(showParisBottomMessage(message)),
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
    cardNavigationStack: state.cardNavigation.routes,
    shareToken: state.user.invitation_share_token,
    userName: state.user.name
  }
};

const mapImages = (looks) => {
  let images = _.cloneDeep(looks) || [];
  const colW = (deviceWidth) / 2;
  images = _.filter(images, x => x.width && x.height).map((look) => {
    const {width, height} = look;
    look.width = colW;
    look.height = height / width * colW;
    return look;
  });
  return images;
}

export default connect(mapStateToProps, bindActions)(TabContent);
