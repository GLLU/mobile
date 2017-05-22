import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';
import * as Cache from '../../../lib/cache/FSVideoCache'

class CachedVideo extends Component {
  static propTypes = {
    handleSearchInput: React.PropTypes.func,
    clearText: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      localUri: ''
    };
  }

  componentWillMount() {
    const {uri} = this.props.source;
    Cache.get(uri).then(cachedPath => {
      if (cachedPath) {
        this.onVideoCached(cachedPath);
      }
      else {
        Cache.add(uri).then(localPath => {
          this.onVideoCached(localPath);
        }).catch(err => console.log(`error with caching file ${err}`));
      }
    }).catch(err => console.log(`error with getting file ${err}`));

  }

  onVideoCached(localUri) {
    this.setState({isLoading: false, localUri: localUri})
  }

  formatSource(localUri, source = {}) {
    source.uri = localUri;
    source.patchVer = source.patchVer || 0;
    source.mainVer = source.mainVer || 1;
    return source;
  }

  renderVideo() {
    const {localUri} = this.state;
    const source = this.formatSource(localUri, this.props.source);
    return (
      <Video {...this.props} source={source}/>
    )
  }

  renderLoader() {
    return (
      <View {...this.props} style={[this.props.style, {justifyContent: 'center'}]}>
        <Text style={{textAlign: 'center'}}>Loading</Text>
      </View>
    )
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoader(this.props)
    }
    return this.renderVideo(this.props)
  }
}

export default CachedVideo;
