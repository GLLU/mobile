import React, { Component } from 'react';
import { Dimensions, StyleSheet, Image, PanResponder, Animated } from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

const tagBackground = require('../../../images/tag-background.png');
let Window = Dimensions.get('window');
const deviceWidth = Window.width;
const deviceHeight = Window.height;

const IMAGE_BORDER = 10;

const styles = StyleSheet.create({
  draggableContainer: {
    height: 400,
    width: 400,
    backgroundColor: 'transparent'
  },
  tagBgImage: {
    height: 50,
    width: 100,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  tagsContainer: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: IMAGE_BORDER,
    borderColor: '#FFFFFF'
  },
});

class ImageView extends Component {

  static propTypes = {
    image: React.PropTypes.object,
    newTag: React.PropTypes.bool
  }

  constructor(props) {
    super(props);
    console.log('ImageView constructor', props)
    this.state = {
      pan: new Animated.ValueXY(),
      beforeX: 70,
      beforeY: 100,
    }
    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder : () => true,
        onPanResponderMove           : Animated.event([null,{
            dx : this.state.pan.x,
            dy : this.state.pan.y
        }]),
        onPanResponderRelease        : (e, gesture) => {

        }
    });
  }

  renderDraggable(){
      return (
           <View style={[styles.draggableContainer, {top: this.state.beforeY, left: this.state.beforeX}]}>
              <Animated.View
                  {...this.panResponder.panHandlers}
                  style={[this.state.pan.getLayout(), styles.tagItem]}>
                  <Image source={tagBackground} style={styles.tagBgImage} />
              </Animated.View>
          </View>
      );
  }

  renderTags() {
    return this.renderDraggable();
  }

  render() {
    const image = this.props.image;
    const width = deviceWidth - 100;
    const height = width * image.height / image.width;
    console.log('render image', image, width, height);

    return(<View style={[styles.tagsContainer]}>
            <Image source={{uri: image.path}} style={{width, height, resizeMode: 'contain'}}>
              {this.props.newTag && this.renderTags()}
            </Image>
          </View>)
  }

}

function bindActions(dispatch) {
  return {
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  ...state.uploadLook,
});

export default connect(mapStateToProps, bindActions)(ImageView);
