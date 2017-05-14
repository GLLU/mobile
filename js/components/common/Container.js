import React, { Component } from 'react';
import { Platform,View} from 'react-native';
import { Container } from 'native-base';

import ExtraDimensions from 'react-native-extra-dimensions-android';
export default class MyContainer extends Component {

  render() {
    if (Platform.OS == 'ios') {
      return(
      <Container style={this.props.style} onLayout={this.props.onLayout}>
        {this.props.children}
      </Container>
      );
    }

    return (
      <Container style={this.props.style} onLayout={this.props.onLayout}>
      <View style={{flexGrow: 1}}>
      {this.props.children}
      </View>
    </Container>
    )
  }
}