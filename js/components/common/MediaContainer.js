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
    this.toggleLikeAction = this.toggleLikeAction.bind(this)
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
      setTimeout(()=>that.props.navigateTo('looksScreen', item), 0);
    } else {
      setTimeout(()=>that.props.navigateTo('looksScreen', item), 0);
    }
    this.setState({isMuted: true})
  }


  toggleLikeAction(isLiked) {
    this.logEvent('Feedscreen', {name: 'Like Image click'});
    const { look } = this.props
    if (isLiked) {
      let data = {id: look.id, likes: look.likes + 1, liked: true}
      //let msg = likeSentences[Math.floor(Math.random()*likeSentences.length)];
      //this.props.sendParisMessage(msg);
      this.props.likeUpdate(data);
    } else {
      let data = {id: look.id, likes: look.likes - 1, liked: false}
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
    const {lookWidth, lookHeight} = this.props.dimensions
    let  ShouldShowLookImage;
    if(this.props.shouldOptimize){
      ShouldShowLookImage = this.props.currScroll + lookHeight > this.state.currLookPosition - lookHeight*2 && this.props.currScroll - lookHeight < this.state.currLookPosition+lookHeight*2
    } else {
      ShouldShowLookImage = true
    }    if(Platform.OS === 'ios') {
      return (
        <View style={{height: lookHeight, width: lookWidth-6,  overflow: 'hidden', borderRadius: 10,  alignSelf: 'center', marginBottom: 3, marginTop: 3}}>
          <VideoWithCaching source={{uri: video.uri, mainVer: 1, patchVer: 0}}
                 resizeMode={'stretch'}
                 muted={this.state.isMuted}
                 style={{width: lookWidth, height: lookHeight, overflow:'hidden'}}
                 paused={!ShouldShowLookImage}
          />
        </View>
      )
    } else {
      return (
        <View style={{height: lookHeight, width: lookWidth, overflow: 'hidden', borderRadius: 10, backgroundColor: this.state.backgroundColor}}>
          {ShouldShowLookImage ?
            <VideoWithCaching source={{uri: video.uri, mainVer: 1, patchVer: 0}}
                              resizeMode={'stretch'}
                              muted={this.state.isMuted}
                              style={{width: lookWidth, height: lookHeight, overflow:'hidden', borderRadius: 10}}
                              paused={!ShouldShowLookImage}
            />
          :
            <View style={{width: lookWidth, height: lookHeight, backgroundColor: this.state.backgroundColor, borderRadius: 10}}/>

          }

          <MediaBorderPatch media={video} lookWidth={lookWidth} lookHeight={lookHeight}>
            <View style={{bottom: 15}}>
              { this.renderVideoGrid(video) }
            </View>
          </MediaBorderPatch>
        </View>
      )
    }

  }

  renderImage(look, index) {
    const {lookWidth, lookHeight} = this.props.dimensions;
    let  ShouldShowLookImage;
    if(this.props.shouldOptimize){
      ShouldShowLookImage = this.props.currScroll + lookHeight > this.state.currLookPosition - lookHeight*5 && this.props.currScroll - lookHeight < this.state.currLookPosition+lookHeight*5
    } else {
      ShouldShowLookImage = true
    }

    if(Platform.OS === 'ios') {
      return (
        <View style={{alignSelf: 'center', marginBottom: 3, marginTop: 3}}>
          <Image source={{uri: look.uri, cache: true}} cache={true} style={{width: lookWidth-6, height: lookHeight, resizeMode: 'stretch', backgroundColor: this.state.backgroundColor, borderRadius: 10}} >
            <View style={{bottom: 15, zIndex: 1}}>
              <LikeView index={index} item={look} onPress={this.toggleLikeAction} onLikesNumberPress={this._onLikesNumberPress.bind(this)} routeName={this.props.navigation} lookHeight={lookHeight}/>
            </View>
          </Image>
        </View>
      )
    } else {
      return (
        <View>
          {ShouldShowLookImage ? <Image source={{uri: look.uri}} style={{width: lookWidth, height: lookHeight, resizeMode: 'stretch', backgroundColor: this.state.backgroundColor, borderRadius: 10}} /> : <View style={{width: lookWidth, height: lookHeight, backgroundColor: this.state.backgroundColor, borderRadius: 10}}/>}
          <MediaBorderPatch media={look} lookWidth={lookWidth} lookHeight={lookHeight}>
            <View style={{bottom: 15, zIndex: 1}}>
              <LikeView index={index} item={look} onPress={this.toggleLikeAction} onLikesNumberPress={this._onLikesNumberPress.bind(this)} routeName={this.props.navigation} lookHeight={lookHeight}/>
            </View>
          </MediaBorderPatch>
        </View>
      )
    }

  }

  renderVideoGrid(look) {
    const { lookHeight } = this.props.dimensions
    return(
      <View style={Platform.OS === 'ios' ? [styles.videoGridIos, {width: look.width}] : styles.videoGridAndroid}>
        <LikeView item={look} onPress={this.toggleLikeAction} onLikesNumberPress={this._onLikesNumberPress.bind(this)} routeName={this.props.navigation} lookHeight={lookHeight}/>
        <VolumeButton look={look} isMuted={this.state.isMuted} togglePlaySoundAction={() => this._togglePlaySoundAction()} lookHeight={lookHeight}/>
      </View>
    )
  }

  render() {
    const { look, index } = this.props
    return(
      <View onLayout={(e) => this.setLookPosition(e)}>
        <TouchableOpacity onPress={(e) => this._handleItemPress(look)}>
          {look.coverType === 'video' ? this.renderVideo(look) : this.renderImage(look, index)}
          {look.coverType === 'video' && Platform.OS === 'ios' ? this.renderVideoGrid(look) : null}
        </TouchableOpacity>
      </View>
    )
  }
}

export default MediaContainer;
