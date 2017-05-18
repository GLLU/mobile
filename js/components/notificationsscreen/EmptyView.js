'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

class EmptyView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
          <Text style={{textAlign: 'center'}}>You have no notifications yet</Text>
      </View>
    );
  }
}

export default EmptyView

