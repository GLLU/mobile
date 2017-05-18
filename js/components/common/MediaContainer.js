import React from 'react';
import { StyleSheet, TextInput, Text, Platform, Dimensions, TouchableOpacity, Image, View } from 'react-native';
import BaseComponent from '../common/BaseComponent';
import FontSizeCalculator from './../../calculators/FontSize';
import Video from 'react-native-video';
import LikeView from '../feedscreen/items/LikeView';
import VolumeButton from './VolumeButton';
import MediaBorderPatch from './MediaBorderPatch'
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Utils from '../../Utils';
import shdowBg from '../../../images/background-shadow-70p.png';
const deviceHeight = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT')

class MediaContainer extends BaseComponent {
  static propTypes = {
    handleSearchInput: React.PropTypes.func,
    clearText: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      currLookPosition: -1,
      shouldPlay: true,
      isMuted: true
    }
    this.bgColor = Utils.getLoaderImage()
  }

  _handleItemPress(item) {
    this.logEvent('Feedscreen', {name: 'Image click'});
    let that = this
    if(Platform.OS === 'ios') { // On android we use interactionManager, on ios we dont need to, we let the TouchableOpacity end. and then go to next page.
      setTimeout(function(){ that.props.navigateTo('looksScreen', 'feedscreen', item); }, 200);
    } else {
      this.props.navigateTo('looksScreen', 'feedscreen', item);
    }
    this.setState({isMuted: true})
  }

  renderVideo(video) {
    //let  ShouldShowLookImage = this.props.currScroll < this.state.currLookPosition+deviceHeight && this.props.currScroll > this.state.currLookPosition-deviceHeight
    return (
      <View style={{height: video.height,width: video.width, overflow: 'hidden', borderRadius: 10, backgroundColor: this.bgColor}}>

        <Video source={{uri: video.uri, mainVer: 1, patchVer: 0}}
               resizeMode={'stretch'}
               muted={this.state.isMuted}
               style={{width: video.width, height: video.height, backgroundColor: this.bgColor, overflow:'hidden', borderRadius: 10}}
               repeat={true}
               paused={this.state.shouldPlay}
        />

        <MediaBorderPatch media={video}>
          <View style={{bottom: 15}}>
            {video.coverType === 'video' ? this.renderVideoGrid(video) : null}
          </View>
        </MediaBorderPatch>
      </View>
    )
  }

  renderImage(look, index) {
     //let  ShouldShowLookImage = this.props.currScroll < this.state.currLookPosition+deviceHeight*2 && this.props.currScroll > this.state.currLookPosition-deviceHeight*2
      return (
      <View>
        <Image source={{uri: look.uri}} style={{width: look.width, height: look.height, resizeMode: 'stretch', backgroundColor: this.bgColor, borderRadius: 10}} />
        <MediaBorderPatch media={look} >
          <View style={{bottom: 15, zIndex: 1}}>
            <LikeView index={index} item={look} onPress={this.toggleLikeAction.bind(this)}/>
          </View>
        </MediaBorderPatch>
      </View>
      )
  }

  toggleLikeAction(item, isLiked) {
    this.logEvent('Feedscreen', {name: 'Like Image click'});
    if (isLiked) {
      let data = {id: item.id, likes: item.likes + 1, liked: true}
      this.props.likeUpdate(data);
    } else {
      let data = {id: item.id, likes: item.likes - 1, liked: false}
      this.props.unLikeUpdate(data);
    }
  }

  setLookPosition(e) {
      this.setState({currLookPosition: e.nativeEvent.layout.y})
  }

  _togglePlaySoundAction() {
    this.setState({isMuted: !this.state.isMuted})
  }

  renderVideoGrid(look) {

    return(
      <View style={{flexDirection: 'row', justifyContent:'space-between', zIndex: 1}}>
        <LikeView item={look} onPress={this.toggleLikeAction.bind(this)}/>
        <VolumeButton look={look} isMuted={this.state.isMuted} togglePlaySoundAction={() => this._togglePlaySoundAction()}/>
      </View>
    )
  }

  render() {
    const { look, index } = this.props
    return(
      <View style={{ borderRadius: 100}} onLayout={(e) => this.setLookPosition(e)}>
        <TouchableOpacity onPress={(e) => this._handleItemPress(look)} >
          {look.coverType === 'video' ? this.renderVideo(look) : this.renderImage(look, index)}
        </TouchableOpacity>
      </View>
    )
  }
}

export default MediaContainer;
