'use strict';

import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Button } from 'native-base';

class ImagesView extends Component {

  static propTypes = {
    images: React.PropTypes.array
  }

  constructor(props) {
    super(props);
  }

  _renderImages() {
    return this.props.images.map((img, index) => {
      return  (<View key={index} style={{width: img.width, height: img.height, paddingLeft: 0 }} >
          <Image source={{uri: img.uri}} style={{width: img.width - 5, height: img.height, resizeMode: 'contain' }} >
            <View>
            </View>
          </Image>
        </View>);
    });
  }

  render() {
    return(<View>{this._renderImages()}</View>)
  }

}

export default ImagesView;
