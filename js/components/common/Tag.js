import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  UIManager,
  LayoutAnimation,
  Platform,
  Animated,
  View,
  PanResponder
} from 'react-native'
import FontSizeCalculator from './../../calculators/FontSize';
import ExtraDimensions from 'react-native-extra-dimensions-android';
const whiteMarker = require('../../../images/markers/tag_green.png');
const whiteMarkerWithBorder = require('../../../images/markers/tag_red.png');
const greenMarkerWithBorder = require('../../../images/markers/tag_red_Circle.png');
const greenMarker = require('../../../images/markers/tag_green_Circle.png');

const TAG_WIDTH = 30;
const BORDER_WIDTH = 5;
const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const w = Dimensions.get('window').width;

const styles = StyleSheet.create({
  itemBgImage: {
    height: 30,
    width: TAG_WIDTH,
    resizeMode: 'contain'
  },
  text: {
    fontWeight: '500',
    fontSize: new FontSizeCalculator(18).getSize(),
    color: '#FFFFFF',
    alignSelf: 'center'
  },
  itemMarker: {
    position: 'absolute',
    height: 30,
    width: TAG_WIDTH,
  },
});

class Tag extends Component {
  static propTypes = {
    style: React.PropTypes.object,

  }

  constructor(props) {
    super(props);
  }

  _setupPanResponder(locationX, locationY) {
    const {item} = this.props
    const itemId = item.id
    this._pan = new Animated.ValueXY();
    this._pan.addListener((value) => this._value = value);
    this._pan.setOffset({x: locationX, y: locationY})
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {
        dx: this._pan.x,
        dy: this._pan.y
      }]),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderGrant: () => {
      },
      onPanResponderRelease: (e, gesture) => {
        if (this._value) {
          this._pan.setOffset(this._value);
          this._setupPanResponder(this._value.x, this._value.y);
          const {width, height} = this.getRenderingDimensions();
          const left = this._value.x / width;
          const top = this._value.y / height;
          const nextPosition = {id: itemId, locationX: left, locationY: top};

          this.setState(nextPosition, () => {
            this.props.onDragEnd(nextPosition);
          })
        }
        this.props.setCurrentItem(item.id)
      }
    });
  }

  getRenderingDimensions() {
    let width = w;
    let height = h;
    return {width, height};
  }

  normalizePosition(value) {
    return Math.min(Math.max(value, 0.1), 0.9);
  }

  componentWillMount() {
    let locationX;
    let locationY;
    if (this.props.item.locationY === 0.5 && this.props.item.locationX === 0.5) {
      locationX = w / 2;
      locationY = h / 2;
    } else {
      locationX = this.props.item.locationX * w;
      locationY = this.props.item.locationY * h;
    }
    this._setupPanResponder(locationX, locationY);
  }

  getCurrentItemStatus(item) {
    return item.brand && item.category !== null ? greenMarker : greenMarkerWithBorder
  }

  otherItemStatus(item) {
    return item.brand && item.category !== null ? whiteMarker : whiteMarkerWithBorder
  }

  render() {
    const {item, currItemId} = this.props
    const layout = this._pan.getLayout();
    const markerImage = currItemId === item.id ? this.getCurrentItemStatus(item) : this.otherItemStatus(item);
    if (item) {
      return (
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[layout, styles.itemMarker, {transform: [{translateX: -TAG_WIDTH}, {translateY: -BORDER_WIDTH - 5}]}, Platform.OS === 'ios' ? {zIndex: 1} : null]}>
          <Image source={markerImage}
                 style={styles.itemBgImage}/>
        </Animated.View>
      );
    }
  }
}


export default Tag;
