import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Video from 'react-native-video';
import cachedWrapper from './CachedComponentWrapper'

class VideoWithCaching extends Component {

  constructor(props) {
    super(props);
  }

  static formatSource = (localUri, source = {}) => Object.assign({}, source, {uri: localUri});

  render() {
    const {source, localUri} = this.props;
    const formattedSource = VideoWithCaching.formatSource(localUri, source);
    return (
      <Video {...this.props} source={formattedSource}/>
    )
  }
}

const renderLoader = (props) => {
  return (
    <View {...props} style={[props.style, {justifyContent: 'center'}]}>
      <Text style={{textAlign: 'center'}}>Loading</Text>
    </View>
  )
};

const cache = cachedWrapper(renderLoader)(props => props.source.uri);
export default cache(VideoWithCaching);
