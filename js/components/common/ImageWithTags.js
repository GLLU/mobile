import React, { Component } from 'react';
import { Platform, Image, StyleSheet, Dimensions, PanResponder, Animated, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { View } from 'native-base';
import _ from 'lodash';
import glluTheme from '../../themes/gllu-theme';

const itemBackground = require('../../../images/tag-background.png');
const TAG_WIDTH = 100;
const BORDER_WIDTH = 5;
const w = Dimensions.get('window').width;
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
    image: React.PropTypes.string,
    items: React.PropTypes.array,
    editingTag: React.PropTypes.object,
    width: React.PropTypes.number,
    editMode: React.PropTypes.bool,
    createLookItem: React.PropTypes.func,
    selectLookItem: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      locationX: 0,
      locationY: 0,
    }
  }

  componentWillMount() {
    if (this.props.editMode) {
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
    console.log('preset image', e.nativeEvent, width, height);
    this._setupPanResponder(locationX, locationY);

    // convert location into relative positions
    const left = locationX / width;
    const top = locationY / height;

    this.setState({locationX: left, locationY: top}, () => {
      this.props.createLookItem({locationX: left, locationY: top});
    });
  }

  _handleMarkerPress(item) {
    if (!this.props.editMode && this.props.selectLookItem) {
      this.props.selectLookItem(item.id);
    }
  }

  renderTags() {
    const items = _.filter(this.props.items, (x) => !x.editing);

    const { width, height } = this.getRenderingDimensions();

    return items.map((item, i) => {
      const left = parseInt(item.locationX * width);
      const top = parseInt(item.locationY * height);
      const renderContent = function() {
        return (<View style={[styles.itemMarker, { top: top, left: left}, { transform: [{ translateX: -TAG_WIDTH }, {translateY: -BORDER_WIDTH - 5}]}]}>
            <Image source={itemBackground} style={styles.itemBgImage} />
          </View>);
      };

      if (Platform.OS === 'ios') {
        return (
          <TouchableOpacity key={i} onPress={(e) => this._handleMarkerPress(item)}>
            {renderContent()}
          </TouchableOpacity>
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
    if (!this.props.editMode) {
      return false;
    }
    const {locationX, locationY} = this.state;
    return locationY > 0 || locationY > 0;
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
    if (this._hasTagEditing()) {
      const layout = this._pan.getLayout();
      return (<Animated.View
                    {...this.panResponder.panHandlers}
                    style={[layout, styles.itemMarker, { transform: [{ translateX: -TAG_WIDTH }, {translateY: -BORDER_WIDTH - 5}]}]}>
                  <Image source={itemBackground} style={styles.itemBgImage} />
                </Animated.View>);
    }

    return null;
  }

  _render() {
    const { width, height } = this.getRenderingDimensions();
    
    console.log('width height', width, height, this.props.image);
    return (<Image source={{uri: this.props.image}} style={[styles.itemsContainer, {width, height}]}>
      <View style={[styles.draggableContainer, {width, height}]}>
        {this.renderTags()}
        {this.renderEditingTag()}
      </View>
    </Image>);
  }

  render() {
    if (!this._hasTagEditing() && this.props.editMode) {
      return(<TouchableOpacity onPress={(e) => this._handlePress(e)}>
            {this._render()}
          </TouchableOpacity>);
    }

    return this._render();
  }
}

export default ImageWithTags;
