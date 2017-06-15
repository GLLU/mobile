import React, { Component } from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';
import cachedWrapper from './CachedComponentWrapper'
import listenToAppState from '../eventListeners/AppStateListener'

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
    if(!this.props.isCaching&&this.state.repeat){
      const formattedSource = VideoWithCaching.formatSource(localUri, source);
      return (
        <Video {...this.props} source={formattedSource} ref={component => this._root = component}/>
      )
    } else {
      return <View style={this.props.style}/>
    }
  }
}

const cache = cachedWrapper(props => props.source.uri);
export default listenToAppState(cache(VideoWithCaching));

