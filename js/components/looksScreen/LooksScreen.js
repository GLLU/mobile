// @flow

import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Text,
  Platform,
} from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import i18n from 'react-native-i18n';
import styles from './styles';
import LookOverlay from './LookOverlay';
import SwipeWizardOverlay from './SwipeWizardOverlay';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import * as _ from 'lodash';
import VideoWithCaching from '../common/media/VideoWithCaching';
import ImageWrapper from '../common/media/ImageWrapper';
import Spinner from '../loaders/Spinner';
import {generateAdjustedSize} from '../../utils/AdjustabaleContent';

const arrowDown = require('../../../images/icons/arrow_down.png');
const arrowUp = require('../../../images/icons/arrow_up.png');
const closeIcon = require('../../../images/icons/cancelEdit.png');

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 50,
};
const height = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
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
  hideSwipeWizard: void,
  openComments: boolean
};

class LooksScreen extends Component {
  props: Props;

  constructor(props: Props) {
    super(props);
    this._goToProfile = this._goToProfile.bind(this);
    this._goToEdit = this._goToEdit.bind(this);
    this._goToLikes = this._goToLikes.bind(this);
    this.onToggleDrawer = this.onToggleDrawer.bind(this);
    this._toggleLike = this._toggleLike.bind(this);
    this.renderUpArrow = this.renderUpArrow.bind(this);
    this.renderDownArrow = this.renderDownArrow.bind(this);
    this.state = {
      showAsFeed: props.flatLooksData.length > 1,
      isBottomDrawerOpen: props.openComments,
      currScrollIndex: props.flatLook.originalIndex,
      loader: Platform.OS !== 'ios' && props.flatLooksData.length > 1,
      mountedOnce: false,
    };
    this.loadMoreAsync = _.debounce(this.loadMore, 100);
  }

  componentDidMount() {
    const { meta: { total } } = this.props;
    if (this.state.showAsFeed) {
      switch (Platform.OS) {
        case 'ios':
          if (total === 2) {
            this._scrollView.scrollTo({ x: 0, y: this.state.currScrollIndex * height, animated: false });
            break;
          } else {
            this._scrollView.scrollTo({ x: 0, y: height, animated: false });
            break;
          }
        case 'android':
          if (total === 2) {
            _.delay(() => this._scrollView.scrollTo({
              x: 0,
              y: this.state.currScrollIndex * height,
              animated: false,
            }), 0);
            _.delay(() => this.setState({ loader: false }), 0);
            this.setState({ loader: false });
          } else {
            _.delay(() => this._scrollView.scrollTo({
              x: 0,
              y: height,
              animated: false,
            }), 0);
            _.delay(() => this.setState({ loader: false }), 0);
          }

          break;
      }
      this.setState({ mountedOnce: true }); // because comments are re-open when you this.goBack
    }
    if (this.state.currScrollIndex === this.props.flatLooksData.length - 1) {
      this.loadMore();
    }
  }

  _toggleLike(shouldLiked: boolean, lookId: number) {
    this.props.logEvent('LookScreen', { name: 'Like click', liked: `${shouldLiked}` });
    if (shouldLiked) {
      this.props.likeUpdate(lookId);
    } else {
      this.props.unlikeUpdate(lookId);
    }
  }

  _goToProfile(look: object) {
    this.props.navigateTo('profileScreen', { user: look });
  }

  _goToEdit(look: object) {
    this.props.editNewLook(look.id).then(() => {
      this.props.navigateTo('uploadLookScreen', { mode: 'edit' });
    });
  }

  _goToLikes(look: object) {
    this.props.navigateTo('likesscreen', { lookId: look.id, count: look.likes });
  }

