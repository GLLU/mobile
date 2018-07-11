// @flow

import React, { Component } from 'react';
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
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import i18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { addLookItems } from '../../actions/look';
import styles from './styles';
import LookOverlay from './LookOverlay';
import SwipeWizardOverlay from './SwipeWizardOverlay';
import * as _ from 'lodash';
import VideoWithCaching from '../common/media/VideoWithCaching';
import ImageWrapper from '../common/media/ImageWrapper';
import Spinner from '../loaders/Spinner';
import { generateAdjustedSize } from '../../utils/AdjustabaleContent';
import ModalQuestion from '../uploadLookScreen/forms/ModalQuestion';

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
    this.setModalVisible = this.setModalVisible.bind(this);
    this._renderLookImage = this._renderLookImage.bind(this);
    this.fetchMoreLooksItems = this.fetchMoreLooksItems.bind(this);
    this.state = {
      showAsFeed: props.flatLooksData.length > 1,
      isBottomDrawerOpen: props.openComments,
      currScrollIndex: props.flatLook.originalIndex,
      loader: Platform.OS !== 'ios' && props.flatLooksData.length > 1,
      mountedOnce: false,
      isMuted: true,
      modalParams: {
        modalVisible: false,
      },
    };
    this.loadMoreAsync = _.debounce(this.loadMore, 100);
  }

  setModalVisible(params: object) {
    const { modalParams } = this.state;
    this.setState({ modalParams: { ...modalParams, ...params } });
  }

  componentDidUpdate(prevProps, prevState) {
    const { flatLooksData } = this.props;
    const currIndex = this.state.currScrollIndex;
    if (prevState.currScrollIndex !== this.state.currScrollIndex) {
      const lookArr = this.getFlatFeed();
    }
  }

  fetchCurrentLookItems() {
    const { flatLooksData, addLookItems } = this.props;
    const currIndex = this.state.currScrollIndex;
    addLookItems(flatLooksData[currIndex].id);
  }

  fetchMoreLooksItems() {
    const { flatLooksData, addLookItems } = this.props;
    const currIndex = this.state.currScrollIndex;
    const startIndex = (currIndex - 2 > 0) ? currIndex - 2 : 0;
    const lastIndex = (currIndex + 2 < flatLooksData.length - 1) ? currIndex + 2 : flatLooksData.length - 1;

    for (let i = startIndex; i <= lastIndex; i++) {
      const lookId = flatLooksData[i].id;
      if (!flatLooksData[i].items) {
        addLookItems(lookId);
      }
    }
  }

  componentDidMount() {
    const { meta: { total }, flatLooksData } = this.props;
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
    }
    if (this.state.currScrollIndex >= this.props.flatLooksData.length - 5) {
      this.loadMore();
    }

    const currLook = flatLooksData[this.state.currScrollIndex];
    if (!currLook.items || currLook.items.length === 0) {
      this.fetchCurrentLookItems();
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

  _toggleFavorite = (isFavorite: boolean, lookId: number) => {

    const { logEvent, updateFavorite, showClosetWizard, onShowClosetMessage } = this.props;

    if (showClosetWizard) {
      onShowClosetMessage(i18n.t('CLOSET_WIZARD'));
    }

    logEvent('LookScreen', { name: 'Favorite click', isFavorite: `${isFavorite}` });
    updateFavorite(isFavorite, lookId);
  }

  _goToProfile(user: object) {
    this.props.navigateTo('profileScreen', { userId: user.id });
  }

  _goToEdit(look: object) {
    this.setModalVisible({
      modalVisible: true,
      title: i18n.t('OUR_APOLOGIES'),
      confirmString: i18n.t('CONTINUE'),
      cancelString: '',
      subtitle: i18n.t('EDIT_IN_CONTRUCTION'),
      confirmAction: this.resetToFeed,
      cancelAction: this.resetToFeed,
    });
    /*
    this.props.editNewLook(look.id).then(() => {
      this.props.navigateTo('uploadLookScreen', { mode: 'edit' });
    });
    */
  }

  _goToLikes(look: object) {
    this.props.navigateTo('likesscreen', { lookId: look.id, count: look.likes });
  }

  _openRedirectedWebView = (url: string, lookId: number, itemId: number, suggId: number) => {
    fetch(url, { redirect: 'follow', credentials: 'include' }).then(res => res.text().then((html) => {
      this.props.navigateTo('webViewScreen', { html, baseUrl: res.url, headerData: { title: i18n.t('SHOP_ITEM') } });
    }));
  }

  _openWebView = (url: string, lookId: number, itemId: number, suggId: number) => {
    this.props.navigateTo('webViewScreen', { url, headerData: { title: i18n.t('SHOP_ITEM') } });
  }

  onToggleDrawer(shouldOpen: boolean) {
    this.setState({ isBottomDrawerOpen: shouldOpen });
  }

  loadMore() {
    if (this.state.isLoading) {
      return;
    }
    const { meta: { total }, query } = this.props;
    if (query['page[number]'] * query['page[size]'] < total) {
      this.setState({ isLoading: true }, () => {
        this.props.loadMore().then(() => {
          this.setState({ isLoading: false });
        }).catch((err) => {
          this.setState({ isLoading: false });
        });
      });
    } else {
      this.setState({ noMoreData: true });
    }
  }

  onSwipe(gestureName: string) {
    this.props.logEvent('LookScreen', { name: 'user swiped', type: gestureName });
    const { onHideSwipeWizard, showSwipeWizard } = this.props;

    this.fetchMoreLooksItems();

    if (showSwipeWizard) {
      onHideSwipeWizard();
    }

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
        break;
      case SWIPE_RIGHT:
        break;
      default:
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

  _toggleVolumePressed = () => {
    this.setState({ isMuted: !this.state.isMuted });
  }

  renderVideo(look: object, index: number) {
    const shouldShowArrow = this.shouldRenderArrows();
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
          muted={this.state.isMuted}
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
          isMuted={this.state.isMuted}
          onVolumePressed={this._toggleVolumePressed}
          goToProfile={this._goToProfile}
          goToLikes={this._goToLikes}
          goToEdit={this._goToEdit}
          openWebView={this._openWebView}
          toggleFavorite={isFavorite => this._toggleFavorite(isFavorite, look.id)}
          toggleLike={shouldLike => this._toggleLike(shouldLike, look.id)}
          reportAbuse={lookId => this.props.reportAbuse(lookId)}
        />
        {shouldShowArrow ? this.renderUpArrow() : null}
        {shouldShowArrow ? this.renderDownArrow() : null}

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
        height: generateAdjustedSize(100),
      }}>
        <TouchableOpacity
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          style={{ position: 'absolute', top: 6, right: 6 }}
          onPress={this._onCloseRetailerMessage}>
          <Image style={{ width: 16, height: 16 }} resizeMode={'contain'} source={closeIcon} />
        </TouchableOpacity>
      </View>
    );
  }

  _onCloseRetailerMessage = () => {
    this.setState({ showRetailerMessage: false });
  }

  _renderLookImage(look: object) {
    const shouldShowArrow = this.shouldRenderArrows();
    const { onHideSwipeWizard, showSwipeWizard } = this.props;
    const { showRetailerMessage } = this.state;
    const openComments = !this.state.mountedOnce && this.props.openComments && look.id === this.props.flatLook.id;
    return (
      <View style={{ backgroundColor: 'black' }}>
        <View style={{
          flex: 1,
          backgroundColor: 'white',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          top: 0,
          bottom: 0,
          right: 33,
          left: 33,
        }}>
          <Text style={styles.loadingImage}> {i18n.t('LOADING_IMAGE')} </Text>
        </View>
        <ImageWrapper
          resizeMode={'contain'}
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
            openWebView={this._openWebView}
            onInvalidItemPressed={(showMessage) => this.setState({ showRetailerMessage: showMessage })}
            toggleFavorite={isFavorite => this._toggleFavorite(isFavorite, look.id)}
            toggleLike={shouldLike => this._toggleLike(shouldLike, look.id)}
            reportAbuse={lookId => this.props.reportAbuse(lookId)}
          />
          {shouldShowArrow ? this.renderUpArrow() : null}
          {shouldShowArrow ? this.renderDownArrow() : null}

          {showSwipeWizard ? <SwipeWizardOverlay onClose={onHideSwipeWizard}/> : null}
          {showRetailerMessage ? this._renderRetailerMessage() : null}

        </ImageWrapper>
      </View>
    );
  }

  renderImage(look: object, index: boolean) {
    return (
      Platform.OS === 'ios' ?
        <View key={look.originalIndex !== undefined ? look.originalIndex : -1}>
          {this._renderLookImage(look)}
        </View>
        :
        <GestureRecognizer
          key={look.originalIndex !== undefined ? look.originalIndex : -1}
          onSwipe={this.state.showAsFeed && !this.state.isBottomDrawerOpen ? (direction, state) => this.onSwipe(direction, state, index) : null}
          config={config}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}>
          {this._renderLookImage(look)}
        </GestureRecognizer>
    );
  }

  getFlatFeed() {
    let looksArr = '';
    const { meta: { total } } = this.props;
    const currLook = this.props.flatLooksData[this.state.currScrollIndex];
 
    if (total === 1) {
      let looksArr = [currLook];
      return looksArr;
    }
    switch (this.state.currScrollIndex) {
      case 0:
        const fictionalLook = _.cloneDeep(this.props.flatLooksData[this.state.currScrollIndex]);
        fictionalLook.originalIndex = 999;
        return looksArr = [
          fictionalLook, // fictional
          currLook,
          this.props.flatLooksData[this.state.currScrollIndex + 1],
        ];
      case this.props.flatLooksData.length - 1:
        looksArr = [
          this.props.flatLooksData[this.state.currScrollIndex - 1],
          currLook,
        ];
        return looksArr;
      default:
        return looksArr = [
          this.props.flatLooksData[this.state.currScrollIndex - 1],
          currLook,
          this.props.flatLooksData[this.state.currScrollIndex + 1],
        ];
    }
  }

  renderLoader() {
    const { preview, coverType, uri, user } = this.props.flatLook;
    const previewUri = coverType === 'video' ?
      preview || user.avatar_url :
      uri;
    console.log(previewUri);
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
          <Spinner color="grey" />
        </Image>
      </View>
    );
  }

  _renderModal() {
    const { modalParams } = this.state;
    return (
      <ModalQuestion
        {...modalParams}
        closeModal={this.setModalVisible} />
    );
  }

  /* componentWillUpdate(nextProps, nextState) {
    console.log('state');
    console.log(this.difference(nextState, this.state));
    console.log('props');
    console.log(this.difference(nextProps, this.props));
  }

  difference(object, base) {
    return _.transform(object, (result, value, key) => {
      if (!_.isEqual(value, base[key])) {
        result[key] = _.isObject(value) && _.isObject(base[key]) ? this.difference(value, base[key]) : value;
      }
    });
  }*/

  render() {
    let looksArr = '';
    if (this.state.showAsFeed) {
      looksArr = this.getFlatFeed();
    } else {
      looksArr = [this.props.flatLook];
    }
    return (
      <View style={{ flex: 1 }}>
        {this._renderModal()}
        <ScrollView
          keyboardShouldPersistTaps={'always'}
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

function bindActions(dispatch) {
  return {
    addLookItems: lookId => dispatch(addLookItems(lookId)),
  };
}

const mapStateToProps = (state) => {
  return {
    flatLookData: state.looks.flatLooksData,
  };
};

export default connect(mapStateToProps, bindActions)(LooksScreen);
