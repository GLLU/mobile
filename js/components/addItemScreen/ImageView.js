import React, { Component } from 'react';
import { Dimensions, StyleSheet, Image, PanResponder, Animated } from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

const tagBackground = require('../../../images/tag-background.png');
let Window = Dimensions.get('window');
const deviceWidth = Window.width;
const deviceHeight = Window.height;

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
    height: (deviceHeight * (deviceWidth - 140)) / deviceWidth,
    width: deviceWidth - 100,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 10,
    borderColor: '#FFFFFF'
  },
});

class ImageView extends Component {

  static propTypes = {
    imagePath: React.PropTypes.string,
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
    return(<View>
            <Image source={{uri: this.props.imagePath}} style={styles.tagsContainer}>
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
