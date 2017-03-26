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
import BaseComponent from '../../common/BaseComponent';

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

  _onItemClick() {
    console.log('props',this.props)
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
    console.log('layout ',evt.nativeEvent.layout);
    this.setState({itemY: evt.nativeEvent.layout.y})
  }

  render() {
    return (
    <View style={[styles.container, styles['row']]}>
      <View style={[styles.leftContainer, styles[this.props.direction]]}>
        <ItemDataLine isOpen={this.state.itemLineOpen} onPress={() => this._onLikeClicked()}  itemY={this.state.itemY} data={this.props.items[0]}/>
      </View>
      <View style={[styles.rightContainer, styles[this.props.direction]]} >
        <LikeButton isLiked={this.state.isLiked} likes={this.state.likes} onPress={() => this._onLikeClicked()} />
        { this._renderInformationButton(this.props.hasDescription) }
        <View onLayout={this.handleTextLayout}>
          <ItemButton isActive={this.state.itemLineOpen} onPress={(y) => this._onItemClick(y)} category={this.props.items[0].category.name}/>
        </View>
        <CommentsButton isActive={this.props.isCommentsActive} onPress={this._onBubbleClicked}/>
        <MenuButton onPress={() => this._onMenuClicked()}/>
      </View>
    </View>
    )
  }
}
