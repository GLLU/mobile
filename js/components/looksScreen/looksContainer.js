import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import {
  View,
  Image,
  Animated,
  InteractionManager,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import styles from './styles';
import BottomLookContainer from './BottomLookContainer';
import Spinner from '../loaders/Spinner';
import { likeUpdate, unLikeUpdate } from '../../actions/likes';
import { loadMore, replaceAt } from '../../actions';
import { reportAbuse } from '../../actions/looks';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import navigateTo from '../../actions/sideBarNav';
import Video from 'react-native-video';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 50
};
const height = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT')
const width = Dimensions.get('window').width;
const {popRoute, pushRoute} = actions;

class LooksContainer extends BasePage {
  static propTypes = {
    flatLook: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.number
    ]),
    flatLooksData: React.PropTypes.array,
    navigation: React.PropTypes.object,
    meta: React.PropTypes.object,
    query: React.PropTypes.object,
    navigateTo: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    likeUpdate: React.PropTypes.func,
    unLikeUpdate: React.PropTypes.func,
    reportAbuse: React.PropTypes.func,
    loadMore: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.onToggleDrawer=this.onToggleDrawer.bind(this);
    this.state = {
      fadeAnim: new Animated.Value(0.35),
      fadeAnimContent: new Animated.Value(0),
      likes: this.props.flatLook.likes,
      liked: this.props.flatLook.liked,
      showAsFeed: !this.props.flatLook.singleItem, // Will check if recieved one object or an index of flatLooksData
      isBottomDrawerOpen: false,
      isAnimatingScrollView: Platform.OS !== 'ios' && typeof this.props.flatLook === 'number',
      renderScroll: false,
      startAnimte: false,
      currScrollIndex: this.props.flatLook.originalIndex
    }
    this.loadMoreAsync = _.debounce(this.loadMore, 100)
  }

  componentDidMount() {
    if (this.state.showAsFeed) {
      switch (Platform.OS) {
        case 'ios':
          this._scrollView.scrollTo({x: 0, y: height, animated: false});
          this.setState({startAnimte: true})
          break;
        case 'android':
          InteractionManager.runAfterInteractions(() => {
            _.delay(() => this._scrollView.scrollTo({
              x: 0,
              y: height,
              animated: false
            }), 0);
            _.delay(() => this.props.removeLoader(), 0);
          });
          break;
      }
    } else {
      _.delay(() => this.props.removeLoader(), 0);
    }
  }

  _toggleLike(isLiked) {
    if (isLiked) {
      let data = {id: this.props.flatLook.id, likes: this.state.likes + 1, liked: true}
      this.props.likeUpdate(data);
    } else {
      let data = {id: this.props.flatLook.id, likes: this.state.likes - 1, liked: false}
      this.props.unLikeUpdate(data);
    }
  }

  _tempPopRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  _goToProfile(look) {
    this.props.replaceAt('looksScreen', {key: 'profileScreen', optional: look}, this.props.navigation.key);
  }

  onToggleDrawer(shouldOpen){
    this.setState({isBottomDrawerOpen:shouldOpen})
  }

  loadMore() {
    console.log('loadMore');
    if (this.state.isLoading) {
      return;
    }
    const {meta: {total}, query} = this.props;
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

  onSwipe(gestureName) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP:
        const {meta: {total}} = this.props;
        if (this.state.currScrollIndex < total-1) {
          this._scrollView.scrollTo({x: 0, y: 0, animated: false});
          this._scrollView.scrollTo({x: 0, y: height, animated: true});
          this.setState({currScrollIndex: this.state.currScrollIndex+1})
        }
        if (this.state.currScrollIndex % 5 === 0) {
          this.loadMoreAsync();
        }
        break;
      case SWIPE_DOWN:
        if (this.state.currScrollIndex !== 0) {
          this._scrollView.scrollTo({x: 0, y: height+height, animated: false});
          this._scrollView.scrollTo({x: 0, y: height, animated: true});
          this.setState({currScrollIndex: this.state.currScrollIndex-1})
        }
        if (this.state.currScrollIndex % 5 === 0) {
          this.loadMoreAsync();
        }
        break;
      case SWIPE_LEFT:
        console.log('swipe left, no action');
        break;
      case SWIPE_RIGHT:
        console.log('swipe right, no action');
        break;
    }
  }

  renderVideo(look, index) {
    return (
      <GestureRecognizer
        key={look.originalIndex}
        onSwipe={this.state.showAsFeed && !this.state.isBottomDrawerOpen ? (direction, state) => this.onSwipe(direction, state, index) : null}
        config={config}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          position: 'relative',
          height: height
        }}>
        <Video
          source={{uri: look.uri, mainVer: 1, patchVer: 0}}
          resizeMode={'stretch'}
          muted={true}
          style={styles.videoBackground}
          repeat={false}
        />
        <BottomLookContainer
          width={width}
          height={height}
          look={look}
          tempPopRoute={(e) => this._tempPopRoute()}
          goToProfile={(look) => this._goToProfile(look)}
          toggleLike={(isLiked) => this._toggleLike(isLiked)}
          toggleMenu={() => this._toggleMenu()}
          isMenuOpen={this.state.isMenuOpen}
          onBottomDrawerOpen={this.onToggleDrawer}
          reportAbuse={(lookId) => this.props.reportAbuse(lookId)}
        />
      </GestureRecognizer>
    )
  }

  renderImage(look, index) {
    return (
      <GestureRecognizer
        key={look.originalIndex}
        onSwipe={this.state.showAsFeed && !this.state.isBottomDrawerOpen ? (direction, state) => this.onSwipe(direction, state, index) : null}
        config={config}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}>
        <Image
          resizeMode={'cover'}
          style={styles.itemImage}
          source={{uri: look.uri}}>
          <BottomLookContainer
            width={width}
            height={height}
            look={look}
            tempPopRoute={(e) => this._tempPopRoute()}
            goToProfile={(look) => this._goToProfile(look)}
            toggleLike={(isLiked) => this._toggleLike(isLiked)}
            toggleMenu={() => this._toggleMenu()}
            isMenuOpen={this.state.isMenuOpen}
            onBottomDrawerOpen={this.onToggleDrawer}
            reportAbuse={(lookId) => this.props.reportAbuse(lookId)}
          />
        </Image>
      </GestureRecognizer>
    )
  }

  getFlatFeed () {
    let looksArr = ''
    const {meta: {total}} = this.props;

    if (total == 1) {
       return looksArr = [
        this.props.flatLooksData[this.state.currScrollIndex]
      ]
    }

    switch(this.state.currScrollIndex) {
      case 0:
         return looksArr = [
          this.props.flatLooksData[this.state.currScrollIndex+2], // fictional
          this.props.flatLooksData[this.state.currScrollIndex],
          this.props.flatLooksData[this.state.currScrollIndex+1]
        ]
        break;
      case total-1:
        return looksArr = [
          this.props.flatLooksData[this.state.currScrollIndex-1],
          this.props.flatLooksData[this.state.currScrollIndex],
          this.props.flatLooksData[this.state.currScrollIndex-2] // fictional
        ]
      default:
        return looksArr = [
          this.props.flatLooksData[this.state.currScrollIndex-1],
          this.props.flatLooksData[this.state.currScrollIndex],
          this.props.flatLooksData[this.state.currScrollIndex+1]
        ]
    }
  }

  render() {
    let looksArr = ''
    if(this.state.showAsFeed) {
      looksArr = this.getFlatFeed()
    } else {
      looksArr = [this.props.flatLook]
    }
    console.log('looksArr',looksArr)
    return (
      <ScrollView pagingEnabled={false}
                  ref={(c) => {
                    this._scrollView = c;
                  }}
                  scrollEventThrottle={100}
                  scrollEnabled={false}>
        {looksArr.map((look, index) => {
          return look.coverType === "video" ? this.renderVideo(look, index) : this.renderImage(look, index)
        })}
      </ScrollView>
    )
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
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => {
  return {
    isLoading: state.loader.loading,
    navigation: state.cardNavigation,
    flatLooksData: state.feed.flatLooksData,
    meta: state.feed.meta,
    query: state.feed.query,
    userLooks: state.userLooks.userLooksData
  };
};

export default connect(mapStateToProps, bindAction)(LooksContainer);
