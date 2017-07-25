import React,{Component} from 'react';
import { StyleSheet, TextInput, Text, Platform, Dimensions, TouchableOpacity, TouchableHighlight, Image, View } from 'react-native';
import LikeView from '../feedscreen/items/FeedLikesView';
import FeedCommentsView from '../feedscreen/items/FeedCommentsView';
import VolumeButton from './VolumeButton';
import Utils from '../../utils';
import VideoWithCaching from "./media/VideoWithCaching";
import ImageWrapper from "./media/ImageWrapper";
import withAnalytics from "../common/analytics/WithAnalytics";
import { connect } from "react-redux";
import { likeUpdate, unlikeUpdate } from "../../actions/likes";
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  videoGridIos: {
    bottom: 0,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent:'space-between'
  },
  videoGridAndroid: {
    bottom: 0,
    flexDirection: 'column',
    justifyContent:'space-between',
    zIndex: 1
  },
});

const likeSentences = ["Wow, it will look amazing on you!", 'Nice Look, she looks poppy!', 'I liked it also, pretty nice!', 'That girl is on fire!', 'Very nice! can look perfect on you!']

class MediaContainer extends Component {
  static propTypes = {
    handleSearchInput: React.PropTypes.func,
    likeUpdate: React.PropTypes.func,
    unlikeUpdate: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    logEvent: React.PropTypes.func,
    sendParisMessage: React.PropTypes.func,
    clearText: React.PropTypes.string,
    look: React.PropTypes.object,
    showMediaGrid: React.PropTypes.bool,
    shouldOptimize: React.PropTypes.bool,
    currScroll: React.PropTypes.number,
    fromScreen: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.toggleLikeAction = this.toggleLikeAction.bind(this)
    this._handleItemPress = this._handleItemPress.bind(this)
    this._handleCommentPress = this._handleCommentPress.bind(this)
    this.goToProfile = this.goToProfile.bind(this)
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
    const lookWidth = colW -6;
    const lookHeight = height / width * colW;
    return {lookWidth, lookHeight}
  }

  _handleItemPress() {
    const item = this.props.look;
    this.props.logEvent(this.props.fromScreen, {name: 'Image click'});
    if(this.props.fromScreen === 'profileScreen') {
      item.singleItem = true
    }
    let that = this
    setTimeout(()=>that.props.navigateTo('looksScreen', item), 0);
  }

  toggleLikeAction() {
    this.props.logEvent('Feedscreen', {name: 'Like Image click'});
    const { look } = this.props;
    const {id,liked} = look;
    if (liked) {
      this.props.unlikeUpdate(id);
    }
    else {
      let msg = likeSentences[Math.floor(Math.random()*likeSentences.length)];
      this.props.sendParisMessage(msg);
      this.props.likeUpdate(id);
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

  _handleCommentPress() {
    this.props.logEvent(this.props.fromScreen, {name: 'Image click trough comment button'});
    const item = {...this.props.look,openComments:true};
    let that = this
    setTimeout(()=>that.props.navigateTo('looksScreen', item), 0);
  }

  shouldShowMedia() {
    const { lookHeight } = this.state.dimensions;
    if(this.props.shouldOptimize){
      return this.props.currScroll + lookHeight > this.state.currLookPosition - lookHeight*5 && this.props.currScroll - lookHeight < this.state.currLookPosition+lookHeight*5
    } else {
      return true
    }
  }

  renderVideo(video) {
    const {lookWidth, lookHeight} = this.state.dimensions
    let  ShouldShowLookImage = this.shouldShowMedia()
    return (
      <View style={{width: lookWidth, height: lookHeight, backgroundColor: this.state.backgroundColor}}>
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


      </View>
    )

  }

  renderImage(look) {
    const {lookWidth, lookHeight} = this.state.dimensions;
    let  ShouldShowLookImage = this.shouldShowMedia()

    return (
      <View>
        {ShouldShowLookImage ?
        <ImageWrapper source={{uri: look.uri}} resizeMode={'stretch'} style={{width: lookWidth, height: lookHeight, backgroundColor: this.state.backgroundColor}} />
          :
          <View style={{width: lookWidth, height: lookHeight, backgroundColor: this.state.backgroundColor}} />}
      </View>
    )

  }
  renderVolumButton(look) {
    return(

        <VolumeButton look={look} isMuted={this.state.isMuted} togglePlaySoundAction={() => this._togglePlaySoundAction()}/>

    )
  }

  goToProfile(){
    const { look } = this.props
    const user = look;
    this.props.navigateTo('profileScreen',user);
  }

  getUsernameStringFeedView(username) {
    if(username.length > 12){
      return username.substring(0,11) + '..'
    } else {
      return username
    }
  }

  renderFeedMediaGrid(look) {
    const { lookHeight, lookWidth } = this.state.dimensions;
    const userName = this.getUsernameStringFeedView(look.username)
    if(this.props.showMediaGrid) {
      return (
        <View style={[styles.videoGridIos, {flex: 1,  width:lookWidth, height: lookHeight, alignItems: 'stretch'}]}>
          <View style={{alignSelf: 'flex-end'}}>
            {look.coverType === 'video' ? this.renderVolumButton(look) : null}
          </View>
          <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: 30,  bottom: 0, flexDirection: 'row', justifyContent: 'space-between'}}>
            <LikeView isLiked={look.liked} likes={look.likes} onPress={this.toggleLikeAction} onLikesNumberPress={this._onLikesNumberPress.bind(this)} lookId={look.id}/>
            <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => this.goToProfile()}>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={{color: 'white', alignSelf: 'center',textAlign: 'center', justifyContent: 'center', fontSize: 11}}>{userName}</Text>
            </TouchableOpacity>
            <FeedCommentsView comments={look.comments} onPress={this._handleCommentPress} lookId={look.id}/>
          </View>
        </View>
      )
    } else {
      return this.props.children
    }
  }

  render() {
    const { look } = this.props;
    return(
      <View onLayout={(e) => this.setLookPosition(e)} style={{margin: 3}}>
        <TouchableOpacity onPress={this._handleItemPress}>
          {look.coverType === 'video' ? this.renderVideo(look) : this.renderImage(look)}
          {this.renderFeedMediaGrid(look)}
        </TouchableOpacity>
      </View>
    )
  }
}

function bindActions(dispatch) {
  return {
    likeUpdate: (id) => dispatch(likeUpdate(id)),
    unlikeUpdate: (id) => dispatch(unlikeUpdate(id)),
  };
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, bindActions)(withAnalytics(MediaContainer));
