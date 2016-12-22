'use strict';

import React, { Component } from 'react';
import { View, Text } from 'native-base';

class NewTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View>
        <Text>NewTab</Text>
      </View>
    )
  }
}

module.exports = NewTab;
