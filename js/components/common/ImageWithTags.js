import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions, PanResponder, Animated } from 'react-native';
import { View } from 'native-base';
import _ from 'lodash';

const tagBackground = require('../../../images/tag-background.png');
const TAG_WIDTH = 100;
const BORDER_WIDTH = 5;
const w = Dimensions.get('window').width;

const styles = StyleSheet.create({
  draggableContainer: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  tagBgImage: {
    height: 48,
    width: TAG_WIDTH,
  },
  tagsContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: BORDER_WIDTH,
    borderColor: '#FFFFFF'
  },
  tagItem: {
    position: 'absolute',
    height: 48,
    width: TAG_WIDTH,
  },
});

class ImageWithTags extends Component {

  static propTypes = {
    addTag: React.PropTypes.func,
    image: React.PropTypes.object,
    tags: React.PropTypes.array,
    editingTag: React.PropTypes.object,
    width: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
    const { locationX, locationY } = this._parseEditingLocation(props);
    this.state = { locationX, locationY };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderRelease: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        this.setState({locationX, locationY})
      }
    });
  }

  getTag() {
    console.log('getTag');
    return { locationX: this.state.locationX, locationY: this.state.locationY };
  }

  _parseEditingLocation(props) {
    const tag = _.find(props.tags, (x) => x.editing);
    if (!tag) {
      return { locationX: 0, locationY: 0 };
    }

    return { locationX: tag.locationX, locationY: tag.locationY };
  }

  _renderTags() {
    const { tags, editingTag } = this.props;
    const coords = _.filter(tags, (x) => !x.editing);
    const views = coords.map((tag, i) => {
      return (<Animated.View key={i} style={[styles.tagItem, { top: tag.locationY - BORDER_WIDTH - 5, left: tag.locationX - TAG_WIDTH }]}>
          <Image source={tagBackground} style={styles.tagBgImage} />
        </Animated.View>);
    });
    const tag = {locationX: this.state.locationX, locationY: this.state.locationY};
    const view = <Animated.View key={tags.length} style={[styles.tagItem, { top: tag.locationY - BORDER_WIDTH - 5, left: tag.locationX - TAG_WIDTH }]}>
          <Image source={tagBackground} style={styles.tagBgImage} />
        </Animated.View>;
    views.push(view);
    return views;
  }

  renderDraggable() {
    return (<View style={[styles.draggableContainer]}>
        {this._renderTags()}
    </View>);
  }

  render() {
    const image = this.props.image;
    const width = this.props.width ? this.props.width : w;
    const height = width * 2848 / 4288;
    return (
      <Image source={{uri: image.path}} style={[styles.tagsContainer, {width, height}]} {...this._panResponder.panHandlers}>
        {this.renderDraggable()}
      </Image>
    );
  }
}

export default ImageWithTags;
