// @flow

import React, {Component} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
import * as _ from 'lodash'
import styles from './styles';
import ButtonsBar from './buttons/ButtonsBar';
import SocialShare from '../../lib/social';
import ItemMarker from './markers/ItemMarker';
import InformationView from './information/InformationView'
import CommentsView from './comments/CommentsView'
import LookHeader from './LookHeader'
import MenuView from "./menu/MenuViewContainer";
import {formatInvitationMessage} from "../../lib/messages/index";
import withAnalytics from '../common/analytics/WithAnalytics'

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
}

class LookOverlay extends Component {

  props: Props;

  static defaultProps = {
    goBack: _.noop,
    goToProfile: _.noop,
    toggleLike: _.noop,
    reportAbuse: _.noop,
    onBottomDrawerOpen: _.noop
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
    const { look } = this.props;
    this.state = {
      comments: look.comments || 0,
      isInformationActive: false,
      isCommentsActive: props.openComments,
      activeItem: '',
      fadeAnimContent: new Animated.Value(0),
      isMenuOpen: false,
      fadeAnimContentOnPress: new Animated.Value(1)
    }
  }

  _renderBuyItButtons(look: object) {
    const { width, height } = this.props;
    return look.items.map((item, index) =>
      <ItemMarker
        key={index}
        item={item}
        onPress={this.props.onInvalidItemPressed}
        containerDimensions={{ width: width, height: height }}
        pinPosition={{ y: item.cover_y_pos, x: item.cover_x_pos }}/>
    );
  }

  _toggleComments(shouldActive: boolean) {
    const { onBottomDrawerOpen, logEvent } = this.props;
    logEvent('LookScreen', { name: `Comments View ${shouldActive ? 'visible' : 'hidden'}` });
    onBottomDrawerOpen(shouldActive);
    this.setState({ isCommentsActive: shouldActive, isInformationActive: false, isMenuOpen: false })
  }

  _toggleInformation(shouldActive: boolean) {
    const { onBottomDrawerOpen, logEvent } = this.props;
    logEvent('LookScreen', { name: `Information View ${shouldActive ? 'visible' : 'hidden'}` });
    onBottomDrawerOpen(shouldActive);
    this.setState({ isInformationActive: shouldActive, isCommentsActive: false, isMenuOpen: false })
  }

  _toggleMenuView() {
    const { onBottomDrawerOpen, logEvent } = this.props;
    const shouldActive = !this.state.isMenuOpen;
    logEvent('LookScreen', { name: `Menu View ${shouldActive ? 'visible' : 'hidden'}` });
    onBottomDrawerOpen(shouldActive);
    this.setState({ isMenuOpen: shouldActive, isInformationActive: false, isCommentsActive: false })
  }

  _onShareClicked() {
    const { logEvent, look } = this.props;
    logEvent('LookScreen', { name: 'Share clicked' });
    const message = SocialShare.generateShareLookMessage(look.id);
    SocialShare.nativeShare(message);
  }

  _renderMenuView(isActive: boolean) {
    const { look } = this.props;
    return (
      <MenuView
        lookId={look.id}
        userId={look.userId}
        isMyLook={look.isMe}
        isOpen={isActive}
        onRequestClose={this._toggleMenuView}
        onEditPress={() => this.goToEdit(look)}
        onShareClicked={this._onShareClicked}/>);
  }

  _renderInformationView(isActive: boolean) {
    const { look } = this.props;
    return <InformationView
      isOpen={isActive}
      description={look.description}
      items={look.items}
      likes={look.likes}
      comments={look.comments}
      onCommentsPress={this._toggleComments}
      onLikesPress={() => this.goToLikes(look)}
      onRequestClose={this._toggleInformation}
    />;
  }

  _renderCommentsView(isActive: boolean) {
    const { look } = this.props;
    return <CommentsView
      goToProfile={this.goToProfile}
      look_id={look.id}
      count={this.state.comments}
      isOpen={isActive}
      onRequestClose={this._toggleComments}/>
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
    this.setState({ isCommentsActive: false, isInformationActive: false, isMenuOpen: false })
  }

  _toggleBottomContainer() {
    if (this.state.fadeAnimContentOnPress._value === 1) {
      Animated.timing(          // Uses easing functions
        this.state.fadeAnimContentOnPress,    // The value to drive
        {
          toValue: 0,
          delay: 250
        }            // Configuration
      ).start();
    } else {
      Animated.timing(          // Uses easing functions
        this.state.fadeAnimContentOnPress,    // The value to drive
        {
          toValue: 1,
          delay: 250
        }            // Configuration
      ).start();
    }
  }

  render() {
    const { look, lookType, toggleLike, toggleFavorite, goBack } = this.props;
    Animated.timing(          // Uses easing functions
      this.state.fadeAnimContent,    // The value to drive
      {
        toValue: 1,
        delay: 250
      }            // Configuration
    ).start();
    return (
      <View style={{ marginTop: 0 }}>
        <LookHeader
          avatar={{ uri: look.avatar.url }}
          onBackNavigationPress={goBack}
          onProfileAvatarPress={() => this.goToProfile(look)}/>
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
                comments={look.comments}
                toggleLike={toggleLike}
                toggleFavorite={toggleFavorite}
                toggleMenu={() => this._toggleMenuView()}
                items={look.items}
                activeItem={this.state.activeItem}
                lookType={lookType}
                onNumberPress={() => this.goToLikes(look)}
              />
            </View>
          </TouchableWithoutFeedback>
          {this._renderCommentsView(this.state.isCommentsActive)}
          {this._renderInformationView(this.state.isInformationActive)}
        </Animated.View>
        { !lookType ? this._renderBuyItButtons(look) : null}
        {this._renderMenuView(this.state.isMenuOpen)}
      </View>
    )
  }
}

export default withAnalytics(LookOverlay);