import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import * as _ from 'lodash'
import InformationButton from './InformationButton'
import CommentsButton from './CommentsButton'
import ItemButton from './ItemButton'
import MenuButton from './MenuButton'
import LikeButton from './LikeButton'
import ItemDataLine from '../common/ItemDataLine'
import VideoItemLine from '../common/VideoItemLine'
import BaseComponent from '../../common/base/BaseComponent';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: 0,
    zIndex: 1,
    padding: 10,
    justifyContent: 'space-around',
  },
  rightContainer: {
    position: 'relative',
    right: 0,
    zIndex: 1,
    padding: 10,
  },
  leftContainer: {
    position: 'relative',
    right: 0,
    zIndex: 1,
    padding: 10,

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
    comments: React.PropTypes.number,
    likes: React.PropTypes.number,
    liked: React.PropTypes.bool,
    toggleLike: React.PropTypes.func,
    toggleMenu: React.PropTypes.func,
    hasDescription: React.PropTypes.bool,
    isDescriptionActive: React.PropTypes.bool,
    toggleDescription: React.PropTypes.func,
    isCommentsActive: React.PropTypes.bool,
    lookType: React.PropTypes.string,
    toggleComments: React.PropTypes.func,
    toggleItem: React.PropTypes.func,
    direction: React.PropTypes.oneOf(['row', 'column'])
  };

  static defaultProps = {
    toggleDescription: _.noop,
    toggleComments: _.noop,
    toggleItem: _.noop,
    direction: 'column'
  };

  constructor(props) {
    super(props);
    this._renderInformationButton = this._renderInformationButton.bind(this);
    this._onInformationClicked = this._onInformationClicked.bind(this);
    this._onBubbleClicked = this._onBubbleClicked.bind(this);
    this.handleTextLayout = this.handleTextLayout.bind(this);
    this._onMenuClicked = this._onMenuClicked.bind(this);
    this.state = {
      itemY: 0,
      itemLineOpen: false
    }
  }

  _onInformationClicked() {
    this.logEvent('LookScreen', {name: 'Information click'});
    this.props.toggleDescription(...arguments)
  }

  _onBubbleClicked() {
    this.logEvent('LookScreen', {name: 'Comment click'});
    this.props.toggleComments(...arguments);
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

  handleTextLayout(evt){
    this.setState({itemY: evt.nativeEvent.layout.y})
  }

  renderVideoItems() {
    return _.map(this.props.items, item => {
      return item.category && item.brand ? (
        <VideoItemLine key={item.id} item={item} toggleItem={this.props.toggleItem}/>
      ) : null;
    });
  }

  render() {
    const{direction}=this.props;
    const{lookType,  hasDescription}=this.props;
    const{comments, isCommentsActive}=this.props;
    const {likes, liked, toggleLike, onNumberPress} = this.props;
    return (
      <View style={[styles.container, styles['row']]}>
        <View style={[styles.rightContainer, styles[direction]]}>
          { lookType === 'video' ? this.renderVideoItems() : null }
          <LikeButton liked={liked} likes={likes} onIconPress={toggleLike} onNumberPress={onNumberPress}/>
          <CommentsButton count={comments} isActive={isCommentsActive} onPress={this._onBubbleClicked}/>
          { this._renderInformationButton(hasDescription) }
          <MenuButton onPress={() => this._onMenuClicked()}/>
        </View>
      </View>
    )
  }
}
