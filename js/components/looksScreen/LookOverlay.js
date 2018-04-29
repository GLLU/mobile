// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import * as _ from 'lodash';
import styles from './styles';
import ButtonsBar from './buttons/ButtonsBar';
import SocialShare from '../../lib/social';
import ItemMarker from './markers/ItemMarker';
import InformationView from './information/InformationView';
import CommentsView from './comments/CommentsView';
import LookHeader from './LookHeader';
import ItemPopup from './markers/ItemPopup';
import MenuView from './menu/MenuViewContainer';
import withAnalytics from '../common/analytics/WithAnalytics';
import { downloadFile } from '../../lib/download/FileDownloader';

type Props = {
  look: object,
  lookType: string,
  width: number,
  height: number,
  isMenuOpen: boolean,
  goBack: void,
  goToProfile: void,
  goToLikes: void,
  toggleLike: void,
  reportabuse: void,
  onBottomDrawerOpen: void,
  onInvalidItemPressed: void,
  openComments: boolean
};

class LookOverlay extends Component {

  props: Props;

  static defaultProps = {
    goBack: _.noop,
    goToProfile: _.noop,
    toggleLike: _.noop,
    reportAbuse: _.noop,
    onBottomDrawerOpen: _.noop,
  };

  constructor(props: Props) {
    super(props);
    this._toggleInformation = this._toggleInformation.bind(this);
    this._toggleComments = this._toggleComments.bind(this);
    this._toggleMenuView = this._toggleMenuView.bind(this);
    this._toggleItem = this._toggleItem.bind(this);
    this._toggleBottomContainer = this._toggleBottomContainer.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.goToEdit = this.goToEdit.bind(this);
    this.goToLikes = this.goToLikes.bind(this);
    this.closeBottomModal = this.closeBottomModal.bind(this);
    this._onShareClicked = this._onShareClicked.bind(this);
    this.handleToggleItemPopup = this.handleToggleItemPopup.bind(this);
    const { look } = this.props;
    this.state = {
      comments: look.comments || 0,
      isInformationActive: false,
      isCommentsActive: props.openComments,
      activeItem: '',
      fadeAnimContent: new Animated.Value(0),
      isMenuOpen: false,
      isSharing: false,
      isPopupViewActive: false,
      fadeAnimContentOnPress: new Animated.Value(1),
    };
  }

  handleToggleItemPopup(item, isViewActive) {
    const { isPopupViewActive, activeItem } = this.state;
    if (activeItem === item) {
      this.setState({ isPopupViewActive: !isPopupViewActive });
    } else {
      this.setState({ activeItem: item, isPopupViewActive: true });
    }
  }

  _renderBuyItButtons(look: object) {
    const { width, height, openWebView } = this.props;
    const { activeItem, isPopupViewActive } = this.state;
    return look.items.map((item, index) =>
      <ItemMarker
        key={index}
        item={item}
        onPress={this.props.onInvalidItemPressed}
        openWebView={openWebView}
        containerDimensions={{ width, height }}
        onPopupToggled={this.handleToggleItemPopup}
        pinPosition={{ y: item.cover_y_pos, x: item.cover_x_pos }}
        activeItem={activeItem} 
        isPopupActive={isPopupViewActive} />
    );
  }

  _toggleComments(shouldActive: boolean) {
    const { onBottomDrawerOpen, logEvent } = this.props;
    logEvent('LookScreen', { name: `Comments View ${shouldActive ? 'visible' : 'hidden'}` });
    onBottomDrawerOpen(shouldActive);
    this.setState({ isCommentsActive: shouldActive, isInformationActive: false, isMenuOpen: false });
  }

  _toggleInformation(shouldActive: boolean) {
    const { onBottomDrawerOpen, logEvent } = this.props;
    logEvent('LookScreen', { name: `Information View ${shouldActive ? 'visible' : 'hidden'}` });
    onBottomDrawerOpen(shouldActive);
    this.setState({ isInformationActive: shouldActive, isCommentsActive: false, isMenuOpen: false });
  }

  _toggleMenuView() {
    const { onBottomDrawerOpen, logEvent } = this.props;
    const shouldActive = !this.state.isMenuOpen;
    logEvent('LookScreen', { name: `Menu View ${shouldActive ? 'visible' : 'hidden'}` });
    onBottomDrawerOpen(shouldActive);
    this.setState({ isMenuOpen: shouldActive, isInformationActive: false, isCommentsActive: false });
  }

  _onShareClicked() {
    const { logEvent, look } = this.props;
    logEvent('LookScreen', { name: 'Share clicked' });
    this.setState({ isSharing: true }, () => {
      const previewUrl = look.coverType === 'video' ? look.preview : look.uri;
      if (Platform.OS === 'ios') {
        const message = SocialShare.generateShareLookMessage(look.id);
        this.setState({ isSharing: false }, () => {
          SocialShare.nativeShare(message);
        });
      } else {
        downloadFile(previewUrl, `look-${look.id}`).then((localPath) => {
          const message = SocialShare.generateShareLookMessage(look.id, localPath);
          this.setState({ isSharing: false }, () => {
            SocialShare.nativeShare(message);
          });
        })
          .catch((err) => {
            this.setState({ isSharing: false }, () => {
              console.log(`couldn't share this look ${look.id}`);
            });
          });
      }
    });
  }

