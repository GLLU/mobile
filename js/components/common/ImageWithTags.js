import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions, PanResponder, Animated, TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import _ from 'lodash';

const itemBackground = require('../../../images/tag-background.png');
const TAG_WIDTH = 100;
const BORDER_WIDTH = 5;
const w = Dimensions.get('window').width;

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
  itemItem: {
    position: 'absolute',
    height: 48,
    width: TAG_WIDTH,
  },
});

class ImageWithTags extends Component {

  static propTypes = {
    createLookItem: React.PropTypes.func,
    image: React.PropTypes.string,
    items: React.PropTypes.array,
    editingTag: React.PropTypes.object,
    width: React.PropTypes.number,
    editMode: React.PropTypes.bool
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

          console.log('values', this.state.locationX, this.state.locationY, this._value);
          this._setupPanResponder(this._value.x, this._value.y);
          this.setState({locationX: this._value.x, locationY: this._value.y})
        }
    });
  }

  getTag() {
    console.log('getTag');
    return { locationX: this.state.locationX, locationY: this.state.locationY };
  }

  _handlePress(e) {
    const {locationX, locationY} = e.nativeEvent;
    this._setupPanResponder(locationX, locationY);
    this.setState({locationX: locationX, locationY: locationY}, () => {
      this.props.createLookItem({locationX, locationY});
    });
  }

  renderTags() {
    const items = _.filter(this.props.items, (x) => !x.editing);
    return items.map((item, i) => {
      return (<View key={i} style={[styles.itemItem, { top: item.locationY, left: item.locationX}, { transform: [{ translateX: -TAG_WIDTH }, {translateY: -BORDER_WIDTH - 5}]}]}>
          <Image source={itemBackground} style={styles.itemBgImage} />
        </View>);
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
                    style={[layout, styles.itemItem, { transform: [{ translateX: -TAG_WIDTH }, {translateY: -BORDER_WIDTH - 5}]}]}>
                    <Image source={itemBackground} style={styles.itemBgImage} />
                </Animated.View>);
    }

    return null;
  }

  _render() {
    const width = this.props.width ? this.props.width : w;
    const height = width * 2848 / 4288;
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
