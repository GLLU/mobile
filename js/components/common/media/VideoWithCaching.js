import React, { Component } from 'react';
import { Image, View } from 'react-native';
import Video from 'react-native-video';
import cachedWrapper from './CachedComponentWrapper'
import listenToAppState from '../eventListeners/AppStateListener'
import IsOnScreenChecker from './IsOnScreenChecker'
import { debounce } from "lodash";

class VideoWithCaching extends Component {

  static propTypes={
    isCaching:React.PropTypes.bool,
    localUri:React.PropTypes.string,
    source:React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.onVideoStartsPlaying=this.onVideoStartsPlaying.bind(this);
    this.state = {
      repeat: true,
      isPlaying:false
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentAppState!==this.props.currentAppState){
      if(this.props.currentAppState==='active'){
        this._root.seek(0)
      }
      this.setState({repeat:nextProps.currentAppState==='active'})
    }
  }

  static formatSource = (localUri, source = {}) => ({...source, uri: localUri});

  onVideoStartsPlaying = ()=>{
    debounce(()=>{
      console.log('lets debounce')
      if(this.state.isPlaying!==true){
        console.log('setting state')
        this.setState({isPlaying:true})
      }
    },500)
  };

  render() {
    const {source, localUri} = this.props;
    const formattedSource = VideoWithCaching.formatSource(localUri, source);
    console.log( `video playing?`,this.state.isPlaying);
    console.log( `is on screen?`,this.props.isOnScreen);
    return (
      <View>
        {
          !this.state.isPlaying ?
            <Image source={{uri:'https://bollyspice.com/wp-content/uploads/2011/12/11dec_don2-comic.jpg'}} style={[this.props.style,{position:'absolute', top:0}]}/>:
            null
        }
        {
          !this.props.isCaching && this.state.repeat && this.props.isOnScreen?
            <Video {...this.props} source={formattedSource} onprogress={this.onVideoStartsPlaying} ref={component => this._root = component}/>:
            null
        }
      </View>
    )
  }
}

const cache = cachedWrapper(props => props.source.uri);
export default cache(IsOnScreenChecker(listenToAppState(VideoWithCaching)));


