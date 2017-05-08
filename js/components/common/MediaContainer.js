import React from 'react';
import { StyleSheet, TextInput, Text, Platform, Dimensions, TouchableOpacity, Image } from 'react-native';
import { View } from 'native-base';
import BaseComponent from '../common/BaseComponent';
import FontSizeCalculator from './../../calculators/FontSize';
import Video from 'react-native-video';
import LikeView from '../feedscreen/items/LikeView';
import VolumeButton from './VolumeButton';
import ExtraDimensions from 'react-native-extra-dimensions-android';
const deviceHeight = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT')
const logo = require('../../../images/icons/loading1.png');


const styles = StyleSheet.create({
  clearText: {
    color: '#757575',
    fontSize: new FontSizeCalculator(12).getSize(),
  },
});

class MediaContainer extends BaseComponent {
  static propTypes = {
    handleSearchInput: React.PropTypes.func,
    clearText: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      currLookPosition: -1,
      shouldPlay: 1,
      isMuted: true
    }

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

  renderVideo(look) {
    let video = look;
    return (
      <View style={{flex: 1}}>
        <Video source={{uri: video.uri, mainVer: 1, patchVer: 0}}
               resizeMode={'stretch'}
               muted={this.state.isMuted}
               style={{width: video.width - 5, height: video.height, overflow: 'hidden'}}
               repeat={true}
               rate={this.state.shouldPlay}
        />
      </View>
    )
  }

  renderImage(look, index) {
     let  ShouldShowLookImage = this.props.currScroll < this.state.currLookPosition+deviceHeight && this.props.currScroll > this.state.currLookPosition-deviceHeight
      return (
        <Image source={ShouldShowLookImage ? {uri: look.uri} : logo} style={{width: look.width - 5, height: look.height, resizeMode: 'stretch'}}>
          <LikeView index={index} item={look} onPress={this.toggleLikeAction.bind(this)}/>
        </Image>
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

  renderVideoGrid(index, look) {

    return(
      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
        <LikeView index={index} item={look} onPress={this.toggleLikeAction.bind(this)}/>
        <VolumeButton look={look} isMuted={this.state.isMuted} togglePlaySoundAction={() => this._togglePlaySoundAction()}/>
      </View>
    )
  }

  render() {
    const { look, index } = this.props
    return(
      <View style={{width: look.width, height: look.height, paddingLeft: 0, marginTop: 5}} onLayout={(e) => this.setLookPosition(e)}>
        <TouchableOpacity onPress={(e) => this._handleItemPress(look)}>
          {look.coverType === 'video' ? this.renderVideo(look) : this.renderImage(look, index)}
          {look.coverType === 'video' ? this.renderVideoGrid(index, look) : null}
        </TouchableOpacity>
      </View>
    )
  }
}

export default MediaContainer;