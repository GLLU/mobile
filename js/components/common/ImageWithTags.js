import React, { Component } from 'react';
import { Platform, Image, StyleSheet, Dimensions, PanResponder, Animated, TouchableOpacity, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import { View } from 'native-base';
import _ from 'lodash';
import glluTheme from '../../themes/gllu-theme';

export const EDIT_MODE = 'edit';
export const CREATE_MODE = 'create';
export const VIEW_MODE = 'view';

const itemBackground = require('../../../images/tag-background.png');
const TAG_WIDTH = 100;
const BORDER_WIDTH = 5;
const h = Dimensions.get('window').height;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    borderWidth: BORDER_WIDTH,
    borderColor: '#FFFFFF'
  },
  itemMarker: {
    position: 'absolute',
    height: 48,
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
    console.log('ImageWithTags props', props);
    this.state = this.parseState(props);

    console.log('state', this.state);

    this._setupPanResponder(this.state.locationX, this.state.locationY)
  }

  parseState(props) {
    const { items, itemId, mode } = this.props;
    if (itemId && mode !== VIEW_MODE) {
      const item = _.find(items, x => x.id == itemId);
      return {
        locationX: item.cover_x_pos,
        locationY: item.cover_y_pos,
      };
    }

    return {
      locationX: 0,
      locationY: 0,
    };
  }

  componentWillMount() {
    if (this.props.mode) {
      const {locationX, locationY} = this.state;
      this._setupPanResponder(locationX, locationY);
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
    console.log('_handlePress');
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

  renderTags() {
    const { items, itemId, mode } = this.props;

    const { width, height } = this.getRenderingDimensions();

    return items.map((item, i) => {
      console.log('marker item', item, mode);
      const left = parseInt(item.locationX * width);
      const top = parseInt(item.locationY * height);

      if (mode != VIEW_MODE && item.editing) {
        console.log('render panResponder');
        const layout = this._pan.getLayout();
        return (<Animated.View
                  key={i}
                  {...this.panResponder.panHandlers}
                  style={[layout, styles.itemMarker, { transform: [{ translateX: -TAG_WIDTH }, {translateY: -BORDER_WIDTH - 5}]}]}>
                <Image source={itemBackground} style={styles.itemBgImage} />
              </Animated.View>);
      }

      return (<View key={i} style={[styles.itemMarker, { top: top, left: left}, { transform: [{ translateX: -TAG_WIDTH }, {translateY: -BORDER_WIDTH - 5}]}]}>
          <Image source={itemBackground} style={styles.itemBgImage} />
        </View>);
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

  _render() {
    const { width, height } = this.getRenderingDimensions();
    console.log('render showMarker', this.props.showMarker)
    return (
    <Image source={{uri: this.props.image}} style={[styles.itemsContainer, {width, height}]}>
      {
        this.props.showMarker
        ?
        <View style={[styles.draggableContainer, {width, height}]}>
          {this.renderTags()}
        </View>
        :
        null
      }
    </Image>);
  }

  _renderContent() {
    console.log('render', this.props.mode);
    if (this.props.mode == CREATE_MODE) {
      const Tag = Platform.OS === 'ios' ? TouchableWithoutFeedback : TouchableOpacity;
      console.log('tag', Tag)
      return(<Tag onPress={this._handlePress.bind(this)}>
            {this._render()}
          </Tag>);
    }
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
