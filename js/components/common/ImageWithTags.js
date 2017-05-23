import React, { Component } from 'react';
import { View,Platform, Image, StyleSheet, Dimensions, PanResponder, Animated, TouchableOpacity, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import _ from 'lodash';
import glluTheme from '../../themes/gllu-theme';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Tag from '../common/Tag';
export const EDIT_MODE = 'edit';
export const CREATE_MODE = 'create';
export const VIEW_MODE = 'view';

const tagMarker = require('../../../images/markers/marker-top-right.png');
const TAG_WIDTH = 30;
const BORDER_WIDTH = 5;
const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
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
    height: 30,
    width: TAG_WIDTH,
    resizeMode: 'contain'
  },
  itemsContainer: {
    backgroundColor: 'transparent',
    width: w,
    height: h,
  },
  itemMarker: {
    position: 'absolute',
    height: 30,
    width: TAG_WIDTH,
  },
});

class ImageWithTags extends Component {

  static propTypes = {
    itemId: React.PropTypes.number,
    image: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired,
    width: React.PropTypes.number,
    mode: React.PropTypes.string,
    showMarker: React.PropTypes.bool,
    onMarkerCreate: React.PropTypes.func,
    onDragEnd: React.PropTypes.func,
    setCurrentItemId: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      locationX: 0,
      locationY: 0,
    }
  }

  // componentWillMount() {
  //   this.loadMarkerFromProps(this.props);
  // }
  //
  // loadMarkerFromProps(props) {
  //   const { mode, itemId, items } = props;
  //   if (mode !== VIEW_MODE && itemId) {
  //     const item = _.find(items, x => x.id === itemId);
  //     const { locationX, locationY } = item;
  //     const { width, height } = this.getRenderingDimensions();
  //     const absX = this.normalizePosition(locationX) * width;
  //     const absY = this.normalizePosition(locationY) * height;
  //     this._setupPanResponder(absX, absY);
  //   } else {
  //     this._setupPanResponder(0, 0);
  //   }
  // }

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
        onPanResponderRelease: (e, gesture) => {
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

  componentDidMount() {
    if(true) {
      const locationX = w/2;
      const locationY = h/2;
      const { width, height } = this.getRenderingDimensions();
      //this._setupPanResponder(locationX, locationY);

      // convert location into relative positions
      const left = locationX / w;
      const top = locationY / h;
      this.setState({locationX: left, locationY: top}, () => {
        this.props.onMarkerCreate({locationX: left, locationY: top});
        //this.props.createLookItemForVideo({locationX: left, locationY: top});
      });
    }
  }

  normalizePosition(value) {
    return Math.min(Math.max(value, 0.1), 0.9);
  }

  renderTags() {
    const { items, currItemId, mode, currStep } = this.props;

    const { width, height } = this.getRenderingDimensions();

    return items.map((item, i) => {
      const x = this.normalizePosition(item.locationX);
      const y = this.normalizePosition(item.locationY);
      const left = parseInt(x * width);
      const top = parseInt(y * height);
      console.log('tag imageW',currItemId)
        return (
          <Tag key={i} currItemId={currItemId} setCurrentItemId={this.props.setCurrentItemId} dragable={currStep === -1} item={item} onDragEnd={(nextPosition)=> this.props.onDragEnd(nextPosition)}></Tag>
        );
    });
  }

  getRenderingDimensions() {
    let width = w;
    let height = h;
    return { width, height };
  }

  _render() {

    const { width, height } = this.getRenderingDimensions();
    if (true) {
      return (
        <Image source={{uri: this.props.image}} style={[styles.itemsContainer]} resizeMode={'stretch'}>
          <View style={[styles.draggableContainer]}>
            {this.renderTags()}
            {this.props.children}
          </View>
        </Image>
      );
    }
  }

  render() {
    const style = [styles.base, this.props.style];
    return (
      <View style={style}>
        {this._render()}
      </View>
    );
  }
}

ImageWithTags.defaultProps = {
  mode: VIEW_MODE,
  showMarker: true,
};

export default ImageWithTags;
