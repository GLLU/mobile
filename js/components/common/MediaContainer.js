import React,{PureComponent} from 'react';
import { StyleSheet, TextInput, Text, Platform, Dimensions, TouchableOpacity, Image, View } from 'react-native';
import LikeView from '../feedscreen/items/LikeView';
import CommentsView from '../feedscreen/items/CommentsView';
import VolumeButton from './VolumeButton';
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
    this._handleCommentPress = this._handleCommentPress.bind(this)
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
    }
    return (
      <View style={[{alignSelf: 'center',height: lookHeight, width: lookWidth-6, overflow: 'hidden', borderRadius: 10, backgroundColor: this.state.backgroundColor}, Platform.OS === 'ios' ? {marginBottom: 3, marginTop: 3} : null]}>
        {ShouldShowLookImage ?
          <VideoWithCaching source={{uri: video.uri, mainVer: 1, patchVer: 0}}
                            resizeMode={'stretch'}
                            muted={this.state.isMuted}
                            style={{width: lookWidth, height: lookHeight, overflow:'hidden'}}
                            paused={!ShouldShowLookImage}
                            repeat={true}
                            preview={video.preview}
          />
          :
          <View style={{width: lookWidth, height: lookHeight, backgroundColor: this.state.backgroundColor, borderRadius: 10}}/>
        }
        {Platform.OS !== 'ios' ?

            <View style={{bottom: 15}}>
              { this.renderVideoGrid(video) }
            </View>

          :
          null

        }

      </View>
    )

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

    return (
      <View>
        {ShouldShowLookImage ?
        <ImageWrapper source={{uri: look.uri}} resizeMode={'stretch'} style={{width: lookWidth, height: lookHeight, backgroundColor: this.state.backgroundColor}} >
          {this.renderImageGrid(look, lookHeight, lookWidth)}
        </ImageWrapper>
          :
          <View style={{width: lookWidth, height: lookHeight, backgroundColor: this.state.backgroundColor}} />}
      </View>
    )

  }
  _handleCommentPress() {
    console.log('blab')
    this.props.logEvent(this.props.fromScreen, {name: 'Image click trough comment button'});
    const item = {...this.props.look,openComments:true};
    let that = this
    setTimeout(()=>that.props.navigateTo('looksScreen', item), 0);
  }

  renderImageGrid(look, lookHeight, lookWidth) {
    const userName = look.username
    if(this.props.showMediaGrid) {
      return(
        <View >
          {this.props.children}
          <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: 30, bottom: 0, marginTop: lookHeight - 30, flexDirection: 'row', justifyContent: 'space-between'}}>
            <LikeView item={look} onPress={this.toggleLikeAction} onLikesNumberPress={this._onLikesNumberPress.bind(this)} lookHeight={lookHeight} lookId={look.id}/>
            <Text style={{color: 'white', alignSelf: 'center',textAlign: 'center',  fontSize: 10}}>{userName}</Text>
            <CommentsView item={look} onPress={this._handleCommentPress} lookHeight={lookHeight} lookId={look.id}/>
          </View>
        </View>
      )
    } else {
      return this.props.children
    }
  }

  renderVideoGrid(look) {
    const { lookHeight, lookWidth } = this.state.dimensions
    if(this.props.showMediaGrid) {
      return (
          <View style={Platform.OS === 'ios' ? [styles.videoGridIos, {width: lookWidth-2}] : styles.videoGridAndroid}>
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
      <View onLayout={(e) => this.setLookPosition(e)} style={{margin: 3}}>
        <TouchableOpacity onPress={this._handleItemPress}>
          {look.coverType === 'video' ? this.renderVideo(look) : this.renderImage(look)}
          {look.coverType === 'video' && Platform.OS === 'ios' ? this.renderVideoGrid(look) : null}
        </TouchableOpacity>
      </View>
    )
  }
}

export default withAnalytics(MediaContainer);
