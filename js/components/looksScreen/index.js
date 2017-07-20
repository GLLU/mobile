// @flow

import React, { Component } from 'react';
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
import LookOverlay from './LookOverlay';
import { likeUpdate, unlikeUpdate, loadMore, getLookLikes } from '../../actions';
import { reportAbuse } from '../../actions/looks';
import { connect } from 'react-redux';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import * as _ from "lodash";
import VideoWithCaching from "../common/media/VideoWithCaching";
import ImageWrapper from "../common/media/ImageWrapper";
import asScreen from "../common/containers/Screen"
import Spinner from "../loaders/Spinner";
import { editNewLook } from "../../actions/uploadLook";
const arrowDown = require('../../../images/icons/arrow_down.png');
const arrowUp = require('../../../images/icons/arrow_up.png');

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 50
};
const height = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT')
const width = Dimensions.get('window').width;

type Props = {
  flatLook: object | number,
  flatLooksData: Array<object>,
  navigation: object,
  meta: object,
  query: object,
  navigateTo: void,
  likeUpdate: void,
  unlikeUpdate: void,
  reportAbuse: void,
  loadMore: void,
};

class LooksScreen extends Component {

  props: Props;

  constructor(props: Props) {
    super(props);
    this._goToProfile = this._goToProfile.bind(this);
    this._goToEdit = this._goToEdit.bind(this);
    this.goToLikes = this.goToLikes.bind(this);
    this.onToggleDrawer = this.onToggleDrawer.bind(this);
    this._toggleLike = this._toggleLike.bind(this);
    this.renderUpArrow = this.renderUpArrow.bind(this);
    this.renderDownArrow = this.renderDownArrow.bind(this);
    const flatLook = this.props.navigation.state.params
    this.state = {
      flatLook: this.props.navigation.state.params,
      fadeAnim: new Animated.Value(0.35),
      fadeAnimContent: new Animated.Value(0),
      showAsFeed: !flatLook.singleItem, // Will check if recieved one object or an index of flatLooksData
      isBottomDrawerOpen: flatLook.openComments,
      isAnimatingScrollView: Platform.OS !== 'ios' && typeof flatLook === 'number',
      startAnimte: false,
      currScrollIndex: flatLook.originalIndex,
      loader: Platform.OS !== 'ios' && !flatLook.singleItem,
      mountedOnce: false
    }
    this.loadMoreAsync = _.debounce(this.loadMore, 100)
    this.opennedComments = false
  }

  componentDidMount() {
    const {meta: {total}} = this.props;
    if (this.state.showAsFeed) {
      switch (Platform.OS) {
        case 'ios':
          if (total === 2) {
            this._scrollView.scrollTo({x: 0, y: this.state.currScrollIndex * height, animated: false});
            break;
          } else {
            this._scrollView.scrollTo({x: 0, y: height, animated: false});
            break;
          }
        case 'android':
          if (total === 2) {
            _.delay(() => this._scrollView.scrollTo({
              x: 0,
              y: this.state.currScrollIndex * height,
              animated: false
            }), 0);
            _.delay(() => this.setState({loader: false}), 0);
            this.setState({loader: false})
          } else {
            _.delay(() => this._scrollView.scrollTo({
              x: 0,
              y: height,
              animated: false
            }), 0);
            _.delay(() => this.setState({loader: false}), 0);
          }

          break;
      }
      this.setState({mountedOnce: true}) //because comments are re-open when you this.goBack
    }
    if (this.state.currScrollIndex === this.props.flatLooksData.length - 1) {
      this.loadMore()
    }
  }

  _toggleLike(shouldLiked: boolean, lookId: number) {
    this.props.logEvent('LookScreen', {name: 'Like click', liked: `${shouldLiked}`});
    if (shouldLiked) {
      this.props.likeUpdate(lookId);
    } else {
      this.props.unlikeUpdate(lookId);
    }
  }

  _goToProfile(look: object) {
    this.props.navigateTo('profileScreen', look);
  }

  _goToEdit(look: object) {
    this.props.editNewLook(look.id).then(() => {
      this.props.navigateTo('addItemScreen', {mode: 'edit'});
    });
  }

  goToLikes(look: object) {
    this.props.navigateTo('likesscreen', {lookId: look.id, count: look.likes})
  }