  onToggleDrawer(shouldOpen: boolean) {
    this.setState({ isBottomDrawerOpen: shouldOpen });
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
      this.setState({ isLoading: true }, () => {
        this.props.loadMore().then(() => {
          this.setState({ isLoading: false });
        }).catch((err) => {
          console.log('error', err);
          this.setState({ isLoading: false });
        });
      });
    } else {
      this.setState({ noMoreData: true });
      console.log('end of feed');
    }
  }

  onSwipe(gestureName: string) {
    this.props.logEvent('LookScreen', { name: 'user swiped', type: gestureName });
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP: {
        const { meta: { total } } = this.props;
        if (this.state.currScrollIndex !== this.props.flatLooksData.length - 1) {
          this._scrollView.scrollTo({ x: 0, y: 0, animated: false });
          this._scrollView.scrollTo({ x: 0, y: height, animated: true });
          this.setState({ currScrollIndex: this.state.currScrollIndex + 1 });
        }
        if (this.state.currScrollIndex % 5 === 0 || this.state.currScrollIndex === total - 1) {
          this.loadMoreAsync();
        }
        break;
      }
      case SWIPE_DOWN: {
        if (this.state.currScrollIndex !== 0) {
          this._scrollView.scrollTo({ x: 0, y: height + height, animated: false });
          this._scrollView.scrollTo({ x: 0, y: height, animated: true });
          this.setState({ currScrollIndex: this.state.currScrollIndex - 1 });
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
        console.log('have we broken the 4th wall?');
    }
  }

  shouldRenderArrows() {
    if (this.state.showAsFeed) {
      const { meta: { total } } = this.props;
      return total > 2;
    } else {
      return false;
    }
  }

  renderUpArrow() {
    if (this.state.currScrollIndex !== 0) {
      return (
        <View style={{ position: 'absolute', top: 0, width, height: 30 }}>
          <TouchableOpacity onPress={() => this.onSwipe('SWIPE_DOWN')} style={{ width: 50, alignSelf: 'center' }}>
            <Image source={arrowUp} resizeMode={'contain'} style={{ width: 25, height: 40, alignSelf: 'center' }}/>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderDownArrow() {
    return (
      <View style={{ position: 'absolute', bottom: 0, width, height: 30 }}>
        <TouchableOpacity onPress={() => this.onSwipe('SWIPE_UP')} style={{ width: 50, alignSelf: 'center' }}>
          <Image source={arrowDown} resizeMode={'contain'} style={{ width: 25, height: 40, alignSelf: 'center' }}/>
        </TouchableOpacity>
      </View>
    );
  }

  renderVideo(look: object, index: number) {
    const showShowArrow = this.shouldRenderArrows();
    const openComments = !this.state.mountedOnce && this.props.openComments && look.id === this.props.flatLook.id;
    const { onHideSwipeWizard, showSwipeWizard } = this.props;

    return (
      <GestureRecognizer
        key={look.originalIndex !== undefined ? look.originalIndex : -1}
        onSwipe={this.state.showAsFeed && !this.state.isBottomDrawerOpen ? (direction, state) => this.onSwipe(direction, state, index) : null}
        config={config}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          position: 'relative',
          height,
        }}>
        <VideoWithCaching
          source={{ uri: look.uri, mainVer: 1, patchVer: 0 }}
          resizeMode={'contain'}
          muted
          style={styles.videoBackground}
          repeat
          navigation={this.props.cardNavigation}
        />
        <LookOverlay
          width={width}
          height={height}
          look={look}
          lookType={'video'}
          shouldShowLike={this.state.showAsFeed}
          isMenuOpen={this.state.isMenuOpen}
          openComments={openComments}
          onBottomDrawerOpen={this.onToggleDrawer}
          goBack={this.props.goBack}
          goToProfile={this._goToProfile}
          goToLikes={this._goToLikes}
          goToEdit={this._goToEdit}
          toggleLike={shouldLike => this._toggleLike(shouldLike, look.id)}
          reportAbuse={lookId => this.props.reportAbuse(lookId)}
        />
        {showShowArrow ? this.renderUpArrow() : null}
        {showShowArrow ? this.renderDownArrow() : null}

        {showSwipeWizard ? <SwipeWizardOverlay onClose={onHideSwipeWizard}/> : null}
      </GestureRecognizer>
    );
  }

  _renderRetailerMessage = () => {
    return (
      <View style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'black',
        justifyContent: 'center',
        height: generateAdjustedSize(100)
      }}>
        <TouchableOpacity
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          style={{position: 'absolute', top: 6, right: 6}}
          onPress={this._onCloseRetailerMessage}>
          <Image style={{width: 16, height: 16}} resizeMode={'contain'} source={closeIcon} />
        </TouchableOpacity>

        <Text style={styles.noItemLink}>{i18n.t('NO_DIRECT_LINK')}</Text>
      </View>
    );
  }

  _onCloseRetailerMessage = () => {
    this.setState({ showRetailerMessage: false });
  }

  renderImage(look: object, index: boolean) {
    const showShowArrow = this.shouldRenderArrows();
    const { onHideSwipeWizard, showSwipeWizard } = this.props;
    const { showRetailerMessage } = this.state;
    const openComments = !this.state.mountedOnce && this.props.openComments && look.id === this.props.flatLook.id;
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
          source={{ uri: look.mediumSizeUri }}
          navigation={this.props.cardNavigation}>
          <LookOverlay
            width={width}
            height={height}
            look={look}
            isMenuOpen={this.state.isMenuOpen}
            openComments={openComments}
            onBottomDrawerOpen={this.onToggleDrawer}
            goBack={this.props.goBack}
            goToProfile={this._goToProfile}
            goToLikes={this._goToLikes}
            goToEdit={this._goToEdit}
            onInvalidItemPressed={(showMessage) => this.setState({ showRetailerMessage: showMessage })}
            toggleLike={shouldLike => this._toggleLike(shouldLike, look.id)}
            reportAbuse={lookId => this.props.reportAbuse(lookId)}
          />
          {showShowArrow ? this.renderUpArrow() : null}
          {showShowArrow ? this.renderDownArrow() : null}

          {showSwipeWizard ? <SwipeWizardOverlay onClose={onHideSwipeWizard}/> : null}
          {showRetailerMessage ? this._renderRetailerMessage() : null}

        </ImageWrapper>
      </GestureRecognizer>
    );
  }

  getFlatFeed() {
    let looksArr = '';
    const { meta: { total } } = this.props;
    if (total === 1) {
      return looksArr = [
        this.props.flatLooksData[this.state.currScrollIndex],
      ];
    }
    switch (this.state.currScrollIndex) {
      case 0:
        const fictionalLook = _.cloneDeep(this.props.flatLooksData[this.state.currScrollIndex]);
        fictionalLook.originalIndex = 999;
        return looksArr = [
          fictionalLook, // fictional
          this.props.flatLooksData[this.state.currScrollIndex],
          this.props.flatLooksData[this.state.currScrollIndex + 1],
        ];
      case this.props.flatLooksData.length - 1:
        looksArr = [
          this.props.flatLooksData[this.state.currScrollIndex - 1],
          this.props.flatLooksData[this.state.currScrollIndex],
        ];
        return looksArr;
      default:
        return looksArr = [
          this.props.flatLooksData[this.state.currScrollIndex - 1],
          this.props.flatLooksData[this.state.currScrollIndex],
          this.props.flatLooksData[this.state.currScrollIndex + 1],
        ];
    }
  }

  renderLoader() {
    const { preview, coverType, uri, avatar } = this.props.flatLook;
    const previewUri = coverType === 'video' ?
      preview || avatar.url :
      uri;
    return (
      <View style={{ position: 'absolute', top: 0, height, width }}>
        <Image
          resizeMode={'stretch'} source={{ uri: previewUri }} style={{
          position: 'absolute',
          top: 0,
          height,
          width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Spinner color="grey"/>
        </Image>
      </View>
    );
  }

  render() {
    let looksArr = '';
    if (this.state.showAsFeed) {
      looksArr = this.getFlatFeed();
    } else {
      looksArr = [this.props.flatLook];
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          pagingEnabled={false}
          ref={(c) => {
            this._scrollView = c;
          }}
          scrollEventThrottle={100}
          scrollEnabled={false}>
          {looksArr.map((look, index) => look.coverType === 'video' ? this.renderVideo(look, index) : this.renderImage(look, index))}
        </ScrollView>
        {this.state.loader ? this.renderLoader() : null}
      </View>
    );
  }
}

export default LooksScreen;
