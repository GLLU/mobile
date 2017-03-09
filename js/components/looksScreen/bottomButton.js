import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, TouchableHighlight} from 'react-native';
import * as _ from 'lodash'
import Icon from 'react-native-vector-icons/Entypo';
import styles from './styles';
import SocialShare from '../../lib/social';
import InformationButton from './buttons/InformationButton'
const likeImage = require('../../../images/like.png');
const likeClickedImage = require('../../../images/likeClicked.png');
const shareImage = require('../../../images/share.png');
const bubbleImage = require('../../../images/bubble.png');

export default class BottomButton extends Component {
  static propTypes = {
    likes: React.PropTypes.number,
    isLiked: React.PropTypes.bool,
    toggleLike: React.PropTypes.func,
    toggleMenu: React.PropTypes.func,
    hasDescription:React.PropTypes.bool,
    toggleDescription:React.PropTypes.func
  };

  static defaultProps = {
    toggleDescription:_.noop
  };

  constructor(props) {
    super(props);
    this._renderInformationButton=this._renderInformationButton.bind(this);
    this.state = {
      likes: this.props.likes,
      isLiked: this.props.isLiked
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.likes !== this.props.likes || nextProps.isLiked !== this.props.isLiked) {
      this.setState({likes: nextProps.likes, isLiked: nextProps.isLiked})
    }
  }


  _onLikeClicked() {
    const likes = !this.state.isLiked ? this.state.likes+1 : this.state.likes-1;
    this.setState({likes: likes, isLiked: !this.state.isLiked,
    });
    this.props.toggleLike(!this.state.isLiked)
  }

  _onBubbleClicked() {
    console.log('comments Button clicked');
  }

  _onShareClicked() {
    SocialShare.nativeShare();
  }

  _renderInformationButton(hasDescription){
    return hasDescription ?
      <InformationButton onPress={this.props.toggleDescription}/> :
      <View name="information button placeholder"></View>;
  }

  render() {
    return (
      <View style={styles.bottomContainer}>
        <View style={styles.bottomLeft}>
          <View style={styles.horizontalContainer}>
            <TouchableHighlight style={{marginRight: 10}} onPress={() => this._onLikeClicked()}>
              <View style={[styles.footerButton, {paddingLeft: 0}]}>
                <Image source={this.state.isLiked ? likeClickedImage : likeImage} style={{width: 40, height: 40,top: 2, resizeMode: 'stretch'}} />
                <Text style={styles.footerButtonText}>{this.state.likes}</Text>
              </View>
            </TouchableHighlight>
            { this._renderInformationButton(this.props.hasDescription) }
            <TouchableHighlight style={{marginRight: 10}} onPress={() => this._onBubbleClicked()}>
            <View style={[styles.footerButton, {width: 40}]}>
              <Image source={bubbleImage} style={{height: 25, width: 25, resizeMode: 'contain', right: 2}} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{marginRight: 10}} onPress={() => this._onShareClicked()}>
            <View style={[styles.footerButton, {width: 40}]}>
              <Image source={shareImage} style={{height: 25, width: 25, resizeMode: 'contain', right: 2}} />
            </View>
          </TouchableHighlight>
          </View>
        </View>
        <View style={[styles.bottomRight]}>
          <TouchableHighlight style={{marginRight: 10}} onPress={() => this.props.toggleMenu()}>
            <View>
              <View style={[styles.footerButton]}>
                <Icon active name='dots-three-horizontal'  style={styles.menuIcon}/>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
