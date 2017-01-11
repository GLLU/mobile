import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions, PanResponder, Animated } from 'react-native';
import { View } from 'native-base';

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
    editingTagIndex: React.PropTypes.number,
    width: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      newTag: false,
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        console.log('location', locationX, locationY);
        this.props.addTag({locationX, locationY});
        this.setState({newTag: true})
      }
    });
  }

  _renderTags() {
    const { tags, editingTagIndex } = this.props;
    return tags.map((tag, i) => {
      return (<Animated.View key={i} style={[styles.tagItem, { top: tag.locationY - BORDER_WIDTH - 5, left: tag.locationX - TAG_WIDTH }]}>
          <Image source={tagBackground} style={styles.tagBgImage} />
        </Animated.View>);
    });
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
