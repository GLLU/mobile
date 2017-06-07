import React from 'react';
import { StyleSheet, TextInput, Text, Platform, Dimensions, TouchableOpacity, Image, View } from 'react-native';
import BaseComponent from './base/BaseComponent';
import LikeView from '../feedscreen/items/LikeView';
import VolumeButton from './VolumeButton';
import MediaBorderPatch from './MediaBorderPatch'
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Utils from '../../utils';
import VideoWithCaching from "./media/VideoWithCaching";
const deviceHeight = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT')

const styles = StyleSheet.create({
  videoGridIos: {
    bottom: 15,
    left: 3,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  videoGridAndroid: {
    flexDirection: 'row',
    justifyContent:'space-between',
    zIndex: 1
  },
});

const likeSentences = ["Wow, it will look amazing on you!", 'Nice Look, she looks poppy!', 'I liked it also, pretty nice!', 'That girl is on fire!', 'Very nice! can look perfect on you!']

class MediaContainer extends BaseComponent {
  static propTypes = {
    handleSearchInput: React.PropTypes.func,
    clearText: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      currLookPosition: -1,
      shouldPlay: false,
      isMuted: true,
      backgroundColor:Utils.getLoaderImage()
    }
  }

  _handleItemPress(item) {
    this.logEvent('Feedscreen', {name: 'Image click'});
    let that = this
    if(Platform.OS === 'ios') { // On android we use interactionManager, on ios we dont need to, we let the TouchableOpacity end. and then go to next page.
      setTimeout(()=>that.props.navigateTo('looksScreen', item), 200);
    } else {
      this.props.navigateTo('looksScreen', item);
    }
    this.setState({isMuted: true})
  }


  toggleLikeAction(item, isLiked) {
    this.logEvent('Feedscreen', {name: 'Like Image click'});
    if (isLiked) {
      let data = {id: item.id, likes: item.likes + 1, liked: true}
      let msg = likeSentences[Math.floor(Math.random()*likeSentences.length)];
      this.props.sendParisMessage(msg);
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

  _onLikesNumberPress() {
    this.props.navigateTo('likesscreen', {lookId: this.props.look.id, count: this.props.look.likes});
  }

  renderVideo(video) {
    //let  ShouldShowLookImage = this.props.currScroll < this.state.currLookPosition+deviceHeight && this.props.currScroll > this.state.currLookPosition-deviceHeight
    if(Platform.OS === 'ios') {
      return (
        <View style={{height: video.height,width: video.width-6,  overflow: 'hidden', borderRadius: 10,  alignSelf: 'center', marginBottom: 3, marginTop: 3}}>
          <VideoWithCaching source={{uri: video.uri, mainVer: 1, patchVer: 0}}
                 resizeMode={'stretch'}
                 muted={this.state.isMuted}
                 style={{width: video.width, height: video.height, overflow:'hidden'}}
                 repeat={true}
                 paused={false}
          />
        </View>
      )
    } else {
      return (
        <View style={{height: video.height,width: video.width, overflow: 'hidden', borderRadius: 10, backgroundColor: this.state.backgroundColor}}>
          <VideoWithCaching source={{uri: video.uri, mainVer: 1, patchVer: 0}}
                 resizeMode={'stretch'}
                 muted={this.state.isMuted}
                 style={{width: video.width, height: video.height, overflow:'hidden', borderRadius: 10}}
                 repeat={true}
                 paused={false}
          />
          <MediaBorderPatch media={video}>
            <View style={{bottom: 15}}>
              { this.renderVideoGrid(video) }
            </View>
          </MediaBorderPatch>
        </View>
      )
    }

  }

  renderImage(look, index) {
     //let  ShouldShowLookImage = this.props.currScroll < this.state.currLookPosition+deviceHeight*2 && this.props.currScroll > this.state.currLookPosition-deviceHeight*2

    if(Platform.OS === 'ios') {
      return (
        <View style={{alignSelf: 'center', marginBottom: 3, marginTop: 3}}>
          <Image source={{uri: look.uri}} style={{width: look.width-6, height: look.height, resizeMode: 'stretch', backgroundColor: this.state.backgroundColor, borderRadius: 10}} >
            <View style={{bottom: 15, zIndex: 1}}>
              <LikeView index={index} item={look} onPress={this.toggleLikeAction.bind(this)} onLikesNumberPress={this._onLikesNumberPress.bind(this)}/>
            </View>
          </Image>
        </View>
      )
    } else {
      return (
        <View>
          <Image source={{uri: look.uri}} style={{width: look.width, height: look.height, resizeMode: 'stretch', backgroundColor: this.state.backgroundColor, borderRadius: 10}} />
          <MediaBorderPatch media={look} >
            <View style={{bottom: 15, zIndex: 1}}>
              <LikeView index={index} item={look} onPress={this.toggleLikeAction.bind(this)} onLikesNumberPress={this._onLikesNumberPress.bind(this)}/>
            </View>
          </MediaBorderPatch>
        </View>
      )
    }

  }


  renderVideoGrid(look) {

    return(
      <View style={Platform.OS === 'ios' ? [styles.videoGridIos, {width: look.width}] : styles.videoGridAndroid}>
        <LikeView item={look} onPress={this.toggleLikeAction.bind(this)} onLikesNumberPress={this._onLikesNumberPress.bind(this)}/>
        <VolumeButton look={look} isMuted={this.state.isMuted} togglePlaySoundAction={() => this._togglePlaySoundAction()}/>
      </View>
    )
  }

  render() {
    const { look, index } = this.props
    return(
      <View  >
        <TouchableOpacity onPress={(e) => this._handleItemPress(look)}>
          {look.coverType === 'video' ? this.renderVideo(look) : this.renderImage(look, index)}
          {look.coverType === 'video' && Platform.OS === 'ios' ? this.renderVideoGrid(look) : null}
        </TouchableOpacity>
      </View>
    )
  }
}

export default MediaContainer;
