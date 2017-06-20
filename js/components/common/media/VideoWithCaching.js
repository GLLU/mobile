import React, { Component } from 'react';
import { Image, View } from 'react-native';
import Video from 'react-native-video';
import cachedWrapper from './CachedComponentWrapper'
import listenToAppState from '../eventListeners/AppStateListener'
import IsOnScreenChecker from './IsOnScreenChecker'
import { debounce } from "lodash";
import Spinner from "../../loaders/Spinner";

class VideoWithCaching extends Component {

  static propTypes={
    isCaching:React.PropTypes.bool,
    localUri:React.PropTypes.string,
    source:React.PropTypes.object,
    currentAppState:React.PropTypes.string,
    isOnScreen:React.PropTypes.bool,
    preview:React.PropTypes.string
  }

  static defaultProps={
    preview:''
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
      if(this.props.currentAppState==='active'&&this._root){
        this._root.seek(0)
      }
      this.setState({repeat:nextProps.currentAppState==='active'})
    }
  }

  static formatSource = (localUri, source = {}) => ({...source, uri: localUri});

  onVideoStartsPlaying = ()=>{
    debounce(()=>{
      if(this.state.isPlaying!==true){
        this.setState({isPlaying:true})
      }
    },500)
  };

  render() {
    const {source, localUri} = this.props;
    const formattedSource = VideoWithCaching.formatSource(localUri, source);
    return (
      <View>
        {
          !this.state.isPlaying ?
            <Image source={{uri:this.props.preview}} style={[this.props.style,{position:'absolute', top:0, justifyContent:'center',alignItems:'center'}]}>
              <Spinner color='grey'/>
            </Image>:
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


