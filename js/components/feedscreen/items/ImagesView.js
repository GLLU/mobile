'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { View, Content } from 'native-base';

import LikeView from './LikeView';
import TypeView from './TypeView';
import { like } from '../../../actions/myBodyMeasure';

class ImagesView extends Component {

  static propTypes = {
    images: React.PropTypes.array,
    onItemPress: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
  }

  componentWillReceiveProps() {
    this.setState({
      images: this.props.images,
    })
  }

  _handleLikeClick(index, img) {
    let liked = !img.liked;
    let likes = liked ? img.likes + 1 : img.likes - 1;
    let images = this.state.images;
    images[index] = { uri: img.uri, width: img.width, height: img.height, likes: likes, liked: liked, type: img.type };
    this.setState({
      images: images
    })
    liked ? this.props.likeAction(img.id) : this.props.unlikeAction(img.id);
  }

  _handleItemClick(item) {
    console.log('click on item', item);
    this.props.onItemPress(item);
  }

  _renderImages() {
    return this.state.images.map((img, index) => {
      return  (
        <TouchableOpacity key={index} onPress={(e) => this._handleItemClick(img)}>
          <View style={{width: img.width, height: img.height, paddingLeft: 0 }}>
            <Image source={{uri: img.uri}} style={{width: img.width - 5, height: img.height, resizeMode: 'contain' }}>
              <Content scrollEnabled={false}>
                <TypeView type={img.type} />
                <LikeView index={index} item={img} onPress={this._handleLikeClick.bind(this)} />
              </Content>
            </Image>
          </View>
        </TouchableOpacity>);
    });
  }

  render() {
    return(<View>{this._renderImages()}</View>)
  }
}

export default ImagesView;
