import React, {Component} from 'react';
import {
  View,
  Platform,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Tag from '../common/Tag';

const TAG_WIDTH = 30;
const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const w = Dimensions.get('window').width;

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  contentContainer: {
    flex: 1
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
    image: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired,
    onDragEnd: React.PropTypes.func,
    setCurrentItem: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  renderTags() {
    const {items, currItem, setCurrentItem, onDragEnd} = this.props;

    if (currItem) {
      return items.map((item, i) => {
        return (
          <Tag key={item.id} currItemId={currItem.id} setCurrentItem={setCurrentItem} item={item}
               onDragEnd={onDragEnd}/>
        );
      });
    }
  }

  componentWillMount() {
    this.keyboardDidHideListener =
      Keyboard
        .addListener('keyboardDidHide',Keyboard.dismiss);
  }

  componentWillUnmount(){
    this.keyboardDidHideListener.remove();
  }

  _render() {
    const {image, children} = this.props
    return (
      <Image source={{uri: image}} style={styles.itemsContainer} resizeMode={'stretch'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={[[styles.draggableContainer]]}>
          <View style={styles.contentContainer}>
            {this.renderTags()}
            {children}
          </View>
        </TouchableWithoutFeedback>
      </Image>
    );
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

export default ImageWithTags;
