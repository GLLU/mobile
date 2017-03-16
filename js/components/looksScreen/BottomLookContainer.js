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
import { Icon } from 'native-base';
import _ from 'lodash'
import styles from './styles';
import BottomButton from './bottomButton';
import TopButton from './topButton';
import MenuModal from './menuModal';
import BuyItButton from './buyItButton';
import DescriptionView from './DescriptionView'
import CommentsView from './comments/CommentsView'
import BaseComponent from '../common/BaseComponent';

export default class BottomLookContainer extends BaseComponent {
  static propTypes = {
    look: React.PropTypes.object,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    tempPopRoute: React.PropTypes.func,
    goToProfile: React.PropTypes.func,
    toggleLike: React.PropTypes.func,
    toggleMenu: React.PropTypes.func,
    reportAbuse: React.PropTypes.func,
    isMenuOpen: React.PropTypes.bool,
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
    return look.items.map((item, index) => {
      const title = item.brand ? item.brand.name : 'N/A';
      return (
        <BuyItButton
          key={index}
          title={title}
          price={item.price}
          width={width}
          height={height}
          positionTop={item.cover_y_pos}
          positionLeft={item.cover_x_pos}
          url={item.url}/>
      )
    });
  }

  _toggleDescription(shouldActive) {
    this.setState({isDescriptionActive: shouldActive, isCommentsActive: false})
  }

  handleLikePress(isLiked) {
    this.logEvent('LookScreen', {name: 'Like click', liked: isLiked});
    this.props.toggleLike(isLiked)
  }

  _toggleMenu() {
    this.setState({isMenuOpen: !this.state.isMenuOpen})
  }

  _renderDescriptionView(isActive) {
    return <DescriptionView
      isHidden={!isActive}
      style={styles.bottomDrawerView}
      description={this.props.look.description}/>;
  }

  _renderCommentsView(isActive) {
    return <CommentsView
      look_id={this.props.look.id}
      count={this.state.comments}
      isHidden={!isActive}
      style={styles.bottomDrawerView}/>
  }

  _toggleComments(shouldActive) {
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
    const avatar = {};
    avatar.imageUri = this.props.look.avatar.url;
    avatar.bodyType = this.props.look.type;
    return (
      <Animated.View style={{opacity: this.state.fadeAnimContent}}>
        <TouchableOpacity
          transparent
          style={{zIndex: 99999, top: 10, left: 10, padding: 5, width: 30, backgroundColor: 'transparent' }}
          onPress={() => this.props.tempPopRoute()}
        >
          <Icon
            style={{color: 'black'}}
            name="ios-arrow-back"/>
        </TouchableOpacity>
        <Animated.View style={{opacity: this.state.fadeAnimContentOnPress}}>
          <TouchableWithoutFeedback onPress={() => this.toggleBottomContainer()}>
            <View style={[styles.lookInfo,{flexGrow: 1, flexDirection: 'column',marginTop: 40}]}>
              <TopButton avatar={avatar} onPress={() => this.props.goToProfile(this.props.look)}/>
              {this._renderCommentsView(this.state.isCommentsActive)}
              {this._renderDescriptionView(this.state.isDescriptionActive)}
              <BottomButton
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
          {this._renderBuyItButtons(this.props.look)}
          <MenuModal isMenuOpen={this.state.isMenuOpen} reportAbuse={(lookId) => this.props.reportAbuse(lookId)}
                     closeModal={() => this._toggleMenu()}/>
        </Animated.View>
      </Animated.View>
    )
  }
}
