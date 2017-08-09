import React, {Component} from 'react';
import {StyleSheet, Dimensions, PanResponder, Animated, View} from 'react-native';
import _ from 'lodash';
import glluTheme from '../../themes/gllu-theme';
import Video from "react-native-video";
export const VIEW_MODE = 'view';
const TAG_WIDTH = 100;
const BORDER_WIDTH = 5;
const h = Dimensions.get('window').height;
const w = Dimensions.get('window').width;
import VideoWithCaching from "./media/VideoWithCaching";

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  draggableContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    width: 500,
    height: 500
  },
  itemBgImage: {
    height: 48,
    width: TAG_WIDTH,
  },
  itemsContainer: {
    backgroundColor: 'transparent',
  },
  itemMarker: {
    position: 'absolute',
    height: 48,
    width: TAG_WIDTH,
  },

});

class VideoWithTags extends Component {

  static propTypes = {
    image: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    console.log('video:',this.props.image)
    return (
      <View style={{flex: 1}}>
        <VideoWithCaching
          source={{uri: this.props.image, mainVer: 1, patchVer: 0}}
          resizeMode={'stretch'}
          muted={false}
          style={{width: w, height: h, overflow: 'hidden'}}
          paused={false}
          repeat={true}
        />
        {this.props.children}
      </View>

    );
  }
}

export default VideoWithTags;
