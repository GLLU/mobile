import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import IsOnScreenChecker from './IsOnScreenChecker';

class ImageWrapper extends PureComponent {

  render() {
    const { source, style } = this.props;
    if (this.props.isOnScreen) {
      return (
        <Image {...this.props} cache>
          {this.props.children}
        </Image>
      );
    } else {
      return (
        <View {...this.props}>
          {this.props.children}
        </View>
      );
    }
  }
}

export default IsOnScreenChecker(ImageWrapper);
