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
import ItemMarkerWithView from './markers/ItemMarkerWithView';
import DescriptionView from './DescriptionView'
import CommentsView from './comments/CommentsView'
import BaseComponent from '../common/BaseComponent';
import LookHeader from './LookHeader'


export default class BottomLookContainer extends BaseComponent {

  static propTypes = {
    look: React.PropTypes.object,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    isMenuOpen: React.PropTypes.bool,
    tempPopRoute: React.PropTypes.func,
    goToProfile: React.PropTypes.func,
    toggleLike: React.PropTypes.func,
    toggleMenu: React.PropTypes.func,
    reportAbuse: React.PropTypes.func,
    onBottomDrawerOpen: React.PropTypes.func,
  };

  static defaultProps = {
    tempPopRoute: _.noop,
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
    this.state = {
      likes: this.props.look.likes,
      isLiked: this.props.look.liked,
      comments: this.props.look.comments || 0,
      isDescriptionActive: false,
      isCommentsActive: false,
      fadeAnimContent: new Animated.Value(0),
      isMenuOpen: false,
      fadeAnimContentOnPress: new Animated.Value(1)
    }
  }

  _renderBuyItButtons(look) {
    const {width, height} = this.props;
    return look.items.map((item, index) =>
      <ItemMarkerWithView
        key={index}
        item={item}
        containerWidth={width}
        containerHeight={height}
        pinPositionTop={item.cover_y_pos}
        pinPositionLeft={item.cover_x_pos}/>
    );
  }

  _toggleDescription(shouldActive) {
    this.props.onBottomDrawerOpen(shouldActive);
    this.setState({isDescriptionActive: shouldActive, isCommentsActive: false})
  }

  handleLikePress(isLiked) {
    this.logEvent('LookScreen', {name: 'Like click', liked: `${isLiked}`});
    this.props.toggleLike(isLiked)
  }

  _toggleMenu() {
    this.setState({isMenuOpen: !this.state.isMenuOpen})
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
      look_id={this.props.look.id}
      count={this.state.comments}
      isOpen={isActive}
      onRequestClose={this._toggleComments}/>
  }

  _toggleComments(shouldActive) {
    this.props.onBottomDrawerOpen(shouldActive);
    this.setState({isCommentsActive: shouldActive, isDescriptionActive: false})
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
          onBackNavigationPress={this.props.tempPopRoute}
          onProfileAvatarPress={() => this.props.goToProfile(this.props.look)}/>
        <Animated.View style={{opacity: this.state.fadeAnimContentOnPress}}>
          <TouchableWithoutFeedback onPress={() => this.toggleBottomContainer()}>
            <View style={[styles.lookInfo, {flexGrow: 1, flexDirection: 'column'}]}>
              <ButtonsBar
                isCommentsActive={this.state.isCommentsActive}
                toggleComments={this._toggleComments}
                hasDescription={!_.isEmpty(this.props.look.description)}
                isDescriptionActive={this.state.isDescriptionActive}
                toggleDescription={this._toggleDescription}
                isLiked={this.state.isLiked}
                likes={this.state.likes}
                toggleLike={this.handleLikePress.bind(this)}
                toggleMenu={() => this._toggleMenu()}/>
            </View>
          </TouchableWithoutFeedback>
          {this._renderCommentsView(this.state.isCommentsActive)}
          {this._renderDescriptionView(this.state.isDescriptionActive)}
        </Animated.View>
        {this._renderBuyItButtons(this.props.look)}
        <MenuModal isMenuOpen={this.state.isMenuOpen} reportAbuse={(lookId) => this.props.reportAbuse(lookId)}
                   closeModal={() => this._toggleMenu()}/>
      </View>
    )
  }
}
