import React,{Component} from "react";
import { Dimensions, View } from 'react-native'

const {height, width} = Dimensions.get('window');


export default class FullscreenView extends Component {

  render() {
    return (
      <View style={[{height,width},this.props.style]}>
        {this.props.children}
    </View>)
  }
}