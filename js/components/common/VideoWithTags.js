import React, {Component} from 'react';
import {StyleSheet, Dimensions, Keyboard, View, TouchableWithoutFeedback} from 'react-native';
export const VIEW_MODE = 'view';
const TAG_WIDTH = 100;
const h = Dimensions.get('window').height;
const w = Dimensions.get('window').width;
import VideoWithCaching from "./media/VideoWithCaching";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoWithCaching: {
    width: w, height: h, overflow: 'hidden'
  },

});

class VideoWithTags extends Component {

  static propTypes = {
    image: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.keyboardDidHideListener =
      Keyboard
        .addListener('keyboardDidHide',Keyboard.dismiss);
  }

  componentWillUnmount(){
    this.keyboardDidHideListener.remove();
  }

  render() {
    console.log('video:',this.props.image)
    return (
      <View style={styles.container}>
        <VideoWithCaching
          source={{uri: this.props.image, mainVer: 1, patchVer: 0}}
          resizeMode={'stretch'}
          muted={false}
          style={styles.videoWithCaching}
          paused={false}
          repeat={true}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {this.props.children}
        </TouchableWithoutFeedback>
      </View>

    );
  }
}

export default VideoWithTags;
