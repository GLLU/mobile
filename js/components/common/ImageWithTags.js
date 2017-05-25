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
    setCurrentItem: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      locationX: 0,
      locationY: 0,
    }
  }

  componentDidMount() {
      const locationX = w/2;
      const locationY = h/2;
      const left = locationX / w;
      const top = locationY / h;
      this.setState({locationX: left, locationY: top}, () => {
        this.props.onMarkerCreate({locationX: left, locationY: top});
      });
  }

  renderTags() {
    const { items, currItem, currStep } = this.props;

    return items.map((item, i) => {
        return (
          <Tag key={i} currItemId={currItem.id} setCurrentItem={this.props.setCurrentItem} dragable={currStep === -1} item={item} onDragEnd={this.props.onDragEnd}/>
        );
    });
  }

  getRenderingDimensions() {
    let width = w;
    let height = h;
    return { width, height };
  }

  _render() {

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
