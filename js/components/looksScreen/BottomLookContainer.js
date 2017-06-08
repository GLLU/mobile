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
import _ from 'lodash'
import styles from './styles';
import ButtonsBar from './buttons/ButtonsBar';
import MenuModal from './menuModal';
import ItemMarker from './markers/ItemMarker';
import DescriptionView from './DescriptionView'
import CommentsView from './comments/CommentsView'
import BaseComponent from '../common/base/BaseComponent';
import LookHeader from './LookHeader'


export default class BottomLookContainer extends BaseComponent {

  static propTypes = {
    look: React.PropTypes.object,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    isMenuOpen: React.PropTypes.bool,
    goBack: React.PropTypes.func,
    goToProfile: React.PropTypes.func,
    toggleLike: React.PropTypes.func,
    toggleMenu: React.PropTypes.func,
    reportAbuse: React.PropTypes.func,
    onBottomDrawerOpen: React.PropTypes.func,
  };

  static defaultProps = {
    goBack: _.noop,
    goToProfile: _.noop,
    toggleLike: _.noop,
    toggleMenu: _.noop,
    reportAbuse: _.noop,
    onBottomDrawerOpen: _.noop,
  };

  constructor(props) {
    super(props);
    this._toggleDescription = this._toggleDescription.bind(this);
    this._toggleComments = this._toggleComments.bind(this);
    this._toggleItem = this._toggleItem.bind(this);
    this.goToProfile=this.goToProfile.bind(this);
    this.state = {
      likes: this.props.look.likes,
      isLiked: this.props.look.liked,
      comments: this.props.look.comments || 0,
      isDescriptionActive: false,
      isCommentsActive: false,
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

  _toggleMenu() {
    const shouldActive = !this.state.isMenuOpen;
    this.logEvent('LookScreen', {name: `Report & Share Menu ${shouldActive?'visible':'hidden'}`});
    this.setState({isMenuOpen: shouldActive})
  }

  _renderDescriptionView(isActive) {
    return <DescriptionView
      isOpen={isActive}
      description={this.props.look.description}
      onRequestClose={this._toggleDescription}
    />;
  }

  _renderCommentsView(isActive) {
    return <CommentsView
      goToProfile={this.goToProfile}
      look_id={this.props.look.id}
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
    this.setState({isCommentsActive: false, isDescriptionActive: false})
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
          avatar={{uri: this.props.look.avatar.url}}
          onBackNavigationPress={this.props.goBack}
          onProfileAvatarPress={() => this.goToProfile(this.props.look)}/>
        <Animated.View style={{opacity: this.state.fadeAnimContentOnPress}}>
          <TouchableWithoutFeedback onPress={() => this.toggleBottomContainer()}>
            <View style={[styles.lookInfo, {flexGrow: 1, flexDirection: 'column'}]}>
              <ButtonsBar
                isCommentsActive={this.state.isCommentsActive}
                toggleComments={this._toggleComments}
                toggleItem={this._toggleItem}
                hasDescription={!_.isEmpty(this.props.look.description)}
                isDescriptionActive={this.state.isDescriptionActive}
                toggleDescription={this._toggleDescription}
                isLiked={this.state.isLiked}
                likes={this.state.likes}
                toggleLike={this.props.toggleLike}
                toggleMenu={() => this._toggleMenu()}
                items={this.props.look.items}
                activeItem={this.state.activeItem}
                lookType={this.props.lookType}
                onNumberPress={this.props.onLikesNumberPress}
              />
            </View>
          </TouchableWithoutFeedback>
          {this._renderCommentsView(this.state.isCommentsActive)}
          {this._renderDescriptionView(this.state.isDescriptionActive)}
        </Animated.View>
        { !this.props.lookType ? this._renderBuyItButtons(this.props.look) : null}
        <MenuModal isMenuOpen={this.state.isMenuOpen} reportAbuse={(lookId) => this.props.reportAbuse(lookId)}
                   closeModal={() => this._toggleMenu()}
                   shareToken={this.props.shareToken}/>
      </View>
    )
  }
}
