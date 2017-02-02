import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions, PanResponder, Animated, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
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
    this._setupPanResponder(locationX, locationY);
    this.setState({locationX: locationX, locationY: locationY}, () => {
      this.props.createLookItem({locationX, locationY});
    });
  }

  _handleMarkerPress(item) {
    if (!this.props.editMode && this.props.selectLookItem) {
      this.props.selectLookItem(item.id);
    }
  }

  renderTags() {
    const items = _.filter(this.props.items, (x) => !x.editing);
    return items.map((item, i) => {
      const renderContent = function() {
        return (<View style={[styles.itemMarker, { top: parseInt(item.locationY), left: parseInt(item.locationX)}, { transform: [{ translateX: -TAG_WIDTH }, {translateY: -BORDER_WIDTH - 5}]}]}>
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
    let width = 300;
    let height = 400;
    if (this.props.width) {
      width = parseInt(this.props.width);
      height = parseInt(width * 16 / 9);
    } else {
      height = parseInt(h - BORDER_WIDTH * 2 - glluTheme.toolbarHeight);
      width = parseInt(height * 9 / 16);
    }
    
    console.log('width height', width, height);
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
