import React, { Component } from 'react';
import { Text,StyleSheet, Dimensions, TouchableOpacity, Image, UIManager, LayoutAnimation, Platform, Animated, View, PanResponder } from 'react-native'
import FontSizeCalculator from './../../calculators/FontSize';
import ExtraDimensions from 'react-native-extra-dimensions-android';
const whiteMarker = require('../../../images/markers/marker-top-right.png');
const greenMarker = require('../../../images/markers/marker-green-1.png');

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
    const itemId = this.props.item.id
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
      onPanResponderRelease: (e, gesture) => {
        this._pan.setOffset(this._value);
        this._setupPanResponder(this._value.x, this._value.y);
        const { width, height } = this.getRenderingDimensions();
        const left = this._value.x / width;
        const top = this._value.y / height;
        const nextPosition = {id: itemId, locationX: left, locationY: top};
        this.setState(nextPosition, () => {
          this.props.onDragEnd(nextPosition);
        })
      }
    });
  }

  getRenderingDimensions() {
    let width = w;
    let height = h;
    return { width, height };
  }

  normalizePosition(value) {
    return Math.min(Math.max(value, 0.1), 0.9);
  }

  componentWillMount() {
    const locationX = w / 2;
    const locationY = h / 2;
    this._setupPanResponder(locationX, locationY);
  }

  render() {
    const { item, currItemId } = this.props
    const { width, height } = this.getRenderingDimensions();
    const x = this.normalizePosition(this.props.item.locationX);
    const y = this.normalizePosition(this.props.item.locationY);
    const left = parseInt(x * width);
    const top = parseInt(y * height);
    const layout = this._pan.getLayout();
    const markerImage = currItemId === item.id ? greenMarker : whiteMarker;
    const isDone = item.brand && item.category !== null
    if(this.props.dragable) {
      return (
        <Animated.View

          {...this.panResponder.panHandlers}
          style={[layout, styles.itemMarker, { transform: [{ translateX: -TAG_WIDTH }, {translateY: -BORDER_WIDTH - 5}]}]}>

          <Image source={markerImage} style={styles.itemBgImage} />
        </Animated.View>
      );
    } else {
      console.log('itemmmm1',item)
      return (

        <View style={[styles.itemMarker, { top: top, left: left}, { transform: [{ translateX: -TAG_WIDTH }, {translateY: -BORDER_WIDTH - 5}]}]}>
          <TouchableOpacity onPress={() => this.props.setCurrentItem(item)}>
            <Image source={markerImage} style={[styles.itemBgImage]} />
          </TouchableOpacity>
        </View>

      );
    }

  }
}



export default Tag;
