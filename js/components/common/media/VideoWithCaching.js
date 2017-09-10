import React, { Component } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import Video from 'react-native-video';
import cachedWrapper from './CachedComponentWrapper';
import listenToAppState from '../eventListeners/AppStateListener';
import IsOnScreenChecker from './IsOnScreenChecker';
import { debounce } from 'lodash';
import Spinner from '../../loaders/Spinner';
import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Colors.styles';
import { generateAdjustedSize } from '../../../utils/AdjustabaleContent';

const lowConnectivity = require('../../../../images/indicators/videoError.png');

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowConnectivityContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.primaryColor,
  },
  lowConnectivityImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  lowConnectivityText: {
    fontSize: generateAdjustedSize(10),
    textAlign: 'center',
    fontFamily: Fonts.regularFont,
  },
});

class VideoWithCaching extends Component {

  static propTypes={
    isCaching: React.PropTypes.bool,
    localUri: React.PropTypes.string,
    source: React.PropTypes.object,
    currentAppState: React.PropTypes.string,
    isOnScreen: React.PropTypes.bool,
    preview: React.PropTypes.string,
  }

  static defaultProps={
    preview: '',
  }

  constructor(props) {
    super(props);
    this.onVideoStartsPlaying = this.onVideoStartsPlaying.bind(this);
    this.onError = this.onError.bind(this);
    this.state = {
      repeat: true,
      isPlaying: false,
      connectionError: false,
    };
    this.forceCacheAttempts = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentAppState !== this.props.currentAppState) {
      if (this.props.currentAppState === 'active' && this._root) {
        this._root.seek(0);
      }
      this.setState({ repeat: nextProps.currentAppState === 'active' });
    }
    if (nextProps.isCaching && nextProps.isCaching !== this.props.isCaching) {
      this.setState({ isPlaying: false });
    }
  }

  static formatSource = (localUri, source = {}) => ({ ...source, uri: localUri });

  onVideoStartsPlaying = () => {
    if (this.state.isPlaying !== true) {
      this.setState({ isPlaying: true });
    }
  };

  onError(err) {
    if (this.forceCacheAttempts < 10) {
      this.forceCacheAttempts++;
      this.props.forceCache();
    } else {
      this.setState({ connectionError: true });
    }
  }

  renderLoader = () => {
    if (!this.state.isPlaying) {
      return null;
    }
    if (this.props.preview) {
      return (
        <Image source={{ uri: this.props.preview }} style={[this.props.style, styles.loaderContainer]}>
          <Spinner color="grey" />
        </Image>
      );
    }
    return (
      <View style={[this.props.style, styles.loaderContainer]}>
        <Spinner color="grey" />
      </View>
    );
  };

  renderLowConnectivity = () => {
    if (this.state.connectionError) {
      return null;
    }
    return (
      <View style={[this.props.style, styles.loaderContainer, styles.lowConnectivityContainer]}>
        <Image source={lowConnectivity} resizeMode={'stretch'} style={styles.lowConnectivityImage} />
        <Text style={styles.lowConnectivityText}>There's something wrong with the video. wer'e working on making it better</Text>
      </View>

    );
  };

  renderVideo = () => {
    const { source, localUri } = this.props;
    const formattedSource = VideoWithCaching.formatSource(localUri, source);
    if (!this.props.isCaching && this.state.repeat && this.props.isOnScreen) {
      return (<Video
        {...this.props} source={formattedSource} onProgress={this.onVideoStartsPlaying} onError={this.onError}
        ref={component => this._root = component} />);
    }
    return null;
  }

  render() {
    return (
      <View>
        {this.renderVideo()}
        {this.renderLoader()}
        {this.renderLowConnectivity()}
      </View>
    );
  }
}

const cache = cachedWrapper(props => props.source.uri);
export default cache(IsOnScreenChecker(listenToAppState(VideoWithCaching)));

