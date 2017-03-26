import React, { Component } from 'react';
import { Text, Platform, Image, StyleSheet, Dimensions, PanResponder, Animated, TouchableOpacity, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import { View } from 'native-base';
import FitImage from 'react-native-fit-image';
import _ from 'lodash';
import glluTheme from '../../themes/gllu-theme';
import Video from 'react-native-video';
import ExtraDimensions from 'react-native-extra-dimensions-android';

export const EDIT_MODE = 'edit';
export const CREATE_MODE = 'create';
export const VIEW_MODE = 'view';
const deviceHeight = Dimensions.get('window').height;
const itemBackground = require('../../../images/tag-background.png');
const TAG_WIDTH = 100;
const BORDER_WIDTH = 5;
const h = Dimensions.get('window').height;
const w = Dimensions.get('window').weight;

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
    items: React.PropTypes.array.isRequired,
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

    // this._setupPanResponder(this.state.locationX, this.state.locationY);
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

  getTag() {
    return { locationX: this.state.locationX, locationY: this.state.locationY };
  }

  _handlePress(e) {
    const {locationX, locationY} = e.nativeEvent;
    const { width, height } = this.getRenderingDimensions();
    this._setupPanResponder(locationX, locationY);

    // convert location into relative positions
    const left = locationX / width;
    const top = locationY / height;
    this.setState({locationX: left, locationY: top}, () => {
      this.props.onMarkerCreate({locationX: left, locationY: top});
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

  renderTags() {
    const { items, itemId, mode } = this.props;

    const { width, height } = this.getRenderingDimensions();
    console.log('width', width)
    console.log('height', height)

    return items.map((item, i) => {
      console.log('item', item)
      const x = this.normalizePosition(item.locationX);
      const y = this.normalizePosition(item.locationY);
      const left = parseInt(x * width);
      const top = parseInt(y * height);
      console.log('top', top)
      console.log('left', left)
      console.log('h', h)

      if (mode !== VIEW_MODE) {
        console.log('no view mode')
        const layout = this._pan.getLayout();
        return (
          <Animated.View
              key={i}
              {...this.panResponder.panHandlers}
              style={[layout, styles.itemMarker, { transform: [{ translateX: -TAG_WIDTH }, {translateY: -BORDER_WIDTH - 5}]}]}>
            <Image source={itemBackground} style={styles.itemBgImage} />
          </Animated.View>
    );
      }
      console.log('view mode')
      return (
        <View key={i} style={[styles.itemMarker, { top: top, left: left}, { transform: [{ translateX: -TAG_WIDTH }, {translateY: -BORDER_WIDTH - 5}]}]}>
          <Image source={itemBackground} style={styles.itemBgImage} />
        </View>
      );
    });
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
    this._handlePressWithoutPress()
    //
    let that = this
    //this.props.startVideo()
    //setTimeout(function(){ that.setState({repeat: true}); }, 7500);


  }

  onLoadS() {
    console.log('onLoad start')
    // this.setState({repeat: false})
  }

  onLoad() {
    //console.log('onLoad')
    //    !this.state.repeat ? this.setState({repeat: true}) : null;
  }
  showProgress() {
    console.log('boom')
  }

  _render() {
    const image = 'https://cdn1.gllu.com/uploads/look_video/look-2300/look-video-30/large_720_5E98533B-AAA3-4D6B-8830-EEE2623BB58C.mp4'
    const { width, height } = this.getRenderingDimensions();
    if (!this.props.showMarker) {
      return (
      <View style={{flex: 1}} >

        <Video source={{uri: image}}
               resizeMode="contain"
               muted={true}
               style={{width: w, height: h, overflow: 'hidden', flexGrow: h, flexBasis: 1}}
               repeat={true}
        />

      </View>
      );
    }
    console.log(' dont fixImage')
    return (
      <View style={{flex: 1}} >
        <Video source={{uri: image}}
               resizeMode="contain"
               muted={true}
               style={{width: width, height: height, overflow: 'hidden', flexGrow: h, flexBasis: 1}}
               repeat={true}
        />
      </View>

    );
  }

  _renderContent() {
    if (false) {
      const Tag = Platform.OS === 'ios' ? TouchableWithoutFeedback : TouchableOpacity;
      return(
        <Tag onPress={this._handlePress.bind(this)}>
            {this._render()}
        </Tag>);
    }
    return this._render();
  }

  _handleFirstPress() {
    this.setState({repeat: true})
  }

  render() {
    const style = [styles.base, this.props.style];
    return (
      <View style={style} >
        {this._renderContent()}
      </View>
    );
  }
}

VideoWithTags.defaultProps = {
  mode: VIEW_MODE,
  showMarker: true,
};

export default VideoWithTags;
