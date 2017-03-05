import React, { Component } from 'react';
import { Platform, Image, StyleSheet, Dimensions, PanResponder, Animated, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
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
    setTagPosition: React.PropTypes.func,
    selectLookItem: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    console.log('ImageWithTags props', props);
    this.state = this.parseState(props);

    console.log('state', this.state);

    this.updatePosition = _.debounce(this._updatePosition, 1500);
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
          this.setState({locationX: this._value.x, locationY: this._value.y})
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
      this.updatePosition(top, left);
    });
  }

  _updatePosition(top, left) {
    console.log('debounce')
    this.props.setTagPosition({locationX: left, locationY: top});
  }

  _handleMarkerPress(item) {
    console.log('_handleMarkerPress', item);
    if (!this.props.mode && this.props.selectLookItem) {
      this.props.selectLookItem(item.id);
    }
  }

  renderTags() {
    const { items, itemId } = this.props;

    const { width, height } = this.getRenderingDimensions();

    return items.map((item, i) => {
      const selected = itemId != null && item.id == itemId;
      const left = parseInt(item.locationX * width);
      const top = parseInt(item.locationY * height);

      console.log('selected', selected);
      const renderContent = (selected) => {
        if (selected) {
          console.log('render panResponder');
          const layout = this._pan.getLayout();
          return (<Animated.View
                    {...this.panResponder.panHandlers}
                    style={[layout, styles.itemMarker, { transform: [{ translateX: -TAG_WIDTH }, {translateY: -BORDER_WIDTH - 5}]}]}>
                  <Image source={itemBackground} style={styles.itemBgImage} />
                </Animated.View>);
        }

        return (<View style={[styles.itemMarker, { top: top, left: left}, { transform: [{ translateX: -TAG_WIDTH }, {translateY: -BORDER_WIDTH - 5}]}]}>
            <Image source={itemBackground} style={styles.itemBgImage} />
          </View>);
      };

      if (Platform.OS === 'ios') {
        return (
          <TouchableWithoutFeedback key={i} onPress={(e) => this._handleMarkerPress(item)}>
            {renderContent()}
          </TouchableWithoutFeedback>
        );
      } else {
        return (
          <TouchableNativeFeedback key={i} onPress={(e) => this._handleMarkerPress(item)}>
            {renderContent()}
          </TouchableNativeFeedback>
        );
      }
    });
  }

  _hasTagEditing() {
    // if (!this.props.mode) {
    //   return false;
    // }
    const {locationX, locationY} = this.state;
    return locationX > 0 || locationY > 0;
  }

  getRenderingDimensions() {
    let width = 300;
    let height = 400;
    if (this.props.width) {
      width = parseInt(this.props.width);
      height = parseInt(width * 16 / 9);
    } else {
      height = parseInt(h - BORDER_WIDTH * 2 - glluTheme.toolbarHeight);
      width = parseInt(height * 9 / 16);
    }

    return { width, height };
  }

  renderEditingTag() {
    if (this.props.mode == EDIT_MODE) {
      const layout = this._pan.getLayout();
      return (<Animated.View
                    {...this.panResponder.panHandlers}
                    style={[layout, styles.itemMarker, { transform: [{ translateX: -TAG_WIDTH }, {translateY: -BORDER_WIDTH - 5}]}]}>
                  <Image source={itemBackground} style={styles.itemBgImage} />
                </Animated.View>);
    }

    console.log('renderEditingTag')
    return null;
  }

  _render() {
    const { width, height } = this.getRenderingDimensions();
    return (<Image source={{uri: this.props.image}} style={[styles.itemsContainer, {width, height}]}>
      <View style={[styles.draggableContainer, {width, height}]}>
        {this.renderTags()}
      </View>
    </Image>);
  }

  render() {
    console.log('render', this.props.mode);
    if (this.props.mode == CREATE_MODE) {
      return(<TouchableWithoutFeedback onPress={(e) => this._handlePress(e)}>
            {this._render()}
          </TouchableWithoutFeedback>);
    }

    return this._render();
  }
}

ImageWithTags.defaultProps = {
  mode: VIEW_MODE,
};

export default ImageWithTags;
