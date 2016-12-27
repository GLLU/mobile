'use strict';

import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Content } from 'native-base';

import LikeView from './LikeView';
import TypeView from './TypeView';
import TagsView from './TagsView';

class ImagesView extends Component {

  static propTypes = {
    images: React.PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
  }

  componentWillReceiveProps() {
    this.setState({
      images: this.props.images
    })
  }

  Like(index, img) {
    let liked = !img.liked;
    let likes = liked ? img.likes + 1 : img.likes - 1;
    let images = this.state.images;
    images[index] = { uri: img.uri, width: img.width, height: img.height, likes: likes, liked: liked, type: img.type, tags: img.tags };
    this.setState({
      images: images
    })
  }

  _renderImages() {
    return this.state.images.map((img, index) => {
      return  (<View key={index} style={{width: img.width, height: img.height, paddingLeft: 0 }} >
          <Image source={{uri: img.uri}} style={{width: img.width - 5, height: img.height, resizeMode: 'contain' }} >
            <Content scrollEnabled={false}>
              <TypeView type={img.type} />
              <LikeView index={index} item={img} onPress={this.Like.bind(this)} />
              <TagsView tags={img.tags} />
            </Content>
          </Image>
        </View>);
    });
  }

  render() {
    return(<View>{this._renderImages()}</View>)
  }

}

export default ImagesView;
