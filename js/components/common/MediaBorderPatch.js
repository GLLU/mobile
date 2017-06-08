import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, Platform, Dimensions, TouchableOpacity, Image, View } from 'react-native';
import BaseComponent from './base/BaseComponent';
const deviceWidth = Dimensions.get('window').width;

class MediaBorderPatch extends Component {

  constructor(props) {
    super(props);
    /* Please Note, this is the most hideous component of them all.
     it create a "border Radius" to our mediaContent, because react-native-video doesnt support "borderRadius".
      Do not, and I repeat, Do not learn from it!.
      Have a Nice Day! */
  }

  render() {
    const { lookWidth, lookHeight } = this.props
    let height = 0;
    let width = 0;
    if(lookWidth && lookHeight) {
      height = lookHeight
      width = lookWidth
    } else {
      width = deviceWidth / 2 ;
      height = deviceWidth / 4;
    }
    return(
      <View style={{width: width, zIndex: 2, height: height, backgroundColor: 'transparent', borderColor: 'white', borderWidth: 4, position: 'absolute', top: 0}}>
        <View>
          {this.props.children}
        </View>
        <View style={{width: width+1, height: height+1, backgroundColor: 'transparent', borderColor: 'white', borderWidth: 4, borderRadius: 10, overflow: 'hidden', position: 'absolute', top: -4, left: -4}} />
      </View>
    )
  }
}

export default MediaBorderPatch;
