import React, { Component } from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';
import cachedWrapper from './CachedComponentWrapper'
import listenToAppState from '../eventListeners/AppStateListener'
import IsOnScreenChecker from './IsOnScreenChecker'

class VideoWithCaching extends Component {

  static propTypes={
    isCaching:React.PropTypes.bool,
    localUri:React.PropTypes.string,
    source:React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      repeat: true
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

  static formatSource = (localUri, source = {}) => Object.assign({}, source, {uri: localUri});

  render() {
    const {source, localUri} = this.props;
    const formattedSource = VideoWithCaching.formatSource(localUri, source);
    return (
      <View>
        {
          !this.props.isCaching && this.state.repeat && this.props.isOnScreen?
          <Video {...this.props} source={formattedSource} ref={component => this._root = component}/>:
          null
        }
        {
          !this.props.isOnScreen ?
            <View style={this.props.style}/>:
            null
        }
      </View>
    )
  }
}

const cache = cachedWrapper(props => props.source.uri);
export default cache(IsOnScreenChecker(listenToAppState(VideoWithCaching)));