  _renderMenuView(isActive: boolean) {
    const { look } = this.props;
    const { isSharing } = this.state;
    return (
      <MenuView
        lookId={look.id}
        userId={look.user.id}
        isMyLook={look.user.isMe}
        isOpen={isActive}
        isSharing={isSharing}
        onRequestClose={this._toggleMenuView}
        onEditPress={() => this.goToEdit(look)}
        onShareClicked={this._onShareClicked} />);
  }

  _renderInformationView(isActive: boolean) {
    const { look } = this.props;
    return (<InformationView
      isOpen={isActive}
      description={look.description}
      items={look.items}
      likes={look.likes}
      comments={look.comments}
      onCommentsPress={this._toggleComments}
      onLikesPress={() => this.goToLikes(look)}
      onRequestClose={this._toggleInformation}
    />);
  }

  _renderCommentsView(isActive: boolean) {
    const { look } = this.props;
    return (<CommentsView
      goToProfile={this.goToProfile}
      look_id={look.id}
      count={this.state.comments}
      isOpen={isActive}
      onRequestClose={this._toggleComments} />);
  }

  _toggleItem(shouldActive: boolean) {
    this.props.onBottomDrawerOpen(shouldActive);
  }

  goToProfile(user: object) {
    this.props.goToProfile(user);
    this.closeBottomModal();
  }

  goToEdit(look: object) {
    this.props.goToEdit(look);
    this.closeBottomModal();
  }

  goToLikes(look: object) {
    this.props.goToLikes(look);
    this.closeBottomModal();
  }

  closeBottomModal() {
    this.setState({ isCommentsActive: false, isInformationActive: false, isMenuOpen: false });
  }

  _toggleBottomContainer() {
    const { isPopupViewActive } = this.state;
    if (isPopupViewActive) {
      this.setState({ isPopupViewActive: false });
    } else if (this.state.fadeAnimContentOnPress._value === 1) {
      Animated.timing(          // Uses easing functions
        this.state.fadeAnimContentOnPress,    // The value to drive
        {
          toValue: 0,
          delay: 250,
        }            // Configuration
      ).start();
    } else {
      Animated.timing(          // Uses easing functions
        this.state.fadeAnimContentOnPress,    // The value to drive
        {
          toValue: 1,
          delay: 250,
        }            // Configuration
      ).start();
    }
  }

  _renderPopupItems() {
    const { openWebView, look } = this.props;
    const { activeItem } = this.state;
    return (
      <ItemPopup {...activeItem} openWebView={openWebView} lookId={look.id} itemId={activeItem.id} />
    );
  }

  render() {
    const { look, lookType, toggleLike, toggleFavorite, goBack, onVolumePressed, isMuted } = this.props;
    const { isPopupViewActive } = this.state;
    Animated.timing(          // Uses easing functions
      this.state.fadeAnimContent,    // The value to drive
      {
        toValue: 1,
        delay: 250,
      }            // Configuration
    ).start();
    return (
      <View style={{ marginTop: 0 }}>
        <LookHeader
          avatar={{ uri: look.user.avatar.url }}
          onBackNavigationPress={goBack}
          onProfileAvatarPress={() => this.goToProfile(look.user)} />
        <Animated.View style={{ opacity: this.state.fadeAnimContentOnPress }}>
          <TouchableWithoutFeedback onPress={this._toggleBottomContainer}>
            <View style={[styles.lookInfo, { flexGrow: 1, flexDirection: 'column' }]}>
              <ButtonsBar
                isCommentsActive={this.state.isCommentsActive}
                toggleComments={this._toggleComments}
                toggleItem={this._toggleItem}
                hasDescription={!_.isEmpty(look.description)}
                isInformationActive={this.state.isInformationActive}
                toggleDescription={this._toggleInformation}
                isFavorite={look.isFavorite}
                liked={look.liked}
                likes={look.likes}
                isMuted={isMuted}
                comments={look.comments}
                toggleLike={toggleLike}
                toggleFavorite={toggleFavorite}
                toggleMenu={() => this._toggleMenuView()}
                items={look.items}
                onVolumePressed={onVolumePressed}
                activeItem={this.state.activeItem}
                lookType={lookType}
                onNumberPress={() => this.goToLikes(look)}
              />
            </View>
          </TouchableWithoutFeedback>
          {this._renderCommentsView(this.state.isCommentsActive)}
          {this._renderInformationView(this.state.isInformationActive)}
        </Animated.View>
        {!lookType ? this._renderBuyItButtons(look) : null}
        {this._renderMenuView(this.state.isMenuOpen)}
        { isPopupViewActive ? this._renderPopupItems() : null }
      </View>
    );
  }
}

export default withAnalytics(LookOverlay);
