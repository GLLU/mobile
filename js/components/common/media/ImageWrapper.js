import React,{PureComponent} from 'react';
import { StyleSheet, TextInput, Text, Platform, Dimensions, TouchableOpacity, Image, View } from 'react-native';
import IsOnScreenChecker from './IsOnScreenChecker'

class ImageWrapper extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.isOnScreen) {
      return(
        <Image {...this.props} cache={true}>
          {this.props.children}
        </Image>
      )
    } else {
      return(
        <View {...this.props} >
          {this.props.children}
        </View>
      )
    }

  }
}

export default IsOnScreenChecker(ImageWrapper);
