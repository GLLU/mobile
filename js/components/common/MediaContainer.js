import React,{PureComponent} from 'react';
import { StyleSheet, TextInput, Text, Platform, Dimensions, TouchableOpacity, Image, View } from 'react-native';
import LikeView from '../feedscreen/items/LikeView';
import VolumeButton from './VolumeButton';
import MediaBorderPatch from './MediaBorderPatch'
import Utils from '../../utils';
import VideoWithCaching from "./media/VideoWithCaching";
import ImageWrapper from "./media/ImageWrapper";
import withAnalytics from "../common/analytics/WithAnalytics";
const deviceWidth = Dimensions.get('window').width;

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

class MediaContainer extends PureComponent {
  static propTypes = {
    handleSearchInput: React.PropTypes.func,
    clearText: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    this.toggleLikeAction = this.toggleLikeAction.bind(this)
    this._handleItemPress = this._handleItemPress.bind(this)
    this.state = {
      currLookPosition: -1,
      shouldPlay: false,
      isMuted: true,
      backgroundColor:Utils.getLoaderImage(),
      dimensions: this.getLookDimensions(props.look)
    }
  }

  getLookDimensions(look) {
    const colW = (deviceWidth) / 2;
    const {width, height} = look;
    const lookWidth = colW;
    const lookHeight = height / width * colW;
    return {lookWidth, lookHeight}
  }

  _handleItemPress() {
    const item = this.props.look
    this.props.logEvent(this.props.fromScreen, {name: 'Image click'});
    if(this.props.fromScreen === 'profileScreen') {
      console.log('happenned from profile')
      item.singleItem = true
    }
    let that = this
    setTimeout(()=>that.props.navigateTo('looksScreen', item), 0);
  }

  toggleLikeAction(isLiked) {
    this.props.logEvent('Feedscreen', {name: 'Like Image click'});
    const { look } = this.props
    if (isLiked) {
      let data = {id: look.id, likes: look.likes + 1, liked: true}
      let msg = likeSentences[Math.floor(Math.random()*likeSentences.length)];
      this.props.sendParisMessage(msg);
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
    const {lookWidth, lookHeight} = this.state.dimensions
    let  ShouldShowLookImage = true;
    if(this.props.shouldOptimize){
      ShouldShowLookImage = this.props.currScroll + lookHeight > this.state.currLookPosition - lookHeight*2 && this.props.currScroll - lookHeight < this.state.currLookPosition+lookHeight*2
    } else {
      ShouldShowLookImage = true
    }    if(Platform.OS === 'ios') {
      return (
        <View style={{height: lookHeight, width: lookWidth-6,  overflow: 'hidden', borderRadius: 10,  alignSelf: 'center', marginBottom: 3, marginTop: 3}}>
          <VideoWithCaching
            source={{uri: video.uri, mainVer: 1, patchVer: 0}}
            resizeMode={'stretch'}
            muted={this.state.isMuted}
            style={{width: lookWidth, height: lookHeight, overflow:'hidden'}}
            paused={!ShouldShowLookImage}
            navigation={this.props.navigation}
            preview={video.preview}
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
                              repeat={true}
                              navigation={this.props.navigation}
                              preview={video.preview}
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

  // shouldComponentUpdate(nextProps) {
  //   if(nextProps !== this.props) {
  //     _.each(Object.keys(this.props),thisPropsKey=>{
  //     if(this.props[thisPropsKey]!==nextProps[thisPropsKey]){
  //       console.log(`UserLooks, props changed! field: ${thisPropsKey}`,this.props[thisPropsKey],nextProps[thisPropsKey]);
  //       return true
  //     }
  //   })
  // }
  //   return false
  // }

  renderImage(look) {
    const {lookWidth, lookHeight} = this.state.dimensions;
    let  ShouldShowLookImage;
    if(this.props.shouldOptimize){
      ShouldShowLookImage = this.props.currScroll + lookHeight > this.state.currLookPosition - lookHeight*5 && this.props.currScroll - lookHeight < this.state.currLookPosition+lookHeight*5
    } else {
      ShouldShowLookImage = true
    }

    if(Platform.OS === 'ios') {
      return (
        <View style={{alignSelf: 'center', marginBottom: 3, marginTop: 3}}>
          <ImageWrapper source={{uri: look.uri}} resizeMode={'stretch'} style={{width: lookWidth-6, height: lookHeight, backgroundColor: this.state.backgroundColor, borderRadius: 10}}>
            {this.renderImageGrid(look, lookHeight)}
          </ImageWrapper>
        </View>
      )
    } else {
      return (
        <View>
          {ShouldShowLookImage ? <ImageWrapper source={{uri: look.uri, cache: true}} resizeMode={'stretch'} style={{width: lookWidth, height: lookHeight, backgroundColor: this.state.backgroundColor, borderRadius: 10}} navigation={this.props.navigation}/> : <View style={{width: lookWidth, height: lookHeight, backgroundColor: this.state.backgroundColor, borderRadius: 10}} />}
          <MediaBorderPatch media={look} lookWidth={lookWidth} lookHeight={lookHeight}>
            {this.renderImageGrid(look, lookHeight)}
          </MediaBorderPatch>
        </View>
      )
    }

  }

  renderImageGrid(look, lookHeight) {
    if(this.props.showMediaGrid) {
      return(
        <View style={{zIndex: 1}}>
          {this.props.children}
          <View style={{bottom: 15}}>
            <LikeView item={look} onPress={this.toggleLikeAction} onLikesNumberPress={this._onLikesNumberPress.bind(this)} lookHeight={lookHeight} lookId={look.id}/>
          </View>
        </View>
      )
    } else {
      return this.props.children
    }
  }

  renderVideoGrid(look) {
    const { lookHeight } = this.state.dimensions
    if(this.props.showMediaGrid) {
      return (
          <View style={Platform.OS === 'ios' ? [styles.videoGridIos, {width: look.width}] : styles.videoGridAndroid}>

            {this.props.children}
            <LikeView item={look} onPress={this.toggleLikeAction} onLikesNumberPress={this._onLikesNumberPress.bind(this)} routeName={this.props.navigation} lookHeight={lookHeight}/>
            <VolumeButton look={look} isMuted={this.state.isMuted} togglePlaySoundAction={() => this._togglePlaySoundAction()} lookHeight={lookHeight}/>
          </View>
      )
    } else {
      return this.props.children
    }
  }

  render() {
    const { look } = this.props
    return(
      <View onLayout={(e) => this.setLookPosition(e)}>
        <TouchableOpacity onPress={this._handleItemPress}>
          {look.coverType === 'video' ? this.renderVideo(look) : this.renderImage(look)}
          {look.coverType === 'video' && Platform.OS === 'ios' ? this.renderVideoGrid(look) : null}
        </TouchableOpacity>
      </View>
    )
  }
}

export default withAnalytics(MediaContainer);
