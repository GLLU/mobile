import React, { Component } from 'react';
import { Platform, Image, StyleSheet, Dimensions, PanResponder, Animated, TouchableOpacity, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import { View } from 'native-base';
import FitImage from 'react-native-fit-image';
import _ from 'lodash';
import glluTheme from '../../themes/gllu-theme';
import ExtraDimensions from 'react-native-extra-dimensions-android';

export const EDIT_MODE = 'edit';
export const CREATE_MODE = 'create';
export const VIEW_MODE = 'view';

const tagMarker = require('../../../images/tag-marker.png');
const TAG_WIDTH = 40;
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
    height: 20,
    width: TAG_WIDTH,
    resizeMode: 'contain'

  },
  itemsContainer: {
    backgroundColor: 'transparent',
  },
  itemMarker: {
    position: 'absolute',
    height: 20,
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
  }

  constructor(props) {
    super(props);
    this.state = {
      locationX: 0,
      locationY: 0,
    }
  }

  componentWillMount() {
    this.loadMarkerFromProps(this.props);
  }

  loadMarkerFromProps(props) {
    const { mode, itemId, items } = props;
    if (mode !== VIEW_MODE && itemId) {
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

  getTag() {
    return { locationX: this.state.locationX, locationY: this.state.locationY };
  }

  componentDidMount() {
    if(this.props.mode !== VIEW_MODE && this.props.items.length === 0) {
      const locationX = w/2;
      const locationY = h/2;
      const { width, height } = this.getRenderingDimensions();
      this._setupPanResponder(locationX, locationY);

      // convert location into relative positions
      const left = locationX / w;
      const top = locationY / h;
      this.setState({locationX: left, locationY: top}, () => {
        this.props.onMarkerCreate({locationX: left, locationY: top});
        //this.props.createLookItemForVideo({locationX: left, locationY: top});
      });
    }
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

  normalizePosition(value) {
    return Math.min(Math.max(value, 0.1), 0.9);
  }

  renderTags() {
    const { items, itemId, mode } = this.props;

    const { width, height } = this.getRenderingDimensions();

    return items.map((item, i) => {
      const x = this.normalizePosition(item.locationX);
      const y = this.normalizePosition(item.locationY);
      const left = parseInt(x * width);
      const top = parseInt(y * height);

      if (mode !== VIEW_MODE) {
        const layout = this._pan.getLayout();
        return (<Animated.View
                  key={i}
                  {...this.panResponder.panHandlers}
                  style={[layout, styles.itemMarker, { transform: [{ translateX: -TAG_WIDTH }, {translateY: -BORDER_WIDTH - 5}]}]}>
                <Image source={tagMarker} style={styles.itemBgImage} />
              </Animated.View>);
      }

      return (<View key={i} style={[styles.itemMarker, { top: top, left: left}, { transform: [{ translateX: -TAG_WIDTH }, {translateY: -BORDER_WIDTH - 5}]}]}>
          <Image source={tagMarker} style={styles.itemBgImage} />
        </View>);
    });
  }

  getRenderingDimensions() {
    let width = w;
    let height = h;
    return { width, height };
  }

  _render() {
    const { width, height } = this.getRenderingDimensions();
    if (this.props.showMarker) {
      return (
        <Image source={{uri: this.props.image}} style={[styles.itemsContainer]} resizeMode={'stretch'}>
          <View style={[styles.draggableContainer]}>
            {this.renderTags()}
          </View>
        </Image>
      );
    }

    return (
      <Image
        source={{ uri: this.props.image }}
        style={[styles.itemsContainer, {width, height}]} resizeMode={'stretch'}/>
    );
  }

  _renderContent() {
    return this._render();
  }

  render() {
    const style = [styles.base, this.props.style];
    return (
      <View style={style}>
        {this._renderContent()}
      </View>
    );
  }
}

ImageWithTags.defaultProps = {
  mode: VIEW_MODE,
  showMarker: true,
};

export default ImageWithTags;
