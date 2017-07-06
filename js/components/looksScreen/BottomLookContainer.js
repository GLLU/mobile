import React, { Component } from 'react';
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
import DescriptionView from './DescriptionView'
import CommentsView from './comments/CommentsView'
import BaseComponent from '../common/base/BaseComponent';
import LookHeader from './LookHeader'
import MenuView from "./MenuView";
import { formatInvitationMessage } from "../../lib/messages/index";
import withAnalytics from '../common/analytics/WithAnalytics'


class BottomLookContainer extends BaseComponent {

  static propTypes = {
    look: React.PropTypes.object,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    isMenuOpen: React.PropTypes.bool,
    goBack: React.PropTypes.func,
    goToProfile: React.PropTypes.func,
    toggleLike: React.PropTypes.func,
    reportAbuse: React.PropTypes.func,
    onBottomDrawerOpen: React.PropTypes.func,
  };

  static defaultProps = {
    goBack: _.noop,
    goToProfile: _.noop,
    toggleLike: _.noop,
    reportAbuse: _.noop,
    onBottomDrawerOpen: _.noop,
  };

  constructor(props) {
    super(props);
    this._toggleDescription = this._toggleDescription.bind(this);
    this._toggleComments = this._toggleComments.bind(this);
    this._toggleMenuView = this._toggleMenuView.bind(this);
    this._toggleItem = this._toggleItem.bind(this);
    this.goToProfile=this.goToProfile.bind(this);
    this.goToEdit=this.goToEdit.bind(this);
    this.onShareClicked = this.onShareClicked.bind(this);
    const {look} = this.props;
    this.state = {
      comments: look.comments || 0,
      isDescriptionActive: false,
      isCommentsActive: props.openComments,
      activeItem: '',
      fadeAnimContent: new Animated.Value(0),
      isMenuOpen: false,
      fadeAnimContentOnPress: new Animated.Value(1)
    }
  }

  _renderBuyItButtons(look) {
    const {width, height} = this.props;
    return look.items.map((item, index) =>
      <ItemMarker
        key={index}
        item={item}
        containerDimensions={{width:width,height:height}}
        pinPosition={{y: item.cover_y_pos, x: item.cover_x_pos}}/>
    );
  }

  _toggleDescription(shouldActive) {
    this.props.onBottomDrawerOpen(shouldActive);
    this.setState({isDescriptionActive: shouldActive, isCommentsActive: false})
  }

  _toggleMenuView(){
    const shouldActive = !this.state.isMenuOpen;
    this.logEvent('LookScreen', {name: `Menu View ${shouldActive?'visible':'hidden'}`});
    this.props.onBottomDrawerOpen(shouldActive);
    this.setState({isMenuOpen: shouldActive, isDescriptionActive: false, isCommentsActive: false})
  }

  onShareClicked() {
    this.props.logEvent('LookScreen', {name: 'Share clicked'});
    const message = SocialShare.generateShareMessage(formatInvitationMessage(this.props.shareToken));
    SocialShare.nativeShare(message);
  }

  _renderMenuView(isActive) {
    const {look} = this.props;
    return(
      <MenuView
        look_id={look.id}
        isMyLook={look.user.is_me}
        isOpen={isActive}
        onRequestClose={this._toggleMenuView}
        onEditPress={()=>this.goToEdit(look)}
        onShareClicked={this.onShareClicked}
        shareToken={this.props.shareToken}/>);
  }

  _renderDescriptionView(isActive) {
    const {look} = this.props;
    return <DescriptionView
      isOpen={isActive}
      description={look.description}
      onRequestClose={this._toggleDescription}
    />;
  }

  _renderCommentsView(isActive) {
    const {look} = this.props;
    return <CommentsView
      goToProfile={this.goToProfile}
      look_id={look.id}
      count={this.state.comments}
      isOpen={isActive}
      onRequestClose={this._toggleComments}/>
  }

  _toggleComments(shouldActive) {
    this.logEvent('LookScreen', {name: `Comments View ${shouldActive?'visible':'hidden'}`});
    this.props.onBottomDrawerOpen(shouldActive);
    this.setState({isCommentsActive: shouldActive, isDescriptionActive: false})
  }

  _toggleItem(shouldActive) {
    this.props.onBottomDrawerOpen(shouldActive);
  }

  goToProfile(user){
    this.props.goToProfile(user);
    this.setState({isCommentsActive: false, isDescriptionActive: false, isMenuOpen: false})
  }

  goToEdit(look){
    this.props.goToEdit(look);
    this.setState({isCommentsActive: false, isDescriptionActive: false, isMenuOpen: false})
  }

  toggleBottomContainer() {
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
    const {look} = this.props;
    Animated.timing(          // Uses easing functions
      this.state.fadeAnimContent,    // The value to drive
      {
        toValue: 1,
        delay: 250
      }            // Configuration
    ).start();
    return (
      <View style={{marginTop: 0}}>
        <LookHeader
          avatar={{uri: look.avatar.url}}
          onBackNavigationPress={this.props.goBack}
          onProfileAvatarPress={() => this.goToProfile(look)}/>
        <Animated.View style={{opacity: this.state.fadeAnimContentOnPress}}>
          <TouchableWithoutFeedback onPress={() => this.toggleBottomContainer()}>
            <View style={[styles.lookInfo, {flexGrow: 1, flexDirection: 'column'}]}>
              <ButtonsBar
                isCommentsActive={this.state.isCommentsActive}
                toggleComments={this._toggleComments}
                toggleItem={this._toggleItem}
                hasDescription={!_.isEmpty(look.description)}
                isDescriptionActive={this.state.isDescriptionActive}
                toggleDescription={this._toggleDescription}
                liked={look.liked}
                likes={look.likes}
                comments={look.comments}
                toggleLike={this.props.toggleLike}
                toggleMenu={() => this._toggleMenuView()}
                items={look.items}
                activeItem={this.state.activeItem}
                lookType={this.props.lookType}
                onNumberPress={this.props.onLikesNumberPress}
              />
            </View>
          </TouchableWithoutFeedback>
          {this._renderCommentsView(this.state.isCommentsActive)}
          {this._renderDescriptionView(this.state.isDescriptionActive)}
        </Animated.View>
        { !this.props.lookType ? this._renderBuyItButtons(look) : null}
        {this._renderMenuView(this.state.isMenuOpen)}
      </View>
    )
  }
}

export default withAnalytics(BottomLookContainer);