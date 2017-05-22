import React, { Component } from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';
import cachedWrapper from './CachedComponentWrapper'

class VideoWithCaching extends Component {

  static propTypes={
    localUri:React.PropTypes.string,
    source:React.PropTypes.object,
  }

  static formatSource = (localUri, source = {}) => Object.assign({}, source, {uri: localUri});

  render() {
    const {source, localUri} = this.props;
    const formattedSource = VideoWithCaching.formatSource(localUri, source);
    return (
      <Video {...this.props} source={formattedSource} style={{}}/>
    )
  }
}

const renderLoader = (props) => <View style={{}}/>;

const cache = cachedWrapper(renderLoader)(props => props.source.uri);
export default cache(VideoWithCaching);