  onToggleDrawer(shouldOpen: boolean) {
    this.setState({isBottomDrawerOpen: shouldOpen})
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

  onSwipe(gestureName: string) {
    this.props.logEvent('LookScreen', {name: `user swiped! type: ${gestureName}`});
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP: {
        const {meta: {total}} = this.props;
        if (this.state.currScrollIndex !== this.props.flatLooksData.length - 1) {
          this._scrollView.scrollTo({x: 0, y: 0, animated: false});
          this._scrollView.scrollTo({x: 0, y: height, animated: true});
          this.setState({currScrollIndex: this.state.currScrollIndex + 1})
        }
        if (this.state.currScrollIndex % 5 === 0 || this.state.currScrollIndex === total - 1) {
          this.loadMoreAsync();
        }
        break;
      }
      case SWIPE_DOWN: {
        if (this.state.currScrollIndex !== 0) {
          this._scrollView.scrollTo({x: 0, y: height + height, animated: false});
          this._scrollView.scrollTo({x: 0, y: height, animated: true});
          this.setState({currScrollIndex: this.state.currScrollIndex - 1})
        }
        if (this.state.currScrollIndex % 5 === 0) {
          this.loadMoreAsync();
        }
        break;
      }
      case SWIPE_LEFT:
        console.log('swipe left, no action');
        break;
      case SWIPE_RIGHT:
        console.log('swipe right, no action');
        break;
      default:
        console.log('have we broken the 4th wall?')
    }
  }

  shouldRenderArrows() {
    if (this.state.showAsFeed) {
      const {meta: {total}} = this.props;
      return total > 2
    } else {
      return false
    }
  }

  renderUpArrow() {
    if (this.state.currScrollIndex !== 0) {
      return (
        <View style={{position: 'absolute', top: 0, width: width, height: 30}}>
          <TouchableOpacity onPress={() => this.onSwipe('SWIPE_DOWN')} style={{width: 50, alignSelf: 'center'}}>
            <Image source={arrowUp} resizeMode={'contain'} style={{width: 25, height: 40, alignSelf: 'center'}}/>
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderDownArrow() {
    return (
      <View style={{position: 'absolute', bottom: 0, width: width, height: 30}}>
        <TouchableOpacity onPress={() => this.onSwipe('SWIPE_UP')} style={{width: 50, alignSelf: 'center'}}>
          <Image source={arrowDown} resizeMode={'contain'} style={{width: 25, height: 40, alignSelf: 'center'}}/>
        </TouchableOpacity>
      </View>
    )
  }

  openCommentsInAdvance(look: object) {

    if (!this.state.mountedOnce && this.state.flatLook.openComments && look.id === this.state.flatLook.id) {
      this.opennedComments = !this.opennedComments
      return this.opennedComments
    }
    return false
  }

  renderVideo(look: object, index: number) {
    const showShowArrow = this.shouldRenderArrows()
    const openComments = this.openCommentsInAdvance(look)
    return (
      <GestureRecognizer
        key={look.originalIndex !== undefined ? look.originalIndex : -1}
        onSwipe={this.state.showAsFeed && !this.state.isBottomDrawerOpen ? (direction, state) => this.onSwipe(direction, state, index) : null}
        config={config}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          position: 'relative',
          height: height
        }}>
        <VideoWithCaching
          source={{uri: look.uri, mainVer: 1, patchVer: 0}}
          resizeMode={'contain'}
          muted={this.state.currScrollIndex !== look.originalIndex}
          style={styles.videoBackground}
          repeat={true}
          navigation={this.props.cardNavigation}
        />
        <LookOverlay
          width={width}
          height={height}
          look={look}
          lookType={"video"}
          shouldShowLike={this.state.showAsFeed}
          isMenuOpen={this.state.isMenuOpen}
          openComments={openComments}
          onBottomDrawerOpen={this.onToggleDrawer}
          goBack={this.props.goBack}
          goToProfile={this._goToProfile}
          goToLikes={this.goToLikes}
          goToEdit={this._goToEdit}
          toggleLike={(shouldLike) => this._toggleLike(shouldLike, look.id)}
          reportAbuse={(lookId) => this.props.reportAbuse(lookId)}
        />
        {showShowArrow ? this.renderUpArrow() : null}
        {showShowArrow ? this.renderDownArrow() : null}
      </GestureRecognizer>
    )
  }

  renderImage(look: object, index: boolean) {
    const showShowArrow = this.shouldRenderArrows()
    const openComments = this.openCommentsInAdvance(look)
    return (
      <GestureRecognizer
        key={look.originalIndex !== undefined ? look.originalIndex : -1}
        onSwipe={this.state.showAsFeed && !this.state.isBottomDrawerOpen ? (direction, state) => this.onSwipe(direction, state, index) : null}
        config={config}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}>
        <ImageWrapper
          resizeMode={'stretch'}
          style={styles.itemImage}
          source={{uri: look.uri}}
          navigation={this.props.cardNavigation}>
          <LookOverlay
            width={width}
            height={height}
            look={look}
            shouldShowLike={this.state.showAsFeed}
            isMenuOpen={this.state.isMenuOpen}
            openComments={openComments}
            onBottomDrawerOpen={this.onToggleDrawer}
            goBack={this.props.goBack}
            goToProfile={this._goToProfile}
            goToLikes={this.goToLikes}
            goToEdit={this._goToEdit}
            toggleLike={(shouldLike) => this._toggleLike(shouldLike, look.id)}
            reportAbuse={(lookId) => this.props.reportAbuse(lookId)}
          />
          {showShowArrow ? this.renderUpArrow() : null}
          {showShowArrow ? this.renderDownArrow() : null}
        </ImageWrapper>
      </GestureRecognizer>
    )
  }

