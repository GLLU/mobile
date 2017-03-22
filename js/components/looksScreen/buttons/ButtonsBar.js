import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Platform
} from 'react-native';
import * as _ from 'lodash'
import SocialShare from '../../../lib/social';
import InformationButton from './InformationButton'
import CommentsButton from './CommentsButton'
import ShareButton from './ShareButton'
import MenuButton from './MenuButton'
import LikeButton from './LikeButton'
import BaseComponent from '../../common/BaseComponent';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 70,
    right: 0,
    zIndex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  }
});

export default class ButtonsBar extends BaseComponent {
  static propTypes = {
    likes: React.PropTypes.number,
    isLiked: React.PropTypes.bool,
    toggleLike: React.PropTypes.func,
    toggleMenu: React.PropTypes.func,
    hasDescription: React.PropTypes.bool,
    isDescriptionActive: React.PropTypes.bool,
    toggleDescription: React.PropTypes.func,
    isCommentsActive: React.PropTypes.bool,
    toggleComments: React.PropTypes.func,
    direction: React.PropTypes.oneOf(['row', 'column'])
  };

  static defaultProps = {
    toggleDescription: _.noop,
    toggleComments: _.noop,
    direction: 'column'
  };

  constructor(props) {
    super(props);
    this._renderInformationButton = this._renderInformationButton.bind(this);
    this._onInformationClicked = this._onInformationClicked.bind(this);
    this._onBubbleClicked = this._onBubbleClicked.bind(this);
    this.state = {
      likes: this.props.likes,
      isLiked: this.props.isLiked
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.likes !== this.props.likes || nextProps.isLiked !== this.props.isLiked) {
      this.setState({likes: nextProps.likes, isLiked: nextProps.isLiked})
    }
  }


  _onLikeClicked() {
    const likes = !this.state.isLiked ? this.state.likes + 1 : this.state.likes - 1;
    this.setState({
      likes: likes, isLiked: !this.state.isLiked,
    });
    this.props.toggleLike(!this.state.isLiked)
  }

  _onInformationClicked() {
    this.logEvent('LookScreen', {name: 'Information click'});
    this.props.toggleDescription(...arguments)
  }

  _onBubbleClicked() {
    this.logEvent('LookScreen', {name: 'Comment click'});
    this.props.toggleComments(...arguments);
  }

  _onShareClicked() {
    this.logEvent('LookScreen', {name: 'Share click'});
    SocialShare.nativeShare();
  }

  _onMenuClicked() {
    this.logEvent('LookScreen', {name: 'Menu click'});
    this.props.toggleMenu();
  }

  _renderInformationButton(hasDescription) {
    if (hasDescription) {
      return <InformationButton isActive={this.props.isDescriptionActive} onPress={this._onInformationClicked}/>
    }
  }

  render() {
    return (
      <View style={[styles.container, styles[this.props.direction]]}>
        <LikeButton isLiked={this.state.isLiked} likes={this.state.likes} onPress={() => this._onLikeClicked()}/>
        { this._renderInformationButton(this.props.hasDescription) }
        <CommentsButton isActive={this.props.isCommentsActive} onPress={this._onBubbleClicked}/>
        <ShareButton onPress={() => this._onShareClicked()}/>
        <MenuButton onPress={() => this._onMenuClicked()}/>
      </View>
    )
  }
}
