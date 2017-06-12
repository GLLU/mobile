import React, { Component } from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';
import cachedWrapper from './CachedComponentWrapper'
import listenToAppState from '../eventListeners/AppStateListener'

class VideoWithCaching extends Component {

  static propTypes={
    localUri:React.PropTypes.string,
    source:React.PropTypes.object,
  }

  static formatSource = (localUri, source = {}) => Object.assign({}, source, {uri: localUri});
  constructor(props) {
    super(props);
    this.state = {
      repeat: props.currentAppState==='active'
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

  render() {
    const {source, localUri} = this.props;
    const formattedSource = VideoWithCaching.formatSource(localUri, source);
    if(this.state.repeat){
      return (
        <Video {...this.props} source={formattedSource} ref={component => this._root = component}/>
      )
    } else {
      return <View style={this.props.style}/>
    }
  }
}

const renderLoader = () => <View style={{}}/>;

const cache = cachedWrapper(renderLoader)(props => props.source.uri);
export default cache(listenToAppState(VideoWithCaching));

