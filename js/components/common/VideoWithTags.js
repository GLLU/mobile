import React, { Component } from 'react';
import { StyleSheet, Dimensions, PanResponder, Animated,View } from 'react-native';
import _ from 'lodash';
import glluTheme from '../../themes/gllu-theme';
import Video from 'react-native-video';
import VideoWithCaching from "./media/VideoWithCaching";
export const VIEW_MODE = 'view';
const TAG_WIDTH = 100;
const BORDER_WIDTH = 5;
const h = Dimensions.get('window').height;
const w = Dimensions.get('window').width;

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
    itemId: React.PropTypes.number,
    image: React.PropTypes.string.isRequired,
    items: React.PropTypes.array,
    width: React.PropTypes.number,
    mode: React.PropTypes.string,
    showMarker: React.PropTypes.bool,
    onMarkerCreate: React.PropTypes.func,
    onDragEnd: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      locationX: 0,
      locationY: 0,
      repeat: false,
      image: this.props.image
    }
  }

  componentWillMount() {
    this.loadMarkerFromProps(this.props);
  }

  loadMarkerFromProps(props) {
    const { mode, itemId, items } = props;
    if (mode != VIEW_MODE && itemId) {
      const item = _.find(items, x => x.id === itemId);
      const { locationX, locationY } = item;
      const { width, height } = this.getRenderingDimensions();
      const absX = this.normalizePosition(locationX) * width;
      const absY = this.normalizePosition(locationY) * height;
      this._setupPanResponder(absX, absY);
    } else {
      this._setupPanResponder(0, 0);
    }
  }

  _setupPanResponder(locationX, locationY) {
    this._pan = new Animated.ValueXY();
    this._pan.addListener((value) => this._value = value);
    this._pan.setOffset({x: locationX, y: locationY})

    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder : () => true,
        onPanResponderMove           : Animated.event([null,{
            dx : this._pan.x,
            dy : this._pan.y
        }]),
        onPanResponderGrant: () => { },
        onPanResponderRelease        : (e, gesture) => {
          this._pan.setOffset(this._value);
          this._setupPanResponder(this._value.x, this._value.y);
          const { width, height } = this.getRenderingDimensions();
          const left = this._value.x / width;
          const top = this._value.y / height;
          const nextPosition = {locationX: left, locationY: top};
          this.setState(nextPosition, () => {
            this.props.onDragEnd(nextPosition);
          })
        }
    });
  }

  _handlePressWithoutPress () {
    const locationX = 1;
    const locationY = 1;
    const { width, height } = this.getRenderingDimensions();
    this._setupPanResponder(locationX, locationY);

    // convert location into relative positions
    const left = locationX / width;
    const top = locationY / height;
    this.setState({locationX: left, locationY: top}, () => {
      this.props.createLookItemForVideo({locationX: left, locationY: top});
    });
  }

  normalizePosition(value) {
    return Math.min(Math.max(value, 0.1), 0.9);
  }

  getRenderingDimensions() {
    let width = 30;
    let height = 40;
    if (this.props.width) {
      width = parseInt(this.props.width);
      height = parseInt(width * 16 / 9);
    } else {
      height = parseInt(h - BORDER_WIDTH * 2 - glluTheme.toolbarHeight);
      width = parseInt(height * 9 / 16);
    }
    return { width, height };
  }

  componentDidMount() {
    if(!this.props.itemId) {
      this._handlePressWithoutPress()  // auto creating an item to continue for further steps, will be refactored when items will be shown on video
    }
  }

  render() {
    return (
      <VideoWithCaching source={{uri: this.props.image}}
             resizeMode="contain"
             muted={false}
             style={{width: w - 5, height: h, overflow: 'hidden'}}
             repeat={true}/>
    );
  }
}

VideoWithTags.defaultProps = {
  mode: VIEW_MODE,
  showMarker: true,
};

export default VideoWithTags;