  getFlatFeed() {
    let looksArr = ''
    const {meta: {total}} = this.props;

    if (total === 1) {
      return looksArr = [
        this.props.flatLooksData[this.state.currScrollIndex]
      ]
    }
    switch (this.state.currScrollIndex) {

      case 0:
        let fictionalLook = _.cloneDeep(this.props.flatLooksData[this.state.currScrollIndex])
        fictionalLook.originalIndex = 999
        return looksArr = [
          fictionalLook, // fictional
          this.props.flatLooksData[this.state.currScrollIndex],
          this.props.flatLooksData[this.state.currScrollIndex + 1]
        ];
      case this.props.flatLooksData.length - 1:
        looksArr = [
          this.props.flatLooksData[this.state.currScrollIndex - 1],
          this.props.flatLooksData[this.state.currScrollIndex],
        ];
        return looksArr
      default:
        return looksArr = [
          this.props.flatLooksData[this.state.currScrollIndex - 1],
          this.props.flatLooksData[this.state.currScrollIndex],
          this.props.flatLooksData[this.state.currScrollIndex + 1]
        ];
    }
  }

  renderLoader() {
    const navigationPropLook = this.props.navigation.state.params
    const {preview, coverType, uri, avatar} = navigationPropLook;
    const previewUri = coverType === 'video' ?
      preview || avatar.url :
      uri;
    return (
      <View style={{position: 'absolute', top: 0, height: height, width: width}}>
        <Image resizeMode={'contain'} source={{uri: previewUri}} style={{
          position: 'absolute',
          top: 0,
          height: height,
          width: width,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Spinner color='grey'/>
        </Image>
      </View>
    )

  }

  render() {
    let looksArr = '';
    if (this.state.showAsFeed) {
      looksArr = this.getFlatFeed()
    } else {
      looksArr = [this.state.flatLook]
    }
    return (
      <View style={{flex: 1}}>

        <ScrollView pagingEnabled={false}
                    ref={(c) => {
                      this._scrollView = c;
                    }}
                    scrollEventThrottle={100}
                    scrollEnabled={false}>
          {looksArr.map((look, index) => {
            return look.coverType === 'video' ? this.renderVideo(look, index) : this.renderImage(look, index)
          })}
        </ScrollView>
        {this.state.loader ? this.renderLoader() : null}
      </View>
    )
  }
}

function bindAction(dispatch) {
  return {
    editNewLook: (id) => dispatch(editNewLook(id)),
    likeUpdate: (id) => dispatch(likeUpdate(id)),
    unlikeUpdate: (id) => dispatch(unlikeUpdate(id)),
    getLookLikes: (id) => dispatch(getLookLikes(id)),
    reportAbuse: (lookId) => dispatch(reportAbuse(lookId)),
    loadMore: () => dispatch(loadMore()),
  };
}

const mapStateToProps = state => {

  return {
    isLoading: state.loader.loading,
    flatLooksData: state.feed.flatLooksData,
    meta: state.feed.meta,
    query: state.feed.query,
    userLooks: state.userLooks.userLooksData,
    cardNavigation: state.cardNavigation
  };
};

export default connect(mapStateToProps, bindAction)(asScreen(LooksScreen));
