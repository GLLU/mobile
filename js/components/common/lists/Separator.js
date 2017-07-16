import React, { PureComponent } from 'react';
import { View } from 'react-native';

class Separator extends PureComponent {

  static defaultProps={
    style:{}
  }

  render() {
    return (
      <View style={[{backgroundColor:'#e0e0e0', height:1},this.props.style]}/>
    );
  }
}

export default Separator;

