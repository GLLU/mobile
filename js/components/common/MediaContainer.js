import React from 'react';
import { StyleSheet, TextInput, Text, Platform, Dimensions, TouchableOpacity, Image } from 'react-native';
import { View, } from 'native-base';
import BaseComponent from '../common/BaseComponent';
import _ from 'lodash';
import FontSizeCalculator from './../../calculators/FontSize';
import Video from 'react-native-video';
import LikeView from '../feedscreen/items/LikeView';
import ExtraDimensions from 'react-native-extra-dimensions-android';
const deviceHeight = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT')


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
      currVideoPosition: -1,
      shouldPlay: 0,
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
  }

  renderVideo(img) {
    let video = img;
    return (
      <View style={{flex: 1}} onLayout={(e) => console.log(e.nativeEvent.layout)}>
        <Video source={{uri: video.uri, mainVer: 1, patchVer: 0}}
               resizeMode={'stretch'}
               muted={true}
               style={{width: video.width - 5, height: video.height, overflow: 'hidden'}}
               repeat={true}
               rate={this.state.shouldPlay}
        />
      </View>
    )
  }

  renderImage(img, index) {
    return (
      <Image source={{uri: img.uri}} style={{width: img.width - 5, height: img.height, resizeMode: 'contain'}}>
        <LikeView index={index} item={img} onPress={this.toggleLikeAction.bind(this)}/>
      </Image>
    )
  }

  componentWillReceiveProps(nextProps) {

    if(this.props.img.coverType === 'video') {
      if(nextProps.currScroll < this.state.currVideoPosition+nextProps.img.height && nextProps.currScroll > this.state.currVideoPosition-deviceHeight) {
        this.setState({shouldPlay: 1})
      } else {
        this.setState({shouldPlay: 0})
      }
    }


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

  setVideoPosition(e) {
    if(this.props.img.coverType === 'video') {
      this.setState({currVideoPosition: e.nativeEvent.layout.y})
    }

  }

  render() {
    const { img, index } = this.props
    return (
      <View style={{width: img.width, height: img.height, paddingLeft: 0, marginTop: 5}} onLayout={(e) => this.setVideoPosition(e)}>
        <TouchableOpacity onPress={(e) => this._handleItemPress(img)}>
          {img.coverType === 'video' ? this.renderVideo(img) : this.renderImage(img, index)}
          {img.coverType === 'video' ? <LikeView index={index} item={img} onPress={this.toggleLikeAction.bind(this)}/> : null}
        </TouchableOpacity>
      </View>
    )
  }
}

export default MediaContainer;
