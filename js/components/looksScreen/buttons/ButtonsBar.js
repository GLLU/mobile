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
    likes: React.PropTypes.number,
    isLiked: React.PropTypes.bool,
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
    this._onItemClick = this._onItemClick.bind(this);
    this.handleTextLayout = this.handleTextLayout.bind(this);
    this.state = {
      likes: this.props.likes,
      isLiked: this.props.isLiked,
      itemY: 0,
      itemLineOpen: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.likes !== this.props.likes || nextProps.isLiked !== this.props.isLiked) {
      this.setState({likes: nextProps.likes, isLiked: nextProps.isLiked})
    }
  }


  _onLikeClicked(isLiked) {
    this.props.toggleLike(isLiked)
  }

  _onInformationClicked() {
    this.logEvent('LookScreen', {name: 'Information click'});
    this.props.toggleDescription(...arguments)
  }

  _onBubbleClicked() {
    this.logEvent('LookScreen', {name: 'Comment click'});
    this.props.toggleComments(...arguments);
  }

  _onItemClick() {
    this.props.toggleItem(...arguments);
    this.setState({itemLineOpen: !this.state.itemLineOpen})
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

  renderItemVideoDataLine() {
    return (
      <View style={[styles.leftContainer, styles[this.props.direction]]}>
        <ItemDataLine isOpen={this.state.itemLineOpen} itemY={this.state.itemY} data={this.props.items[0]}/>
      </View>
    )
  }

  renderItemButton() {
   return _.map(this.props.items, item => {
      if(item.category && item.brand) {
        return (
          <View key={item.id} onLayout={this.handleTextLayout}>
            <ItemButton isActive={this.state.itemLineOpen} onPress={(y) => this._onItemClick(y)} category={this.props.items[0].category.name}/>
          </View>
        )
      }
    });


  }

  render() {
    return (
    <View style={[styles.container, styles['row']]}>
      { this.props.lookType === 'video' ? this.renderItemVideoDataLine() : null }
      <View style={[styles.rightContainer, styles[this.props.direction]]} >
        { this.props.lookType === 'video' ? this.renderItemButton() : null }
        <LikeButton isLiked={this.state.isLiked} likes={this.state.likes} onIconPress={this.props.toggleLike} onNumberPress={this.props.onNumberPress} />
        { this._renderInformationButton(this.props.hasDescription) }
        <CommentsButton isActive={this.props.isCommentsActive} onPress={this._onBubbleClicked}/>
        <MenuButton onPress={() => this._onMenuClicked()}/>
      </View>
    </View>
    )
  }
}
