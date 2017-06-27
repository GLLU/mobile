import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import cachedWrapper from './CachedComponentWrapper'
import listenToAppState from '../eventListeners/AppStateListener'
import IsOnScreenChecker from './IsOnScreenChecker'
import { debounce } from "lodash";
import Spinner from "../../loaders/Spinner";

const styles = StyleSheet.create({
  loaderContainer:{
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

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
      if(this.state.isPlaying!==true){
        this.setState({isPlaying:true})
      }

  };

  renderLoader = () => {
    if (this.state.isPlaying) {
      return null;
    }
    if (this.props.preview) {
      return (
        <Image source={{uri: this.props.preview}} style={[this.props.style, styles.loaderContainer]}>
          <Spinner color='grey'/>
        </Image>
      )
    }
    return (
      <View style={[this.props.style, styles.loaderContainer]}>
        <Spinner color='grey'/>
      </View>
    )
  };

  renderVideo = () => {
    const {source, localUri} = this.props;
    const formattedSource = VideoWithCaching.formatSource(localUri, source);
    if (!this.props.isCaching && this.state.repeat && this.props.isOnScreen) {
      return <Video {...this.props} source={formattedSource} onProgress={this.onVideoStartsPlaying} onError={(err) => console.log('error on video',err)}
                    ref={component => this._root = component}/>
    }
    return null;
  }

  render() {
    return (
      <View>
        {this.renderVideo()}
        {this.renderLoader()}
      </View>
    )
  }
}

const cache = cachedWrapper(props => props.source.uri);
export default cache(IsOnScreenChecker(listenToAppState(VideoWithCaching)));


