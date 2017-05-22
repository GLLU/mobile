import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';
import cachedWrapper from './CachedComponentWrapper'

class VideoWithCaching extends Component {

  constructor(props) {
    super(props);
  }

  formatSource(localUri, source = {}) {
    source.uri = localUri;
    source.patchVer = source.patchVer || 0;
    source.mainVer = source.mainVer || 1;
    return source;
  }

  render() {
    const {localUri} = this.props;
    const source = this.formatSource(localUri, this.props.source);
    return (
      <Video {...this.props} source={source}/>
    )
  }
}

const renderLoader=(props)=>{
  return (
    <View {...props} style={[props.style,{justifyContent: 'center'}]}>
      <Text style={{textAlign: 'center'}}>Loading</Text>
    </View>
  )
};

const cache = cachedWrapper(renderLoader)(props=>props.source.uri);
export default cache(VideoWithCaching);
